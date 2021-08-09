import React, {Component} from 'react';
import { ReactDOM } from 'react-dom';

const portalRoot = document.getElementById('portal')

export default class Portal extends Component{
    constructor(){
        super();
        this.el=document.createElement('div');
    }

    componentDidMount=()=>{
        portalRoot.appendChild(this.el)
    }

    componentWillUnmount=()=>{
        portalRoot.removeChild(this.el)
    }
    
    render() {
        
        return(<nav className="navb">
        <button className="buttonCreate" type="button">Create Hero</button>
        </nav>
        );

    }
    
}

export default Portal;