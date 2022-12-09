import pymongo
import os
from dotenv import load_dotenv

load_dotenv()
from pymongo import MongoClient
client = MongoClient(os.getenv('MONGODB_URI'))

print(client.list_database_names())
db = client["roadtrip_planner"]
collection = db["suburbs"]

def insert_data(data):
    collection.insert_one(data)


def query_existence_of_suburb(suburb_name_list):
    res = collection.find_one({"suburb.name": })
    for data in res:
        print(data)

def add_new_suburb(suburb_name, lat, lon):
    collection.insert({
        "suburb": {
            "name": suburb_name,
            "lat": lat,
            "lon": lon,
        }
    })
    
query_existence_of_suburb( ["marsden park", "kensington", "maroubra"])
# add_new_suburb("marsden park", 1, 2)





client.close()

