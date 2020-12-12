from flask import Blueprint, jsonify, request
from whim_server.models import db, User, Product, Option, Order, Merchant
from sqlalchemy import and_, or_, desc
from sqlalchemy.sql import func
import datetime
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


@product_routes.route("/search/options", methods=['POST'])
def search_options():
  requested = request.get_json()
  terms_raw = requested['input'].lower()
  terms_split = re.split('[^a-z0-9+\'?s]', terms_raw)
  terms_list = list(filter(None, terms_split))
  terms_list_last = terms_list[-1]
  terms_query_joined = '%'.join(terms_list)
  terms_query = "%{}%".format(terms_query_joined)
  
  if len(terms_list) == 0:
    return {"data": []}, 200
  
  stopwords = {'shipping', 'shipped', 'express', 'delivery', 'ourselves', 'hers', 'between', 'yourself', 'but', 'again', 'there', 'about', 'once', 'during', 'out', 'very', 'having', 'with', 'they', 'own', 'an', 'be', 'some', 'for', 'do', 'its', 'yours', 'such', 'into', 'of', 'most', 'itself', 'other', 'off', 'is', 's', 'am', 'or', 'who', 'as', 'from', 'him', 'each', 'the', 'themselves', 'until', 'below', 'are', 'we', 'these', 'your', 'his', 'through', 'don', 'nor', 'me', 'were', 'her', 'more', 'himself', 'this', 'down', 'should', 'our', 'their', 'while', 'above', 'both', 'up', 'to', 'ours', 'had', 'she', 'all', 'no', 'when', 'at', 'any', 'before', 'them', 'same', 'and', 'been', 'have', 'in', 'will', 'on', 'does', 'yourselves', 'then', 'that', 'because', 'what', 'over', 'why', 'so', 'can', 'did', 'not', 'now', 'under', 'he', 'you', 'herself', 'has', 'just', 'where', 'too', 'only', 'myself', 'which', 'those', 'i', 'after', 'few', 'whom', 't', 'being', 'if', 'theirs', 'my', 'against', 'a', 'by', 'doing', 'it', 'how', 'further', 'was', 'here', 'than'}

  products = {}
  products_query = Product.query.filter(or_(Product.name.ilike(terms_query), Product.category.like(terms_query), Product.description.ilike(terms_query))).all()
  products_dict = [product.search_dict() for product in products_query]
  
  # iterate through products
  for product in products_dict:
    # iterate through product fields
    for key in product:
      words_uppercase = product[key].lower()
      words_unfiltered = re.split('[^a-z0-9+\'?s]', words_uppercase)
      words = list(filter(None, words_unfiltered))
      
      words_length = len(words)
      terms_list_length = len(terms_list)
      
      # iterate through field's string
      for i in range(0, words_length - terms_list_length):
        words_current = words[i]
        words_last = words[i + terms_list_length - 1]
        
        if terms_list_length == 1 and words_current.startswith(terms_list_last):
          major_terms_count = 4
          j = i
          words_current_list = []
          while major_terms_count > 0 and j < words_length:
            words_next = words[j]
            words_current_list.append(words_next)
            
            if words_next not in stopwords and len(words_next) > 1 and not words_next.isnumeric():
              major_terms_count -= 1
              words_current_string = ' '.join(words_current_list)
              if words_current_string in products:
                products[words_current_string] += 1
              else:
                products[words_current_string] = 1
            j += 1
            
        elif (i + terms_list_length <= words_length) and (words[i: i + terms_list_length - 1] == terms_list[:-1]) and words_last.startswith(terms_list_last):
          starting_major_terms_count = 0
          for term in terms_list:
            if term not in stopwords:
              starting_major_terms_count += 1
              
          major_terms_count = 4 - starting_major_terms_count
          j = i + terms_list_length
          words_current_list = terms_list[:-1] + [words_last]
          while major_terms_count > 0 and j < words_length:
            words_next = words[j]
            words_current_list.append(words_next)
            
            if words_next not in stopwords and len(words_next) > 1 and not words_next.isnumeric():
              major_terms_count -= 1
              words_current_string = ' '.join(words_current_list)
              if words_current_string in products:
                products[words_current_string] += 1
              else:
                products[words_current_string] = 1
            j += 1
  possible_terms = sorted([(value, key) for (key, value) in products.items()], reverse=True)[:10]
  return {"data": possible_terms}, 200


@product_routes.route("/search/<int:page>", methods=['POST'])
def search_products(page):
  requested = request.get_json()
  rating = requested['rating']
  price = requested['price']
  substring_raw = requested['term'].lower()
  substring_split = substring_raw.split(' ')
  if all(char == '' for char in substring_split):
    return {"data": [], "more_data": False}, 200
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
  results = Product.query.filter(and_(*filter_queries, base_query)).order_by(Product.created_at).paginate(page, 24, False)
  more_data = results.has_next
  products = results.items
  data = [product.feed_dict() for product in products]
  return {"data": data, "more_data": more_data}, 200
