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