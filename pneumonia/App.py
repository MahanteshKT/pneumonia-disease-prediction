from flask import Flask,render_template,request,jsonify,redirect,url_for,send_file
from PIL import Image

import pymongo
import json
from bson import json_util
from bson.json_util import dumps
import os

import io
from flask_cors import CORS,cross_origin

#database connection
from Functions.DatabaseConnection import Records,col

#model_buld file
from penumonia_test import model_build

#create pdf
from Functions.CreatPdf import createpdf


#import sendsms function
from Functions.SendSms import sendsmstopatient


app = Flask(__name__)
cors=CORS(app)






@app.route('/detect-form',methods=['POST','GET'])
def index():
    if request.method == 'POST':
        name=request.form["name"]
        age=request.form["age"]
        mobile=request.form["mobile"]
        #extracting image from browser form
        img=request.files['img']
        
        path=f"{name}.jpg"
        
        patient=col.find_one({"name":name})
        if patient:
            return {"msg":"error"}

        print(json.loads(json_util.dumps(patient)))
        
        doc={
            "name":name,
            "age":age,
            "mobile":mobile,
            "path":path,
            "msg":""
        }
        

        response=col.insert_one(doc)
        # img=request.files['img']
        img.save(f'static/{name}.jpg')
        
        result =model_build(name)
        if result==0:
            msg= f"{name} is Affected By PNEUMONIA"
            status="Affected by Pneumonia"
        else:
            msg=f"{name} is not Affected"
            status="Not Affected"
        
        col.update_one({"_id":response.inserted_id},{"$set":{"msg":msg,"check":"checked","status":status}})
        patient=col.find_one({"_id":response.inserted_id})
        print(json.loads(json_util.dumps(patient)))
        return json.loads(json_util.dumps(patient))
    else:
        return {"msg":"error"}



@app.route('/dashboard',methods=['POST','GET'])
def dashboard():
    patients=col.find()
    patients=[single for single in patients]
    doc=Records()
    send={
        "patientslist":json.loads(json_util.dumps(patients)),
        "Record":doc
    }
    return send

@app.route('/patient/<name>',methods=['POST','GET'])
def delete(name):
    patientdel=col.delete_one({"name":name})
    print(patientdel)
    return redirect(url_for("dashboard"))
    

@app.route('/patient/search/<name>',methods=['POST','GET'])
def search(name):
    patient=col.find({"name":name})
    print(patient)
    doc=Records()
    send={
        "patientslist":json.loads(json_util.dumps(patient)),
        "Record":doc
    }
    return send



@app.route('/pdf/<name>',methods=['POST','GET'])
@cross_origin()
def pdf(name):
    patient=col.find_one({"name":name})
    print(patient)
    #creating pdf
    createpdf(patient)
    filname=f"../Pdfs/pdf_1.pdf"
    return send_file(
        filname,
        mimetype="application/pdf"
    )


@app.route('/send-sms/<name>',methods=['POST','GET'])
@cross_origin()
def send_sms(name):   
    patient=col.find_one({"name":name})
    print(patient)
    #sending sms
    msg=sendsmstopatient(patient)
    send={"msg":msg}
    return send

if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0")