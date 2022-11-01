
import React, {Component} from 'react';
import axios from 'axios';
import './login.css'
import { Navigate } from 'react-router-dom';
export class FormRegisterUser extends Component {
  
  state = {
    form:{
      firstName:"",
      lastName:"",
      email:"",
      password:"",
      username:""
    },
    success: null
  }
    
  handleChange=async(e)=>{
   
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  }

  InsertUser=async ()=>{
   
      if(this.state.form.email !== "" && this.state.form.password !== "" && this.state.form.firstName !== "" && this.state.form.lastName !== "" && this.state.form.username !== ""){
        
        axios.post("https://api.baseql.com/airtable/graphql/appeU8STy5ZuQTfX2", 
        {query: `
        mutation($email: String, $password: String, $firstName: String, $lastName: String, $username: String){
        insert_users(
          firstName: $firstName,
          lastName: $lastName,
          email: $email,
          password: $password,
          username: $username
        ){
          firstName
          lastName
          email
          password
          username
        }
      }
      `,
      variables: {
        firstName: this.state.form.firstName,
        lastName: this.state.form.lastName,
        email: this.state.form.email,
        password:  this.state.form.password,
        username: this.state.form.username,
      },
    }) 
        this.setState({success: true})
      }else{
       this.setState({success: false})
      }      
  }
    render() {
        const form=this.state;
      return (
        
            <div className="formBox">

                {this.state.success === true
                ? <Navigate to="/Login" replace={true} />
                : this.state.success === false
                ? <div className="alert alert-danger" role="alert">
                   <span>Debe Completar Todos los Campos Correctamente.</span>
                  </div>
                : console.log("")
              }
                <div className="avatar">
                    <img className="avatar__image" src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" alt="description"/>
                </div>
                <h2 className='LoginT'>Login</h2>

                    <div className="formBox2">

                        <form className="formLogin" onSubmit={e=>{e.preventDefault()}}>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput12" className="form-label">Email address</label>
                                <input type="email" onChange={this.handleChange} 
                                value={form.email} className="form-control" name='email' id="validationTooltip01" placeholder="name@example.com"/>
                            </div>

                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput2" className="form-label">Password</label>
                                <input type="password" className="form-control"  onChange={this.handleChange} 
                                 value={form.password} name='password'  placeholder="Password"/>
                            </div>
                            <div className="row">
                              <div className='col'>
                                <label htmlFor="exampleFormControlInput3" className="form-label">Name</label>
                                <input type="firstName" onChange={this.handleChange} 
                                value={form.firstName} className="form-control" name='firstName' id="exampleFormControlInput1" placeholder="Name"/>
                              </div>
                              
                              <div className='col'>
                                <label htmlFor="exampleFormControlInput4" className="form-label">Surname</label>
                                <input type="lastName" className="form-control"  onChange={this.handleChange} 
                                value={form.lastName} name='lastName'  placeholder="Surname"/>
                              </div>
                            </div>
                            <div className='mb-3'>
                                <label htmlFor="exampleFormControlInput5" className="form-label">User Name</label>
                                <input type="username" onChange={this.handleChange} 
                                value={form.username} className="form-control" name='username' id="exampleFormControlInput1" placeholder="User Name"/>
                            </div>
   
                            <button className="btn btn-success" onClick={()=>this.InsertUser()} >
                                Register
                            </button>
                        </form>
                          <a href={"/Login"}> Iniciar Seccion </a>
                    </div>
            </div> 
      );
    }
  }
  export default FormRegisterUser