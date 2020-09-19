from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
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
  merchant_rating = db.Column(db.Numeric(2, 1))
  merchant_rating_amount = db.Column(db.Integer)
  verified = db.Column(db.Boolean, default=False)
  created_at = db.Column(db.DateTime, default=datetime.now)
  updated_at = db.Column(db.DateTime, onupdate=datetime.now)

  def to_dict(self):
    return {
        "id": self.id,
        "merchant_name": self.merchant_name,
        "pic_url": self.pic_url,
    }


class Product(db.Model):
  __tablename__ = 'products'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  description = db.Column(db.String(2000), nullable=False)
  category = db.Column(db.String(255), nullable=False)
  size = db.Column(db.String(255), nullable=False)
  color = db.Column(db.String(255), nullable=False)
  price_starting = db.Column(db.Numeric(9, 2), nullable=False)
  price_ending = db.Column(db.Numeric(9, 2))
  inventory_starting = db.Column(db.Integer, nullable=False)
  inventory_ending = db.Column(db.Integer)
  instant_buy = db.Column(db.Boolean, nullable=False)
  add_on = db.Column(db.Boolean, nullable=False)
  shipping_speed = db.Column(db.Integer, nullable=False)
  shipping_usa = db.Column(db.Boolean, nullable=False)
  merchant_id = db.Column(db.Integer, db.ForeignKey("merchants.id"), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.datetime.now)
  updated_at = db.Column(db.DateTime, onupdate=datetime.datetime.now)

  def to_dict(self):
    return {
        "id": self.id,
        "name": self.name,
        "description": self.description,
        "category": self.category,
        "size": self.size,
        "color": self.color,
        "price_starting": self.price_starting,
        "price_ending": self.price_ending,
        "inventory_starting": self.inventory_starting,
        "inventory_ending": self.inventory_ending,
        "completed": self.completed,
        "created_at": self.created_at,
        "updated_at": self.updated_at,
    }
