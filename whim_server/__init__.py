import os
from flask import Flask, render_template, request, session, jsonify, send_from_directory
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf, validate_csrf
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, jwt_required, get_raw_jwt



from whim_server.models import db, User
from whim_server.api.user_routes import user_routes
from whim_server.api.product_routes import product_routes

from whim_server.config import Config

app = Flask(__name__, static_url_path='')

app.config.from_object(Config)
app.register_blueprint(user_routes)
app.register_blueprint(product_routes)

db.init_app(app)
migrate = Migrate(app, db)

## Application Security
jwt = JWTManager(app)
blacklist=set()

@jwt.token_in_blacklist_loader
def check_if_token_in_blacklist(decrypted_token):
    jti = decrypted_token['jti']
    return jti in blacklist

@app.route('/logout', methods=["DELETE"])
@jwt_required
def logout():
    jti = get_raw_jwt()['jti']
    blacklist.add(jti)
    return jsonify({"msg": "Successfully logged out"}), 200

CORS(app)
@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') else False,
        samesite='Strict' if os.environ.get('FLASK_ENV') else None,
        httponly=True)
    return response

@app.route('/', defaults={'path': ''})
@app.route('/<path>')
def react_root(path):
    return app.send_static_file('index.html')
