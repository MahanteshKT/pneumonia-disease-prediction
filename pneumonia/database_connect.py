import pymongo
import json
from bson.json_util import dumps

client = pymongo.MongoClient("mongodb+srv://mkt:4UB19CS029u@cluster0.08qlmav.mongodb.net/penumonia_detection?retryWrites=true&w=majority",maxPoolSize=50,connect=False)

#db=client.get_database("pneumonia_detection")
db = pymongo.database.Database(client,"penumonia_detection")
print(db.list_collection_names())
#colllection=db.get_collection("pateint_details")
col=pymongo.collection.Collection(db,'patient_details')
# doc={
#     "name":"mahanteshd",
#     "age":22,
#     "mobile":"99886777",
#     "path":"c://"

# }
# response=col.insert_one(doc)
# id=response.inserted_id
# print(id)
col_results=json.loads(dumps(col.find().limit(5).sort("time",-1)))

print(col_results)

