import { useContext } from 'react'
import { PneumoContext } from '../Context/PneumoContext'

export const useResult =()=>{
    const context=useContext(PneumoContext);
    if(!context){
        throw Error("bad things no json"); 
    }

    console.log(context)
    
    console.log("errormsg",context.errormsg)
    console.log("successmsg",context.successmsg)
    return context;
}


