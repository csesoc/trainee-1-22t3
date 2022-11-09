import pymongo
from pymongo import MongoClient
cluster = MongoClient("mongodb+srv://<USERNAME>:<PASSWORD>@cluster-test.fndbj.mongodb.net/UserData?retryWrites=true&w=majority")
db = cluster["roadtrip_planner"]
collection = db["users"]
