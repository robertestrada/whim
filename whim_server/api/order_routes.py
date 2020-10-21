from flask import Blueprint, jsonify, request
from whim_server.models import db, User, Product, Option, Order, Merchant
from sqlalchemy import and_, or_, desc, update
import datetime

order_routes = Blueprint("orders", __name__, url_prefix="/order")


@order_routes.route("/all/<int:user_id>")
def get_all_orders(user_id):
  orders = Order.query.filter(Order.user_id==user_id).order_by(desc(Order.updated_at)).all()
  data = [order.to_dict() for order in orders]
  return data, 200


@order_routes.route('/add', methods=['POST'])
def add_order():
  data = request.get_json()
  order = Order (
                user_id=data['userId'],
                product_id=data['productId'],
                option_id=data['optionId'],
                quantity=data['quantity'],
                merchant_id=data['merchantId'],
                )

  db.session.add(order)
  db.session.commit()
  return 200


@order_routes.route("/remove/<int:order_id>")
def remove_order(order_id):
  order = Order.query.filter(Order.id==order_id).first()
  db.session.delete(order)
  db.session.commit()
  return 200


@order_routes.route("/update/<int:order_id>/<int:quantity>")
def update_order_quantity(order_id, quantity):
  Order.query.filter(Order.id==order_id).update({ 'quantity': quantity })
  return 200


@order_routes.route("/complete/<int:order_id>")
def complete_order(order_id):
  Order.query.filter(Order.id == order_id).update({'completed': True})
  return 200


