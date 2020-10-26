from flask import Blueprint, jsonify, request
from whim_server.models import db, User, Product, Option, Order, Merchant
from sqlalchemy import and_, or_, desc, update
from datetime import datetime

order_routes = Blueprint("orders", __name__, url_prefix="/order")


@order_routes.route("/load/<int:user_id>")
def get_all_orders(user_id):
  orders = Order.query.filter(and_(Order.user_id==user_id, Order.completed==False)).order_by(desc(Order.created_at)).all()
  data = [order.to_dict() for order in orders]
  return {'data': data}, 200


@order_routes.route('/add', methods=['POST'])
def add_order():
  data = request.get_json()
  order = Order (
                user_id=data['userId'],
                product_id=data['productId'],
                option_id=data['optionId'],
                image=data['productImgUrl'],
                )
  db.session.add(order)
  db.session.commit()
  orderData = order.to_dict()
  return { 'data': orderData }, 200


@order_routes.route("/notified/<int:order_id>")
def update_order_notified(order_id):
  Order.query.filter(Order.id == order_id).update({'notified': True})
  db.session.commit()
  updatedOrder = Order.query.filter(Order.id == order_id).one()
  orderData = updatedOrder.to_dict()
  return {'data': orderData}, 200


@order_routes.route("/more/<int:order_id>/<int:quantity>")
def more_order_quantity(order_id, quantity):
  Order.query.filter(Order.id == order_id).update({'quantity': quantity, 'notified': False})
  db.session.commit()
  updatedOrder = Order.query.filter(Order.id == order_id).one()
  orderData = updatedOrder.to_dict()
  return {'data': orderData}, 200


@order_routes.route("/update/<int:order_id>/<int:quantity>")
def update_order_quantity(order_id, quantity):
  Order.query.filter(Order.id == order_id).update({'quantity': quantity})
  db.session.commit()
  updatedOrder = Order.query.filter(Order.id == order_id).one()
  orderData = updatedOrder.to_dict()
  return {'data': orderData}, 200


@order_routes.route("/remove/<int:order_id>")
def remove_order(order_id):
  Order.query.filter(Order.id==order_id).delete()
  db.session.commit()
  return 'Success', 200


@order_routes.route("/complete/<int:user_id>")
def complete_order(user_id):
  new_date_paid = datetime.now()
  Order.query.filter(and_(Order.user_id==user_id, Order.completed==False)).update({'completed': True, 'date_paid': new_date_paid})
  db.session.commit()
  return 'Success', 200


