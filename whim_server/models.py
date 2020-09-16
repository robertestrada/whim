from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import re

db = SQLAlchemy()

class User(db.Model):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)

  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email
    }
