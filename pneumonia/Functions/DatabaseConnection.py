

import pymongo

#database connection and setup
cliente = pymongo.MongoClient("mongodb+srv://mkt:4UB19CS029u@cluster0.08qlmav.mongodb.net/penumonia_detection?retryWrites=true&w=majority",maxPoolSize=50,connect=False)

#db=client.get_database("pneumonia_detection")
db = pymongo.database.Database(cliente,"penumonia_detection")
print(db.list_collection_names())
#colllection=db.get_collection("pateint_details")
col=pymongo.collection.Collection(db,'patient_details')

import json
from bson import json_util
from bson.json_util import dumps

#getting data from database
def Records():
    patients=col.find()
    
    patients=[single for single in patients]
    print(json.loads(json_util.dumps(patients)))

    total=col.find()
    total=len(list(total))
    print(total)

    affected=col.find({"status":"Affected by Pneumonia"})
    affected=len(list(affected))
    print(affected)
    affected_per=int((int(affected)/int(total))*100)
    print(affected_per)

    normal=col.find({"status":"Not Affected"})
    normal=len(list(normal))
    print(normal)
    normal_per=int((int(normal)/int(total))*100)
    print(normal_per)

    doc=[
        {
            "name":'Normal',
            "num":normal,
            "percentage":normal_per
        },
        {
            "name":"Pneumonia",
            "num":affected,
            "percentage":affected_per,
        },{
            "name":"Total",
            "num":total,
            "percentage":"100",
        }

        
        
        
    ]
    return doc


# def DataInsert(doc):
#     response=col.insert_one(doc)
#     return response

# def UpdateOne(msg,status):
#     col.update_one({"_id":response.inserted_id},{"$set":{"msg":msg,"check":"checked","status":status}})
    
# def FindOneById(response):
#     patient=col.find_one({"_id":response.inserted_id})
#     return patient
