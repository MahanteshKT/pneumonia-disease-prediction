import React, { createContext, useReducer } from 'react'

export const PneumoContext=createContext();

export const pneumoContextdispatch=(state,action)=>{
    switch(action.type){
        case 'RESULT':
            return Object.assign({},state,{patient:action.payload});
        case 'NOTRESULT':
            return {patient:null}
        case 'PATIENTS':
            return {patientlist:action.payload.patientslist,Record:action.payload.Record}
        case 'NOPARIENTS':
            return {patientlist:null}
        case 'SUCCESSMSG':
            return Object.assign({},state,{successmsg:action.payload});
        case 'ERRORMSG':
            return Object.assign({},state,{errormsg:action.payload});
        
        // case 'DELERRORMSG':
        //     return {errormsg:}
        
        // case 'DELSUCCESSMSG':
        //     return {successmsg:null}
        
        case 'LOADING':
            return Object.assign({},state,{loading:action.payload})

        case 'NOTLOADING':
            return Object.assign({},state,{loading:null})
                
        default:
            return state
    }
}

export const PneumoContextProvider=({children})=> {
    const [state,dispatch]=useReducer(pneumoContextdispatch,{patient:null,
            patientlist:null,
            Record:null,
            errormsg:null,
            successmsg:null,
            laoding:null
        }) 
    console.log("Context called:",state)
    return (
        <PneumoContext.Provider value={{...state,dispatch}}>
            {children}
        </PneumoContext.Provider>

  )
}

