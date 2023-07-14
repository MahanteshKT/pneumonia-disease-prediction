import React, { useContext, useRef, useState } from 'react'
import { PneumoContext } from '../Context/PneumoContext';

// const axios=require("axios")



function DetectForm() {
    // const {fileRef}=useRef(null);
    
    const [Person,setPerson]=useState({"name":"","age":"","mobile":"","img":""});
    const [error,seterror]=useState(null);
    const [filepath,setfilepath]=useState(null);
    const [patientres,setpatientres]=useState(null);
    const {dispatch}=useContext(PneumoContext);
    
    const checkformValidation=()=>{
        if((Person.name==="" || Person.age==="" || Person.mobile==="" || Person.img==="")){
            dispatch({type:'ERRORMSG',payload:"All Fields must be filled"});
            return true;
        }
        dispatch({type:'ERRORMSG',payload:null});
        return false;
        
    }

    const handleSubmit= async (e)=>{
        
        e.preventDefault(); 
        if(checkformValidation()){
            return false;
        }
        if(checkformValidation()===false){
            dispatch({type:"LOADING",payload:true})
            let formData= new FormData();    
        formData.append('name',Person.name);
        formData.append('age',Person.age);
        formData.append('mobile',Person.mobile);
        formData.append("img",filepath.files[0]);
        const response=await fetch("/detect-form",{
            method:'POST',
            body:formData,
            })
        

        const json=await response.json();
        
        if(!response.ok){
            dispatch({type:"NOTLOADING"})
            console.log(json.error)
            seterror(json.error);
            dispatch({type:'RESULT',payload:null});
            dispatch({type:'ERRORMSG',payload:"Error occured while detecting"});

        }
        if(response.ok){
            dispatch({type:"NOTLOADING"})
            if(json.msg==="error"){
                dispatch({type:'ERRORMSG',payload:"Sorry unable to add,Name already exist in the database "});
                return 
            }
            setPerson({"name":"","age":"","mobile":"","img":""})
            setpatientres(json);
            console.log('new patient added',json);
            dispatch({type:'RESULT',payload:json});
            dispatch({type:'SUCCESSMSG',payload:"Successfully finished Detection"});
        }
        }
        


    }
    return (
        <div className='form'>
        <form className='fm-pg' onSubmit={handleSubmit}>
            <h3 className='fm-header'>Pneumonia Detection</h3>
            
            <div>{error}</div>
            <div className='fm-form'>
                <div>
                    <label htmlFor="inpt">Patient Name:</label>
                    <input type="text" id="inpt" name="name" onChange={(e)=>{setPerson({...Person,"name":e.target.value})}} value={Person.name}/>
                </div>

                <div>
                    <label htmlFor="inpt">Patient Age:</label>
                    <input type="text" id="inpt" name="age" onChange={(e)=>{setPerson({...Person,"age":e.target.value})}} value={Person.age}/>
                </div>

                <div>
                    <label htmlFor="inpt">Patient Mobile No:</label>
                    <input type="text" id="inpt" name="mobileno" onChange={(e)=>{setPerson({...Person,"mobile":e.target.value})}} value={Person.mobile}/>
                </div>

                <div>
                <label htmlFor="inpt">Patient Chest X-ray Image:</label>
                <input type="file" id="inpt"  ref={(ref) => { setfilepath(ref) }} name="Img" 
                        onChange={(e)=>{
                            setPerson({...Person,"img":e.target.value})
                            setfilepath(e.target.files)
                            }} value={Person.img}/>
                </div>
                
                <button>Detect</button>

            </div>
        </form>
        </div>
    )
    }
export default DetectForm;
