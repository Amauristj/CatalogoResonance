import './footerstyle.css'
import React ,{ Component } from "react"

export class Footer extends Component {
    render(){
        return(
            <footer className="bg-light text-center text-lg-start">
                <div className="text-center p-3 footer1" >
                    <p className="text-dark">@Resonance</p>
                </div>
            </footer>
        )
    }
}
export default Footer