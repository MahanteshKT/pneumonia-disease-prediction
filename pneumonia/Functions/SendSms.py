#for sending data via sms
import vonage
vouage_key='cf7c34fc'
vouage_secret='caJ0AtqImfAvM89x'
client =vonage.Client(
    key=vouage_key,
    secret=vouage_secret
)



def sendsmstopatient(patient):
    responseData=client.sms.send_message({
    "from": "Vonage APIs",
        "to": f"+91{patient['mobile']}",
        "text": f"from PNEUMONIA DETECTION CENTER,\
                        hello {patient['name']},age-{patient['age']}, \
                        recently you tested for pneumonia detection.\
                        we got result .\
                    Result:Your {patient['status']} "
    })

    if responseData["messages"][0]["status"] == "0":
        msg=f"Message sent successfully to {patient['name']} of mobile no.{patient['mobile']}"
        print(msg)
        return msg
    else:
        # msg=f"Message not Sent failed with error: {responseData['messages'][0]['error-text']}"
        # print(msg)
        return 
    
