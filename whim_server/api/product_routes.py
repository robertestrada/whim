from flask import Blueprint, jsonify, request
from whim_server.models import db, User, Product, Option, Order, Merchant, Keyword
from sqlalchemy import and_, or_, desc
from sqlalchemy.sql import func
from sqlalchemy.dialects import postgresql
import datetime
import string
import re

product_routes = Blueprint("products", __name__, url_prefix="/product")


@product_routes.route("/popular/<int:page>")
def get_popular_products(page):
  results = Product.query.order_by(Product.created_at).paginate(page, 24, False)
  more_data = results.has_next
  products = results.items
  data = [product.feed_dict() for product in products]
  return {"data": data, "more_data": more_data}, 200


@product_routes.route("/express/<int:page>")
def get_express_products(page):
  results = Product.query.filter(Product.shipping_speed > 0).order_by(Product.created_at).paginate(page, 24, False)
  more_data = results.has_next
  products = results.items
  data = [product.feed_dict() for product in products]
  return {"data": data, "more_data": more_data}, 200


@product_routes.route("/category/<category>/<int:page>")
def get_category_products(category, page):
  results = Product.query.filter(Product.category==category).order_by(Product.created_at).paginate(page, 24, False)
  more_data = results.has_next
  products = results.items
  data = [product.feed_dict() for product in products]
  return {"data": data, "more_data": more_data}, 200


@product_routes.route("/<int:id>")
def get_product(id):
  result = Product.query.filter(Product.id==id).one()
  return result.main_dict(), 200


@product_routes.route("/search/options/load")
def search_options_load():
  keywords_values = {}
  az_nums = list(string.digits + string.ascii_lowercase)
  for char in az_nums:
    terms_query = f'{char}%'
    keywords_query = Keyword.query.filter(Keyword.terms.like(terms_query)).order_by(Keyword.score.desc()).limit(10)
    keywords_values[char] = [(keyword.score, keyword.terms) for keyword in keywords_query]
  return {"data": keywords_values}, 200


@product_routes.route("/search/options", methods=['POST'])
def search_options():
  requested = request.get_json()
  terms_raw = requested['input'].lower()
  terms_split = re.split('[^a-z0-9+\'?s]', terms_raw)
  terms_list = list(filter(None, terms_split))
  terms_query_joined = ' '.join(terms_list)
  terms_query = "{}%".format(terms_query_joined)
  keywords_query = Keyword.query.filter(Keyword.terms.like(terms_query)).order_by(Keyword.score.desc()).limit(10)
  keywords_values = [(keyword.score, keyword.terms) for keyword in keywords_query]
  return {"data": keywords_values}, 200


@product_routes.route("/search/<int:page>", methods=['POST'])
def search_products(page):
  requested = request.get_json()
  search_term = requested['term'].lower()
  search_length = len(search_term)
  
  data = []
  i = 0
  while data == [] and i > -search_length:
    substring_raw = ''
    if i < 0:
      substring_raw = search_term[:i]
    else:
      substring_raw = search_term
    substring_split = substring_raw.split(' ')

    if all(char == '' for char in substring_split):
      return {"data": [], "more_data": False, "final_term": substring_raw}, 200

    substring = '%'.join(substring_split)
    requestedF = "%{}%".format(substring)
    base_query = or_(Product.name.ilike(requestedF), Product.category.ilike(requestedF), Product.description.ilike(requestedF))

    results = Product.query.filter(base_query).order_by(Product.created_at).paginate(page, 24, False)
    more_data = results.has_next
    products = results.items
    data = [product.feed_dict() for product in products]
    i -= 1
  
  return {"data": data, "more_data": more_data, "final_term": substring_raw}, 200


@product_routes.route("/search/filter/<int:page>", methods=['POST'])
def filter_products(page):
  requested = request.get_json()
  rating = requested['rating']
  price = requested['price']
  shipping = requested['shippingSpeed']
  substring_raw = requested['term'].lower()
  substring_split = substring_raw.split(' ')
  
  substring = '%'.join(substring_split)
  requestedF = "%{}%".format(substring)
  base_query = or_(Product.name.ilike(requestedF), Product.category.ilike(requestedF), Product.description.ilike(requestedF))
  
  filter_queries = []
  if rating != -1:
    filter_queries.append(Product.avg_rating >= rating)
  price_ranges = [(0, 5), (5, 10), (10, 20), (20, 50), (50, 100), (100, 1000000)]
  if price != -1:
    low, high = price_ranges[price]
    filter_queries.append(and_(low < Product.lowest_price, Product.lowest_price <= high))
  if shipping != -1:
    filter_queries.append(Product.shipping_speed == shipping)
  
  results = Product.query.filter(and_(*filter_queries, base_query)).order_by(Product.created_at).paginate(page, 24, False)
  more_data = results.has_next
  products = results.items
  data = [product.feed_dict() for product in products]
  
  return {"data": data, "more_data": more_data}, 200
