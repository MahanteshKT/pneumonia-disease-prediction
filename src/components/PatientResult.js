import React, { useState } from 'react'
import { useResult } from '../hooks/useResult';
import { Link } from 'react-router-dom';
// import jsPDF from 'jspdf';
import axios from "axios";
const PatientResult =(props) => {
  const {dispatch}=useResult();
  const json=useResult();
  const [Msg,setMsg]=useState(null)
  const [Error,setError]=useState(false);
  const [pdf,setPdf]=useState(null);
  const PdfOnSubmit=async(name)=>{
    dispatch({type:"LOADING",payload:true})  
    
    await axios({
        url:"/pdf/"+name,
        method:'GET',
        responseType:"blob",
        }).then((response)=>{
          
          dispatch({type:"NOTLOADING"})
          console.log("aij",response.data);  
          
          const res=URL.createObjectURL(response.data);
          setPdf(res)
          
          
           
          
        }).catch((error)=>{
          console.log("not get")
          dispatch({type:"NOTLOADING"})
          dispatch({type:"ERRORMSG",payload:"patient record downloaded not successfully"})
        })

        if(pdf){
          const aTag=document.createElement('a')
          aTag.href=pdf;
          aTag.setAttribute("download",`${name}.pdf`)
          document.body.appendChild(aTag)
          aTag.click();
          dispatch({type:"SUCCESSMSG",payload:"patient record downloaded successfully"})
          aTag.remove(); 
        }
        
      
  }

  const SendsmsOnsubmit = (name)=>{
    axios({
      url:"/send-sms/"+name,
      method:'GET',
      responseType:"json"
      }).then((response)=>{
        setError(false)
        setMsg(response.json())
        dispatch({type:"NOTLOADING"})
        dispatch({type:"SUCCESSMSG",payload:Msg})
        console.log(response)
        console.log("msg sended to patient successfully",response.msg);  
        }).catch((error)=>{
          setError(true)
          dispatch({type:"NOTLOADING"})
          dispatch({type:"ERRORMSG",payload:"Msg Not sended to patient successfully"})
          console.log("msg not sended to patient-",error.msg)
        })
  }

  return (
    <div className='form'>
    <div className='fm-pg'>
      <h3 className='fm-header' style={{fontSize:"25px"}}>Patient Details</h3>
        
       
          
            {json.patient && 
                <div className='details'>
                <div className='details-each'>
                <label htmlFor="name" >Name:</label>
                  <p id="name">{json.patient.name}</p>
                </div>
                
                <div className='details-each'>
                  <label htmlFor="age" >Age:</label>
                  <p id="age">{json.patient.age}</p>
                </div>

                <div  className='details-each'>
                <label htmlFor="mobile" >Mobile:</label>
                  <p id="mobile">{json.patient.mobile}</p>
                </div>

                <div className='details-each'>
                  <p className='msg'>{json.patient.msg}</p>
                </div>
                

                </div>
            }
       

    </div>
    
    <div className='fm-pg'>
            <div className='btns'>
              <Link to="/detect">
                <button onClick={()=>json.dispatch({type:'NOTRESULT'})} className='btn'>Back To Detect Page</button>
              </Link>
                <button className='btn' onClick={()=>SendsmsOnsubmit(json.patient.name)}>Send Result To patient</button>
              {/* <a className='btn'  href={pdf} onClick={()=>{PdfOnSubmit(json.patient.name)}} download="react">Download pdf</a> */}
              <button className='btn' onClick={()=>PdfOnSubmit(json.patient.name)}>download pdf</button>
            

            </div>
    </div>

</div>


  )
}

export default PatientResult
