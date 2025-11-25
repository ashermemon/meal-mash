import os
from flask import Flask, request, jsonify, session, send_from_directory
from flask_cors import CORS
from flask_session import Session
from flask_bcrypt import Bcrypt
from config import ApplicationConfig
from models import db, User


import asyncio
import base64
import math
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import random
import gc
import time







app = Flask(__name__)
app.config.from_object(ApplicationConfig)
app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=False)


jwt = JWTManager(app)

CORS(app, supports_credentials=True, origins="*")    
bcrypt = Bcrypt(app)

db.init_app(app)
with app.app_context():
    #db.drop_all()
    db.create_all()

server_session = Session(app)





@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    exists = User.query.filter_by(email=email).first() is not None
    if exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    new_user = User(email=email, password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=str(new_user.id))

    return jsonify({
        "id": new_user.id,
        "email": new_user.email,
        "access_token": access_token
    }), 201




@app.route("/login", methods = ["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email = email).first()
    
    

    if user is None:
        return jsonify({"error" : "Unathorized"}), 401
    


    if not bcrypt.check_password_hash(user.password,password):
        return jsonify({"error": "Unauthorized"}), 401
    
    

    access_token = create_access_token(identity=str(user.id))

    return jsonify(access_token = access_token)

@app.route("/logout", methods=["POST", "GET"])
def logout_user():
    # With JWT, logout is typically handled client-side by removing the token
    return jsonify({"message": "Logged out. Remove token on client."}), 200

@app.route("/ping")
def ping():
    return jsonify({"message" : "ping"}), 200


@app.route("/droptable")
def drop():
    db.drop_all()
    return jsonify({"message" : "dropped tables"}), 200

    

@jwt.invalid_token_loader
def invalid_token_callback(error):
    print("Invalid token:", error)
    return jsonify({"error": "Invalid token"}), 422

@jwt.unauthorized_loader
def missing_token_callback(error):
    print("Missing token:", error)
    return jsonify({"error": "Missing token"}), 401

@app.route("/@me", methods=["GET"])
@jwt_required()
def get_current_user():
    print("Authorization header:", request.headers.get("Authorization"))
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=int(user_id)).first()


    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "email": user.email
    })



if __name__ == '__main__':
    app.run(debug=True)
