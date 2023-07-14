import React, { useEffect, useState } from 'react'
import "./Dashboards.css"
import { Link } from 'react-router-dom';
import { useResult } from '../hooks/useResult';

function Dashboard() {
    // const [Patients,setPatients]=useState([]);
    const {patient,patientlist,Record,successmsg,errormsg,dispatch}=useResult();
    console.log("patient",patient)
    console.log("patientlist",patientlist)
    const [Searchname,setSearchname]=useState(null);
    const onHandleSubmitDelete= async(name)=>{
        dispatch({type:"LOADING",payload:true})
        // let formData= new FormData();    
        // formData.append("name",name);
        const response=await fetch("/patient/"+name)
        const json=await response.json();
        if(!response.ok){
            dispatch({type:"NOTLOADING"})
            dispatch({type:'ERRORMSG',payload:"error occured in delteing patient Record"})
            console.log("error occured in delteing patient Record")

        }
        if(response.ok){
            dispatch({type:"NOTLOADING"})
            dispatch({type:'PATIENTS',payload:json});
            dispatch({type:'SUCCESSMSG',payload:"Deleted patient Record successully"})
            console.log("delted patient Record successully")
        }


    }

    const SearchHandleSubmit= async(e)=>{
        e.preventDefault()
        if(Searchname==""){
            return
        }
        const response=await fetch("/patient/search/"+Searchname)
        const json=await response.json();
        if(!response.ok){
            dispatch({type:'ERRORMSG',payload:"error occured in searching patient Record"})
            console.log("error occured in searching patient Record")

        }
        if(response.ok){

            dispatch({type:'PATIENTS',payload:json});
            console.log("search patient Record successully")
            dispatch({type:'SUCCESSMSG',payload:"search patient Record successully"})
        }
    }
    useEffect(()=>{
        const fetchPatients=async ()=>{
            dispatch({type:"LOADING",payload:true})
            const response=await fetch("/dashboard")
            const json=await response.json();
            if(!response.ok){
                dispatch({type:"NOTLOADING"})
                console.log("error accured when fetchin dashboard content");
                dispatch({type:'NOPATIENTS'});
                dispatch({type:'ERRORMSG',payload:"error accured when fetchin dashboard content"})
            }
            if(response.ok){
                dispatch({type:"NOTLOADING"})
                console.log(json);
                dispatch({type:'PATIENTS',payload:json});
                // setPatients(json);

                console.log("all Patients",patientlist)
            }
        }
        fetchPatients();
    },[dispatch])
    return (
    <div className='db'>
      <div className='db-top'>
        <div className='chart'>
            <h4>chart</h4>
                {Record &&
                    Record.map((Each,index)=>{
                        return(
                            <div className='chart-each' key={index}>
                                <p style={{fontSize:'13px'}}>{Each.name}:</p>
                                <div className='p-each'>
                                <div className='chart-eh-vis'><p style={{width:`${Each.percentage}%`}}></p></div>
                                <p className='per'>{Each.percentage}%</p>
                                </div>
                                
                            </div>
                        )
                    })
                }
           

        </div>
        <div className='totalrecord'>
            <h4>Total Records</h4>
            <div className='Record'>
                {Record &&
                    Record.map((Each,index)=>{
                        return(
                            <div key={index}>
                                <label>{Each.name}:</label>
                                <p>{Each.num}</p>
                            </div>
                        )
                    })
                }
                
                

            </div>
        </div>
      </div>
      <div className='db-bottom'>
        <form className='db-search' onSubmit={SearchHandleSubmit}>
            <input type="search" name="search" onChange={(e)=>setSearchname(e.target.value)} />
            <button id='search' >Search</button>
        </form>
        <div className='db-header'>
                <p>name</p>
                <p>age</p>
                <p>mobile</p>
                <p>status</p>
                <p>Result</p>
                <p>action</p>
        </div>
        <div className='db-body'>
            

            {patientlist && patientlist.map((patienteach,index)=>{
                return(
                    <div className='db-pt-each' key={index}>
                        <p>{patienteach.name}</p>
                        <p>{patienteach.age}</p>
                        <p>{patienteach.mobile}</p>
                        <p>{patienteach.check}</p>
                        <p>{patienteach.status}</p>
                        <div className='db-pt-each-action'>
                            
                            <Link to="/Result">
                                <button id="db-btn" onClick={()=>{dispatch({type:'RESULT',payload:patienteach});}}>view</button>
                            </Link>
                            
                            <button id="db-btn" onClick={()=>{
                                onHandleSubmitDelete(patienteach.name)}}>delete</button>

                            
                        </div>
                    </div>
                )
            })}
            
            
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
