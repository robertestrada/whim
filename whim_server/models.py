from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates, backref
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import re

db = SQLAlchemy()

class User(db.Model):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  first_name = db.Column(db.String(40), nullable = False)
  last_name = db.Column(db.String(40), nullable = False)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String, nullable = False)
  pic_url = db.Column(db.String)
  created_at = db.Column(db.DateTime, default=datetime.now)
  updated_at = db.Column(db.DateTime, onupdate=datetime.now)
  
  orders = db.relationship("Order", backref='user')
  
  def to_dict(self):
    return {
      "id": self.id,
      "first_name": self.first_name,
      "last_name": self.last_name,
      "email": self.email,
      "pic_url": self.pic_url,
    }

  @validates('email')
  def validate_email(self, key, email):
    if User.query.filter(User.email==email).first():
      raise AssertionError('Email already in use')

    if not re.match("[^@]+@[^@]+\.[^@]+", email):
      raise AssertionError('Provided email is not an email address')

    return email

  @property
  def password(self):
      return self.hashed_password

  def set_password(self, password):
      if not re.match('\d.*[A-Z]|[A-Z].*\d', password):
          raise AssertionError('Password must contain 1 capital letter and 1 number')
      if len(password) < 8 or len(password) > 50:
          raise AssertionError('Password must be between 8 and 50 characters')
      self.hashed_password = generate_password_hash(password)

  def check_password(self, password):
      return check_password_hash(self.password, password)
    

class Merchant(db.Model):
  __tablename__ = 'merchants'

  id = db.Column(db.Integer, primary_key=True)
  merchant_name = db.Column(db.String(40), nullable=False)
  pic_url = db.Column(db.String)
  created_at = db.Column(db.DateTime, default=datetime.now)
  updated_at = db.Column(db.DateTime, onupdate=datetime.now)
  products = db.relationship("Product", backref="merchant", cascade="all, delete-orphan", lazy="joined")

  def main_merchant_rating(self):
    return {"stars": 4.4, "amount": 4129, "positive": 0.92}

  def to_dict(self):
    return {
      "id": self.id,
      "merchant_name": self.merchant_name,
      "pic_url": self.pic_url,
      # "merchant_rating": 4.5,
    }
    
class Order(db.Model):
  __tablename__ = 'orders'
  
  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
  option_id = db.Column(db.Integer, db.ForeignKey('options.id'), nullable=False)
  image = db.Column(db.String(2000), nullable=False)
  quantity = db.Column(db.Integer, default=1)
  notified = db.Column(db.Boolean, default=False)
  completed = db.Column(db.Boolean, default=False)
  created_at = db.Column(db.DateTime, default=datetime.now)
  updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
  date_paid = db.Column(db.DateTime)
  
  def to_dict(self):
    return {
          "id": self.id,
          "user_id": self.user_id,
          "product_id": self.product_id,
          "product_data": self.product.cart_dict(),
          "option_id": self.option_id,
          "option_data": self.option.to_dict(),
          "quantity": self.quantity,
          "image": self.image,
          "notified": self.notified,
          "completed": self.completed,
          "created_at": self.created_at,
          "updated_at": self.updated_at,
          "date_paid": self.date_paid,
          }


class Product(db.Model):
  __tablename__ = 'products'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  description = db.Column(db.Text, nullable=False)
  imgs_folder = db.Column(db.String(255), nullable=False)
  product_imgs_amt = db.Column(db.Integer, nullable=False)
  category = db.Column(db.String(255), nullable=False)
  instant_buy = db.Column(db.Boolean, nullable=False)
  add_on = db.Column(db.Boolean, nullable=False)
  advert = db.Column(db.Boolean, nullable=False)
  verified = db.Column(db.Boolean, default=False)
  shipping_speed = db.Column(db.Integer, nullable=False)
  shipping_usa = db.Column(db.Boolean, nullable=False)
  merchant_id = db.Column(db.Integer, db.ForeignKey("merchants.id"), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now)
  updated_at = db.Column(db.DateTime, onupdate=datetime.now)
  
  options = db.relationship("Option", backref="product", cascade="all, delete-orphan", lazy="joined")
  orders = db.relationship("Order", backref="product", cascade="all, delete-orphan", lazy="joined")
    
  def feed_pricing(self):
    pricing = {"change": 0, "starting": 0, "ending": 0}
    for option in self.options:
      price_delta = (option.price_ending - option.price_starting) / option.price_starting
      if price_delta < pricing["change"]:
        pricing = {
                  "change": round(price_delta, 2), 
                  "starting": option.price_starting, 
                  "ending": option.price_ending
                  }
    if pricing["change"] == 0:
      return {"change": 0, "starting": self.options[0].price_starting, "ending": self.options[0].price_ending}
    return pricing
  
  def feed_almost_gone(self):
    for option in self.options:
      delta = option.inventory_ending / option.inventory_starting
      if delta < 0.1:
        return True
      
  def feed_past_orders(self):
    return 10000
      
  def main_options(self):
    options_list = []
    for option in self.options:
      option_full = option.to_dict()
      options_list.append({
                          "id": option_full["id"],
                          "size_order": option_full["size_order"],
                          "size": option_full["size"], 
                          "color_order": option_full["color_order"],
                          "color": option_full["color"], 
                          "price_ending": option_full["price_ending"], 
                          "inventory_ending": option_full["inventory_ending"], 
                          "weight": option_full["weight"]
                          })
    return options_list
  
  def main_dict(self):
    return {
          "id": self.id,
          "name": self.name,
          "description": self.description,
          "imgs_folder": self.imgs_folder,
          "product_img_amt": self.product_imgs_amt,
          "category": self.category,
          "feed_pricing": self.feed_pricing(),
          "options_data": self.main_options(),
          "instant_buy": self.instant_buy,
          "add_on": self.add_on,
          "shipping_speed": self.shipping_speed,
          "shipping_usa": self.shipping_usa,
          "verified": self.verified,
          "merchant": self.merchant.to_dict(),
          "created_at": self.created_at,
          "updated_at": self.updated_at,
          "options": [option.to_dict() for option in self.options],
        }
    
  def cart_dict(self):
    return {
        "id": self.id,
        "name": self.name,
        "imgs_folder": self.imgs_folder,
        "description": self.description,
        "category": self.category,
        "instant_buy": self.instant_buy,
        "add_on": self.add_on,
        "shipping_speed": self.shipping_speed,
        "shipping_usa": self.shipping_usa,
        "verified": self.verified,
        "merchant": self.merchant.to_dict(),
        "created_at": self.created_at,
        "updated_at": self.updated_at,
    }
    
  def feed_dict(self):
    return {
          "id": self.id,
          "name": self.name,
          "category": self.category,
          "imgs_folder": self.imgs_folder,
          "feed_pricing": self.feed_pricing(),
          "feed_almost_gone": self.feed_almost_gone(),
          "instant_buy": self.instant_buy,
          "add_on": self.add_on,
          "advert": self.advert,
          "shipping_speed": self.shipping_speed,
          "shipping_usa": self.shipping_usa,
          "verified": self.verified,
          "feed_past_orders": self.feed_past_orders(),
          "created_at": self.created_at,
          "updated_at": self.updated_at,
        }


class Option(db.Model):
  __tablename__ = 'options'

  id = db.Column(db.Integer, primary_key=True)
  size_order = db.Column(db.Integer)
  size = db.Column(db.String(30))
  color_order = db.Column(db.Integer)
  color = db.Column(db.String(30))
  price_starting = db.Column(db.Float, nullable=False)
  price_ending = db.Column(db.Float)
  inventory_starting = db.Column(db.Integer, nullable=False)
  inventory_ending = db.Column(db.Integer)
  weight = db.Column(db.Float, nullable=False)
  product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now)
  updated_at = db.Column(db.DateTime, onupdate=datetime.now)
  
  orders = db.relationship('Order', backref='option', lazy="joined")

  def to_dict(self):
    return {
          "id": self.id,
          "size_order": self.size_order,
          "size": self.size,
          "color_order": self.color_order,
          "color": self.color,
          "price_starting": self.price_starting,
          "price_ending": self.price_ending,
          "inventory_starting": self.inventory_starting,
          "inventory_ending": self.inventory_ending,
          "weight": self.weight,
          "created_at": self.created_at,
          "updated_at": self.updated_at,
        }
