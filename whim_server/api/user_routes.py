from flask import Blueprint, jsonify
from whim_server.models import User

user_routes = Blueprint("users", __name__, "")

@user_routes.route('/users')
def index():
  response = User.query.all()
  return { "users": [user.to_dict() for user in response]}