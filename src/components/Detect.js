import React, { useEffect, useState } from 'react'
import DetectForm from './DetectForm';




function Detect() {
    const [Msg,setMsg]=useState({"msg":"","name":""});
    
    useEffect(()=>{
        
            },[]);
    
    const handleSubmit= (e)=>{
        
        e.preventDefault();
        fetch("/detect").then(
            res=>res.json()
            ).then(
                data=>{
                    console.log(data);
                    setMsg(data)
                }
            )
                 
                    
       
    }
    return (
        <div className='detectpage'>
            {/* <h4>{Msg.msg}--</h4>
        <button onClick={handleSubmit}>try</button> */}
            <DetectForm/>
        </div>
    )
}

export default Detect
