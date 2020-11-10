from flask import Blueprint, jsonify, request
from whim_server.models import db, User, Product, Option, Order, Merchant
from sqlalchemy import and_, or_, desc
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
  requestedF = "%{}%".format(requested['searchInput'])
  products = Product.query.filter(or_(Product.name.ilike(requestedF), Product.category.ilike(requestedF), Product.description.ilike(requestedF))).all()
  productsDict = [product.feed_dict() for product in products]
  options = {}
  for product in productsDict:
    for key in product:
      if(key == 'name' or key == 'category' or key == 'description'):
        re.split()
        if (options[key]):
          options[key] += 1
        else:
          options[key] = 1
  
  return {"data": options}, 200


@product_routes.route("/search", methods=['POST'])
def search_products():
  requested = request.get_json()
  page = requested['page']
  requestedF = "%{}%".format(requested['searchInput'])
  results = Product.query.filter(or_(Product.name.ilike(requestedF), Product.category.ilike(requestedF), Product.description.ilike(requestedF))).order_by(Product.created_at).paginate(page, 24, False)
  more_data = results.has_next
  products = results.items
  data = [product.feed_dict() for product in products]
  return {"data": data, "more_data": more_data}, 200
