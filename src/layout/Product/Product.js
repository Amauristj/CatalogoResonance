import React, {Component}from "react";
import './styleProduct.css'
import './preciostyle.css'
import axios from "axios";
import emailjs from 'emailjs-com'
import { UserAuth } from "../Login/AuthProvider";


 
const get_product =`
query{
    furniture{
      id
      name
      type
      unitCost
      images
      sizeWxLxH
    }
  }
    `
    
export class Product extends Component {
    state={
        data:[],
        IdProduct:"",
        success: true
    } 

    
    RequestGet=()=>{
        axios.post("https://api.baseql.com/airtable/graphql/appeU8STy5ZuQTfX2", 
        {query:get_product
        }).then(response=> this.setState({data:response.data.data.furniture}))
        this.setState({success: false})
    }

    componentDidMount(){
        this.RequestGet();
    }

    handleClick = async(id) =>{
      
      if (localStorage.getItem("get-user")) {
        
        const response = await axios.post("https://api.baseql.com/airtable/graphql/appeU8STy5ZuQTfX2", 
         {query: `query
             ($id: String!) {
                furniture(id:$id) {
                    id
                    name
                    description
                    color
                    sizeWxLxH
                    type
                    unitCost
                    totalUnitsSold
                  }
           }
       `,
       variables: {
         id: id,
       },
        })  

        const ProductUnic = response.data.data.furniture[0]
        let userAuth = JSON.parse(localStorage.getItem("get-user"))
         console.log(userAuth.email)

         var templateParams = {
            to_name: 'xyz',
            from_name: 'abc',
            name: ProductUnic.name,
            color: ProductUnic.color,
            price:  ProductUnic.unitCost,
            type: ProductUnic.type,
            description: ProductUnic.description,
            reply_to: UserAuth().email
          };
        
        emailjs.send("service_f8xy7zr", "template_q2iwrvn", templateParams,"Jxx4P2mR8NAnEceks").then(function(response) {
            console.log('SUCCESS!', response.status);
            alert("Correo Enviado Revice Tu Correo")
         }, function(error) {
            console.log('FAILED...', error);
         });  
        } else {
          alert("Necesitas Iniciar Seccion para Solicitar Detalles")
        
        }
    }
    
      render() {
        return (
            <div className=" container1">
              
                <section className="sidebar__main">
                    {this.state.data.map(personaje=>{
                        return(
                    <div className="card card-size" key={personaje.id}> 
                            <div className="imagen-product">
                                 <img className="card-img-top" src={personaje.images[0].url} alt="" />
                            </div> 
                            <div className="price-tag">{personaje.unitCost}</div>   
                            <div className="card-body-perso">
                            <h5 className="card-title car_text">{personaje.name}</h5>
                            <div className="dails">
                                <ul style={{margin: "0px"}}>
                                    <li>{personaje.sizeWxLxH}</li>
                                    <li>{personaje.type}</li>
                                 </ul>
                            </div>  
                            </div>

                            <button type="button" style={{marginLeft: "5px"}} key={personaje.id} onClick={() => this.handleClick(personaje.id)} className="btn btn-success">Mas Informacion</button>
                    </div>
                        )     
                    })}     
                </section>
            </div>
        )
      }
    }
    export default Product