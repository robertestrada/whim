from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import re

db = SQLAlchemy()

class Friendship(db.Model):
  __tablename__= "friendships"
  id= db.Column(db.Integer, primary_key = True)
  user_first_id = db.Column(db.Integer, db.ForeignKey('users.id'), index=True)
  user_second_id = db.Column(db.Integer, db.ForeignKey('users.id'))
  status = db.Column(db.Integer, default = 0)
  db.UniqueConstraint('user_first_id', 'user_second_id', name='unique_friendships')

class User(db.Model):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  first_name = db.Column(db.String(40), nullable = False)
  last_name = db.Column(db.String(40), nullable = False)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String, nullable = False)
  picUrl = db.Column(db.String)
  balance = db.Column(db.Numeric(9,2))
  created_at = db.Column(db.DateTime, default=datetime.datetime.now)
  updated_at = db.Column(db.DateTime, onupdate=datetime.datetime.now)


  friends = db.relationship('User',
                            secondary=Friendship.__table__,
                            primaryjoin=id==Friendship.user_first_id,
                            secondaryjoin=id==Friendship.user_second_id,
                            cascade="all"
                            )
  
  def has_friends(self):
    return len(self.friends) > 0

  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "first_name": self.first_name,
      "last_name": self.last_name,
      "email": self.email,
      "picUrl": self.picUrl,
      "balance": float(self.balance),
      "has_friends": self.has_friends()
    }

  def befriend(self, friend):
      if friend not in self.friends:
        self.friends.append(friend)
        friend.friends.append(self)

  def censored_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "first_name": self.first_name,
      "last_name": self.last_name,
      "full_name": self.first_name + " " + self.last_name,
      "picUrl": self.picUrl,
    }

  def unfriend(self, friend):
      if friend in self.friends:
        self.friends.remove(friend)
        friend.friends.remove(self)

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

  def accept(self, friend):
    if friend in self.friends:
      user1_friendship = Friendship.query.filter(Friendship.user_first_id == friend.id, Friendship.user_second_id == self.id).one()
      user2_friendship = Friendship.query.filter(Friendship.user_first_id == self.id, Friendship.user_second_id == friend.id).one()
      user1_friendship.status = 1
      user2_friendship.status = 1