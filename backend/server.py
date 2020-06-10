from flask import Flask
from flask import request
import json
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from bson.json_util import dumps
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/grocery"
mongo = PyMongo(app)

@app.route('/users')
def user(): 
    user = mongo.db.user.find()
    return dumps(user)

@app.route('/users/<ObjectId:user_id>')
def userShow(user_id):
    user = mongo.db.user.find_one({"_id": user_id})
    return dumps(user)

@app.route('/users/create', methods=['POST'])
def user_create():
    user = {}
    user['_id'] = ObjectId()
    user['name'] = request.json['name']
    user['quantity'] = request.json['quantity']
    user['description']=request.json['description']
    mongo.db.user.insert(user)
    return dumps(user)

@app.route('/users/update/<ObjectId:user_id>', methods=["POST"])
def user_update(user_id):
    name = request.json['name']
    quantity = request.json['quantity']
    description=request.json['description']
    mongo.db.user.update({"_id": user_id}, {"$set": {"name": name, "quantity": quantity,"description":description}})
    return dumps({"name": name, "quantity": quantity,"description":description})

@app.route('/users/delete/<ObjectId:user_id>')
def user_delete(user_id):
    mongo.db.user.remove({'_id': user_id})
    return dumps({"message": "User Deleted"})