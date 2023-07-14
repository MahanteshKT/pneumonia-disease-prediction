import json
from flask import Flask,request,jsonify
from flask_pymongo import PyMongo
import pymongo
# from pyresparser import ResumeParser
app=Flask(__name__)
app.config["SECRET_KEY"] ="mktmktmkt"
app.config["MONGO_URI"]="mongodb+srv://mkt:4UB19CS029u@cluster0.08qlmav.mongodb.net/penumonia_detection?retryWrites=true&w=majority"

# setup mongodb
mongodb_client=PyMongo(app)
db=mongodb_client.db


#json string
x='{ "name":"mahantesh","ran":[2,3,4]}'

#python object
a='{ "name":"mahantesh","skills":["reactjs","angular","c#"]}'

#runs the jsonstring into an object
y=json.loads(x)

#converting to json string from objects
a=json.dumps(a)
print(a)

@app.route("/detect")
def detect():
    return { "name":"mahantesh","msg":"ggoog"}


if __name__=="__main__":
    app.run(debug=True)




