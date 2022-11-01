import React, {Component} from "react";
import {BrowserRouter as Router,Navigate,Route,Routes} from "react-router-dom";


import FormRegisterUser from './layout/Login/FormRegisterUser'
import LoginForm from './layout/Login/LoginForm'
import Product from "./layout/Product/Product";
import Logout from "./layout/NavBar/Logout";


export class RouterWeb extends Component {
        
      render() {
        return (  
         <Router>
            <Routes>
             
                  <Route path="/RegisterUser" element={localStorage.getItem("get-user") ? ( <Navigate replace to={"/"} />) : (<FormRegisterUser></FormRegisterUser>)} />
                  <Route path="/" element={<Product/>}/>
                  <Route path="/Login" element={localStorage.getItem("get-user") ? ( <Navigate replace to={"/"} />) : (<LoginForm></LoginForm>)} />
                  <Route path="/Logout" element={<Logout></Logout>} /> 
                
            </Routes>
         </Router>
        );
      }
    }
    export default RouterWeb