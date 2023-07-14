import React, { useEffect } from 'react'
import Detect from './Detect'
import NavBar from './Navbar/NavBar'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import Home from './Home';
import PatientResult from './PatientResult';
import {useResult} from '../hooks/useResult';
import Dashboard from './Dashboard';

function Main() {
  const {patient,errormsg,successmsg,dispatch,loading}=useResult();
  console.log(patient)
  console.log("errormsg",errormsg)
  console.log("successmsg",successmsg)
  const CloseOnSubmit=()=>{
    
    dispatch({type:"ERRORMSG",payload:null})
    dispatch({type:"SUCCESSMSG",payload:null});
    // document.querySelector(".ResultMsg").style.display="none";
    console.log("close")
  }

  
  if(errormsg || successmsg){
    var a=setTimeout(function msgclose(){
      if(errormsg){
        dispatch({type:"ERRORMSG",payload:null})
        console.log("close")
      }if(successmsg){
        dispatch({type:"SUCCESSMSG",payload:null});
        console.log("success close")
      }
      clearTimeout(a);
    },4000);
  }

  useEffect(()=>{
    
  },[])

  
  return (
    <div className='Main'>

        <BrowserRouter>
          {loading && <div className='loading'>
              <div className='load-single'></div>
              <div className='before'></div>
              <div className='load-single'></div>
              <div className='before'></div>
              <div className='load-single'></div>
              {/* <div className='before'></div> */}
              <div className="load-text"><div>Loading</div> <p>.</p><p>.</p><p>.</p></div> 
          </div>
          }
          
          <div className='header'>
            <div className='logo'><span>DT-CNN</span></div>
            <div className='navbarr'><NavBar/></div>
            
          </div>

          <div className="ResultMsg" >
                {
                  errormsg &&  <div className="alert error">
                      {errormsg}
                      <div className="close" id="close" style={{display:'flex'}} onClick={()=>CloseOnSubmit()} ><span>x</span></div>
                        
                  </div>
                }
                {
                  successmsg && <div className="alert success">
                  {successmsg}
                  <div className="close" id="close" onClick={()=>CloseOnSubmit()} ><span>x</span></div>
                        
              </div>
                }

              
          </div>
          <Routes>
            <Route path="/" element={<Home/>} />
          </Routes>
          <Routes>
            <Route path="/detect" element={!patient?<Detect/>:<Navigate to="/Result" />} />
          </Routes>
          <Routes>
            <Route path="/Result" element={<PatientResult/>} />
          </Routes>

          <Routes>
            <Route path="/dashboard" element={<Dashboard/>} />
          </Routes>

          

        </BrowserRouter>


    </div>
  )
}

export default Main
