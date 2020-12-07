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
  terms_split = re.split('[^a-zA-Z+\'?s]', terms_raw)
  terms_list = list(filter(None, terms_split))
  terms = ' '.join(terms_list)
  terms_query_joined = '%'.join(terms_list)
  terms_query = "%{}%".format(terms_query_joined)
  
  if len(terms_list) == 0:
    return {"data": []}, 200
  
  stopwords = {'shipping', 'shipped', 'express', 'delivery', 'ourselves', 'hers', 'between', 'yourself', 'but', 'again', 'there', 'about', 'once', 'during', 'out', 'very', 'having', 'with', 'they', 'own', 'an', 'be', 'some', 'for', 'do', 'its', 'yours', 'such', 'into', 'of', 'most', 'itself', 'other', 'off', 'is', 's', 'am', 'or', 'who', 'as', 'from', 'him', 'each', 'the', 'themselves', 'until', 'below', 'are', 'we', 'these', 'your', 'his', 'through', 'don', 'nor', 'me', 'were', 'her', 'more', 'himself', 'this', 'down', 'should', 'our', 'their', 'while', 'above', 'both', 'up', 'to', 'ours', 'had', 'she', 'all', 'no', 'when', 'at', 'any', 'before', 'them', 'same', 'and', 'been', 'have', 'in', 'will', 'on', 'does', 'yourselves', 'then', 'that', 'because', 'what', 'over', 'why', 'so', 'can', 'did', 'not', 'now', 'under', 'he', 'you', 'herself', 'has', 'just', 'where', 'too', 'only', 'myself', 'which', 'those', 'i', 'after', 'few', 'whom', 't', 'being', 'if', 'theirs', 'my', 'against', 'a', 'by', 'doing', 'it', 'how', 'further', 'was', 'here', 'than'}

  products = {}
  products_query = Product.query.filter(or_(Product.name.ilike(terms_query), Product.category.ilike(terms_query), Product.description.ilike(terms_query))).all()
  products_dict = [product.search_dict() for product in products_query]
  
  for product in products_dict:
    for key in product:
      words_unfiltered = re.split('[^a-zA-Z+\'?s]', product[key].lower())
      words = list(filter(None, words_unfiltered))
      words_length = len(words)
      terms_length = len(terms)
      for i in range(0, words_length):
        words_focus_list = []
        for k in range(0, terms_length):
          words_focus_list.append(words[i + k])
        words_focus = ' '.join(words_focus_list)
        
        if words_focus.startswith(terms):
          if words_focus in products:
            products[words_focus] += 1
          else:
            products[words_focus] = 1
            
          extra_words = words[i:i + 4]
          for word in extra_words:
            words_focus_list.append(words[i + k])
        
        
    
    
    
    
    
  
  # options_one = {}
  # options_two = {}
  # options_three = {}
  
  # for product in productsAll:
  #   for key in product:
  #     words = re.split('[^a-zA-Z+\'?s]', product[key])
  #     words = list(filter(None, words))
  #     for i in range(0, 3):
  #       if (i == 0):
  #         for word in words:
  #           word_lower = word.lower()
  #           if (word_lower.startswith(substring) and word_lower not in stopwords and len(word_lower) > 2):
  #             if word_lower in options_one:
  #               options_one[word_lower] += 1
  #             else:
  #               options_one[word_lower] = 1
  #       elif i > 0 and (key == 'name' or key == 'description'):
  #         for j, word in enumerate(words):
  #           word_lower = word.lower()
  #           if word_lower.startswith(substring) and (j < len(words) - i) and len(word_lower) > 2:
  #             word_phrase_count = 1
  #             word_phrase = [word_lower]
  #             k = j + 1
  #             while word_phrase_count < i + 1:
  #               if k >= len(words) - i:
  #                 start_idx = j + 1
  #                 word_phrase += words[start_idx:]
  #                 word_phrase_count += i
  #               else:
  #                 other_word_lower = words[k].lower()
  #                 if other_word_lower in stopwords:
  #                   word_phrase.append(other_word_lower)
  #                   k += 1
  #                 else:
  #                   word_phrase.append(other_word_lower)
  #                   k += 1
  #                   word_phrase_count += 1
  #             joined_word_phrase = ' '.join(word_phrase)
  #             if i == 1:
  #               if joined_word_phrase in options_two:
  #                 options_two[joined_word_phrase] += 1
  #               else:
  #                 options_two[joined_word_phrase] = 1
  #             elif i == 2:
  #               if joined_word_phrase in options_three:
  #                 options_three[joined_word_phrase] += 1
  #               else:
  #                 options_three[joined_word_phrase] = 1
                    
  # options_one_list = sorted(((value, key) for (key, value) in options_one.items()), reverse=True)
  # options_two_list = sorted(((value, key) for (key, value) in options_two.items()), reverse=True)
  # options_three_list = sorted(((value, key) for (key, value) in options_three.items()), reverse=True)
  
  # options_one_length = len(options_one_list)
  # options_two_length = len(options_two_list)
  # options_three_length = len(options_three_list)

  # options = []
  # if options_one_length + options_two_length + options_three_length >= 10:
  #   idx = 0
  #   while len(options) < 10:
  #     for i in range(0, 3):
  #       if len(options) < 10:
  #         if i == 0 and idx < options_one_length:
  #           options.append(options_one_list[idx])
  #         if i == 1 and idx < options_two_length:
  #           options.append(options_two_list[idx])
  #         if i == 2 and idx < options_three_length: 
  #           options.append(options_three_list[idx])
  #     idx += 1
  # else:
  #   options = options_one_list + options_two_list + options_three_list
  
  # options_list = sorted(options, key=lambda x: len(x[1]))

  return {"data": options_list}, 200


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
