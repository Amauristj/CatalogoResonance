import React, { Component } from "react"
import "./navbarstyle.css"
import { UserAuth } from "../Login/AuthProvider"

export class NavBar extends Component {

  render(){
    return(
      <nav className="navbar navbar-expand-lg bg-light">
        
          <div className="collapse navbar-collapse" id="navbarNav">
            <h4><a className="nav-link active" aria-current="page" style={{ marginLeft: "10px"}} href={"/"}>Inicio</a></h4>
          </div>
       
        <ul className="nav justify-content-end">
          {localStorage.getItem("get-user")
          ? 
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href={"/#"} role="button" data-bs-toggle="dropdown" aria-expanded="false">{UserAuth().firstName}</a>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li><a className="dropdown-item" href={"/Logout"}>Logout</a></li>
            </ul>
          </li>
        :
          <li className="nav-item">
            <a className="nav-link active" aria-current="page"  href={"/Login"}>Login</a>
          </li>}
        </ul>
      </nav>
    )
  }
}
export default NavBar
