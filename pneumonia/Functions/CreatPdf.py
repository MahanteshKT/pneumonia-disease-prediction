from fpdf import FPDF


def createpdf(patient):
    title="Pneumonia Detection Center"
    class PDF(FPDF):
        def header(self):
            #logo
            self.image('./images/logo2.jpg',10,8,25)
            self.set_text_color(220,50,50)
            self.image('./images/logo3.png',180,8,25)

            #font

            self.set_font('helvetica','B',20)
            #calculate with of title and position
            title_w=self.get_string_width(title)+6
            doc_w=self.w
            self.set_x((doc_w-title_w)/2)
            print(self.h)
            self.set_fill_color(245,245,245)
            self.set_text_color(220,50,50)
            self.set_line_width(1)
            #title
            self.cell(title_w,10,title,border=1,ln=1,align='C',fill=1)
            #line break
            self.ln(10)
        
        #footer
        def footer(self):
            self.set_y(-15)
            self.set_font('helvetica','I',18)
            self.set_text_color(169,169,169)
            self.cell(0,10,f"page end",align="C")

    pdf=PDF('p','mm','Letter')

    #metadata
    pdf.set_title(title)
    pdf.set_author('Mahantesh K T')

    pdf.add_page()
    
    # with pdf.local_context(fill_opacity=0.25,stroke_opacity=0.5):
        


    # with pdf.local_context(fill_opacity=0.25,stroke_opacity=0.35):
    #     pdf.image("download1.jpg",x=-0.5,w=pdf.w+1,ln=0)

    pdf.set_font('helvetica','B',16)
    pdf.set_text_color(220,50,50)
    pdf.cell(1,7,'',border=0,ln=1)
    pdf.cell(1,1,'',border=1,ln=1)
    pdf.cell(0,10,'',border=0,ln=1)
    pdf.cell(60,10,'Patient Name:',ln=0)
    pdf.cell(40,10,patient['name'],ln=1)
    pdf.cell(60,10,'Patient Age:',ln=0)
    pdf.cell(40,10,patient['age'],ln=1)
    pdf.cell(60,10,'Mobile no.:',ln=0)
    pdf.cell(40,10,patient['mobile'],ln=1)
    pdf.cell(60,40,'Result:',ln=0)
    
    pdf.set_font('helvetica','BU',18)
    if patient['status']=='Not Affected':
        pdf.set_text_color(20,255,70)
    else:
        pdf.set_text_color(255,5,0)
    pdf.cell(40,40,patient['msg'],ln=1)
    pdf.image(f"static/{patient['name']}.jpg",x=10,w=pdf.w-20,h=100)
    
    pdf.output(name=f"../Pdfs/pdf_1.pdf",dest='../Pdfs/')   
    # stream=io.BytesIO(pdf.output(dest='S').encode('utf-8'))