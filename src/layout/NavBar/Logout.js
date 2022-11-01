
import React, {Component} from 'react';
import { Navigate } from 'react-router-dom';

export class Logout extends Component {

    constructor(){
        super()
        localStorage.removeItem("get-user")
    }
    
    render() {
        return ( 
            <div>
                {localStorage.removeItem("get-user")
        ? <Navigate to="/" replace={true} />
        : <Navigate to="/" replace={true}/>}
            </div>
        )
    }
                
 }             
               

    
    
  
  export default Logout