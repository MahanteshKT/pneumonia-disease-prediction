# from fpdf import FPDF

# pdf=FPDF('p','mm','Letter')

# pdf.add_page()
# pdf.set_font('helvetica','',16)

# pdf.cell(40,40,'hello world')
# filname="../Pdfs/pdf_1.pdf"
# pdf.output(name="pdf_1.pdf",dest='../Pdfs/')
import vonage


vouage_key='cf7c34fc'
vouage_secret='caJ0AtqImfAvM89x'
client =vonage.Client(
    key=vouage_key,
    secret=vouage_secret
)
responseData=client.sms.send_message({
    "from": "Vonage APIs",
        "to": "+919986654564",
        "text": "from PNEUMONIA DETECTION CENTER,\
                        recently you tested for pneumonia detection.\
                        we got result .\
                    Result:it is Positive  "
})

if responseData["messages"][0]["status"] == "0":
    print("Message  sent successfully.")
else:
    print(f"Message failed with error: {responseData['messages'][0]['error-text']}")

