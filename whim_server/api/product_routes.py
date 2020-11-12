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
  print(f'requested: {requested}')
  substring = requested['searchInput'].lower()
  print(f'substring: {substring}')
  requestedF = "%{}%".format(substring)
  products = Product.query.filter(or_(Product.name.ilike(requestedF), Product.category.ilike(requestedF), Product.description.ilike(requestedF))).all()
  productsAll = [product.feed_dict() for product in products]
  options = {}
  for product in productsAll:
    for key in product:
      for i in range(0, 3):
        if (i == 0):
          # if(key == 'name' or key == 'category' or key == 'description'):
          if(key == 'category'):
            words = re.split('[^a-zA-Z]', product[key])
            print(f'product[key]: {product[key]}')
            for word in words:
              word_lower = word.lower()
              print(f'word_lower: {word_lower}')
              print(f'substring: {substring}')
              print(word_lower.startswith(substring))
              if (word_lower.startswith(substring)):
                if word in options:
                  options[word_lower] += 1
                else:
                  options[word_lower] = 1
        # else:
        #   stopwords = {'ourselves', 'hers', 'between', 'yourself', 'but', 'again', 'there', 'about', 'once', 'during', 'out', 'very', 'having', 'with', 'they', 'own', 'an', 'be', 'some', 'for', 'do', 'its', 'yours', 'such', 'into', 'of', 'most', 'itself', 'other', 'off', 'is', 's', 'am', 'or', 'who', 'as', 'from', 'him', 'each', 'the', 'themselves', 'until', 'below', 'are', 'we', 'these', 'your', 'his', 'through', 'don', 'nor', 'me', 'were', 'her', 'more', 'himself', 'this', 'down', 'should', 'our', 'their', 'while', 'above', 'both', 'up', 'to', 'ours', 'had', 'she', 'all', 'no', 'when', 'at', 'any', 'before', 'them', 'same', 'and', 'been', 'have', 'in', 'will', 'on', 'does', 'yourselves', 'then', 'that', 'because', 'what', 'over', 'why', 'so', 'can', 'did', 'not', 'now', 'under', 'he', 'you', 'herself', 'has', 'just', 'where', 'too', 'only', 'myself', 'which', 'those', 'i', 'after', 'few', 'whom', 't', 'being', 'if', 'theirs', 'my', 'against', 'a', 'by', 'doing', 'it', 'how', 'further', 'was', 'here', 'than'}
        #   if(key == 'name' or key == 'category' or key == 'description'):
        #     words = re.split('[^a-zA-Z]', product[key])
        #     for j, word in enumerate(words):
        #       if word.startswith(substring) and (j < len(words) - i):
        #         word_phrase_count = 0
        #         word_phrase = []
        #         if word_phrase_count <= (i):
        #           k = j + 1
        #           while k < len(words) and word_phrase_count < (i + 1):
        #             word_lower = words[k].lower()
        #             if word_lower in stopwords:
        #               word_phrase.append(word_lower)
        #               k += 1
        #             else:
        #               word_phrase.append(word_lower)
        #               k += 1
        #               word_phrase_count += 1
        #         joined_word_phrase = ' '.join(word_phrase)
        #         if joined_word_phrase in options:
        #           options[joined_word_phrase] += 1
        #         else:
        #           options[joined_word_phrase] = 1
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
