import axios from 'axios'; 
import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { Navigate } from 'react-router-dom';

import './login.css'

export class LoginForm extends Component {

  
  state = {
    form:{
        email_account:"",
        password_account:"",  
    },
    success: null
  }
  handleChange=async e=>{
    e.persist();
    await this.setState({
        form:{
          ...this.state.form,
          [e.target.name]: e.target.value  
        }
    });
  }

  handleSubmit=async(e)=>{
    e.preventDefault();
   const response = await axios.post("https://api.baseql.com/airtable/graphql/appeU8STy5ZuQTfX2", 
    {query: `query
        ($email: String!) {
        users(email: $email) {
          username
          password
          lastName
          key
          id
          firstName
          email
        }
      }
  `,
  variables: {
    email: this.state.form.email_account,
  },
})
/* Arreglar cuando no trae nada */
    if (response.data.data.users[0] !== undefined) {
      const password = response.data.data.users[0].password 
        if (response.status === 200 && password === this.state.form.password_account) {
            localStorage.setItem("get-user", JSON.stringify(response.data.data.users[0]))
            this.setState({success: true})
        }else{
          this.setState({success: false})
        }
    }else{
      this.setState({success: false})
    } 
  }
    render() {
        const form=this.state
      return (   
            <div className="formBox">
              {this.state.success === true
              ? <Navigate to="/" replace={true} />
              : this.state.success === false 
              ? <div className="alert alert-danger" role="alert">El Correo o la Contraseña Son Incorrectos</div>
              : console.log("")
              }
                <div className="avatar">
                    <img className="avatar__image" src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt=''/>
                </div>
                <h2 className='LoginT'>Login</h2>

                    <div className="formBox2">

                        <form className="formLogin" onSubmit={this.handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                                
                                <input type="email" onChange={this.handleChange}
                                value={form.email_account} className="form-control" name='email_account' id="exampleFormControlInput1" placeholder="name@example.com"/>
                            </div>

                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                                <input type="password" className="form-control"  onChange={this.handleChange}
                                 value={form.password_account} name='password_account'  placeholder="Password"/>
                            </div>
                            
                            <button className="btn btn-success" >
                                Login
                            </button>
                        </form>
                            <Link to="/RegisterUser">Crear Nueva cuenta</Link>
                    </div>
            </div> 

      );
    }
  }
  export default LoginForm