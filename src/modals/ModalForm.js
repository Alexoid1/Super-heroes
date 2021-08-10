import React,{Component} from 'react';
import './ModalForm.css'


export default class ModalForm extends Component{
    render(){
        return (
            <div>
                <form>
                    <div>
                        <label for="heroname" className="labelHero">Hero Name:</label>
                        <input type="text" id="heroname" className="inputHero" placeholder="   Write Hero Name"></input>
                    </div>
                    <div>
                        <label for="heroalias" className="labelHero">Hero Alias:</label>
                        <input type="text" id="heroalias" className="inputHero" placeholder="   Write Hero Alias"></input>
                    </div>
                    <div>
                        <label for="heroplace" className="labelHero">Place of Birth:</label>
                        <input type="text" id="heroplace" className="inputHero" placeholder="   City or Country"></input>
                    </div>
                    <div>
                        <label for="heroage" className="labelHero">Age:</label>
                        <input type="number" id="heroage" className="inputHero"  min="0" maxlength="5" ></input>
                    </div>
                    <div>
                        <label for="herostrength" className="labelHero">Strength:</label>
                        <input type="number" id="herostrength" className="inputHero" min="0" maxlength="5" ></input>
                    </div>
                    <div>
                        <label for="heroint" className="labelHero">Intelligence:</label>
                        <input type="number" id="heroint" className="inputHero" min="0" maxLength="5"></input>
                    </div>
                    <div>
                        <label for="herodur" className="labelHero">durability</label>
                        <input type="number" id="herodur" className="inputHero" min="0" maxLength="5"></input>
                    </div>
                    <div>
                        <label for="herospeed" className="labelHero">Speed:</label>
                        <input type="number" id="herospeed" className="inputHero" min="0" maxLength="5"></input>
                    </div> 
                    <div>
                        <label for="heropower" className="labelHero">Power:</label>
                        <input type="number" id="heropower" className="inputHero" min="0" maxLength="5"></input>
                    </div> 
                    <div>
                        <label for="herocombat" className="labelHero">Combat:</label>
                        <input type="number" id="herocombat" className="inputHero" min="0" maxLength="5"></input>
                    </div>
                    <div>      
                        <button type="submit">Create</button>
                    </div> 
                </form>
            </div>
        )
    }      
}


