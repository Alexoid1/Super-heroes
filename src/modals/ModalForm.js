import React,{Component} from 'react';
import './ModalForm.css'


export default class ModalForm extends Component{
    render(){
        return (
            <div>
                <form>
                    <label for="heroname">Full Name:</label>
                    <input type="name" id="heroname" className="inputHero" placeholder="Write Hero Name"></input>
                </form>
            </div>
        )
    }      
}


