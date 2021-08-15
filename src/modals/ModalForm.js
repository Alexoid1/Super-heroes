import React,{useState,useEffect} from 'react';
import { projectStorage, projectFirestore, timestamp } from "../firebase/config";
import ProgressBar2 from '../components/ProgressBar2';
import './ModalForm.css'



const ModalForm = ()=>{
    const [values, setValues] = useState({
        heroname: '',
        alias: '',
        place: '',
        occupation: '',
        eyeColor: '',
        hairColor: '',
        heightt: '',
        weightt: '',
        gender: '',
        race: '',
        strength: '',
        intelligence: '',
        aligment: 'good',
        speed: '',
        power: ''
    });
    const[file,setFile] = useState(null);
    const[error, setError] = useState(null);
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState(null);
    const [uploading, setUploading]=useState(false);

    const imgTypes = ['image/png','image/jpeg'];
    useEffect(()=>{
        setFile(null)
        setUploading(false)
        setValues({
            heroname: '',
            alias: '',
            place: '',
            occupation: '',
            eyeColor: '',
            hairColor: '',
            heightt: '',
            weightt: '',
            gender: '',
            race: '',
            strength: '',
            intelligence: '',
            aligment: 'good',
            speed: '',
            power: ''
        })
    },[url])


    const changeFileHandler=(e)=>{
        let selected = e.target.files[0];
     
        if(selected && imgTypes.includes(selected.type)){
            setFile(selected)
            setError('')
        }else{
            setFile(null);
            setError('Please select an image file (png or jpeg)')
        }
    }

    

    const handleChange = e => {
        const { name, value } = e.target;
        if(value.length<25){
            setValues({
                ...values,
                [name]: value
            });
        }
        
    };

    const handleUpload = (e) => {
        e.preventDefault()
        if(file){
            setUploading(true)


            const collectionRef = projectFirestore.collection("images");
            const storageRef = projectStorage.ref(`images/${file.name}`);
            storageRef.put(file).on('state_changed', (snap)=>{
            let percentage = (snap.bytesTransferred/snap.totalBytes)*100;
            setProgress(percentage);
            
        },(err)=>{
            setError(err);
            console.log(error);
        },()=>{
            projectStorage.ref("images").child(file.name).getDownloadURL().then(url=>{
                const createdAt = timestamp();
                collectionRef.add({
                    name:values.heroname,
                    slug:values.heroname,
                    powerstats:{
                        intelligence:values.intelligence,
                        strength:values.strength,
                        speed:values.speed,
                        durability:values.strength,
                        power:values.power,
                        combat:values.power
                    },
                    appearance:{
                        gender:values.gender,
                        race:values.race,
                        height:[values.heightt],
                        weight:[values.weightt],
                        eyeColor: values.eyeColor,
                        hairColor: values.hairColor
                    },
                    biography: {
                        fullName: values.heroname,
                        alterEgos: "No alter egos found.",
                        aliases: [values.alias],
                        placeOfBirth: values.place,
                        firstAppearance: createdAt,
                        publisher:"No published",
                        aligment:values.aligment,
                    },
                    work: {
                        occupation:values.occupation,
                        base:"-",
                    },
                    connections:{
                        groupAffiliation: "-",
                        relatives: "-",
                    },
                    images: {
                        xs: url,
                        sm: url,
                        md: url,
                        lg: url
                    },
                    createdAt

                   })
               
                    setUrl(url);           

            })     
        })
        }else{
            return null
        }
        
    }
        return (
            <div>
                <form onSubmit={handleUpload}>
                    <div>
                        <label htmlFor="heroname" className="labelHero" >Hero Name:</label>
                        <input type="text" 
                        id="heroname"
                        name="heroname"
                        className="inputHero"
                        value={values.heroname}
                        onChange={handleChange}
                        required="required"/>
                    </div>
                    <div>
                        <label htmlFor="heroalias" className="labelHero" >Hero Alias:</label>
                        <input type="text" 
                        id="heroalias"
                        name="alias"
                        className="inputHero"
                        value={values.alias}
                        onChange={handleChange}
                        required="required"/>
                    </div>
                    <div>
                        <label htmlFor="heroOccupation" className="labelHero" >Occupation:</label>
                        <input type="text" 
                        id="heroOccupation"
                        name="occupation"
                        className="inputHero"
                        value={values.occupation}
                        onChange={handleChange}
                        required="required"
                        />
                    </div>
                    <div>
                        <label htmlFor="heroplace" className="labelHero">Place of Birth:</label>
                        <input type="text" 
                        id="heroplace"
                        name="place"
                        className="inputHero"
                        value={values.place}
                        onChange={handleChange}
                        required="required"/>
                    </div>
                    <div>
                        <label htmlFor="heroeye" className="labelHero">Eye Color:</label>
                        <input type="text" 
                        id="heroeye"
                        name="eyeColor"
                        className="inputHero"
                        value={values.eyeColor}
                        onChange={handleChange}
                        required="required"/>
                    </div>
                    <div>
                        <label htmlFor="herohair" className="labelHero">Hair Color:</label>
                        <input type="text" 
                        id="herohair"
                        name="hairColor"
                        className="inputHero"
                        value={values.hairColor}
                        onChange={handleChange}
                        required="required"/>
                    </div>
                    <div>
                        <label htmlFor="heroGender" className="labelHero">Gender:</label>
                        <input type="text" 
                        id="heroGender"
                        name="gender"
                        className="inputHero"     
                        value={values.gender}
                        onChange={handleChange}
                        required="required"/>
                    </div>
                    <div>
                        <label htmFor="heroRace" className="labelHero">Race:</label>
                        <input type="text" 
                        id="heroRace"
                        name="race"
                        className="inputHero"     
                        value={values.race}
                        onChange={handleChange}
                        required="required"/>
                    </div>
                    <div>
                    <label htmlFor="heroaligment" className="labelHero">Aligment:</label>
                        <select className="inputHero select" name="aligment" onChange={handleChange} value={values.aligment}>

                            <option key value="good">good</option>
                            <option value="bad">bad</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="heroheight" className="labelHero">Height:</label>
                        <input type="text" 
                        id="heroheight"
                        name="heightt" 
                        className="inputHero"  
                        value={values.heightt}
                        onChange={handleChange}
                        required="required"
                        />
                    </div>
                    <div>
                        <label htmlFor="heroWeight" className="labelHero">Weight:</label>
                        <input type="text" 
                        id="heroWeight"
                        name="weightt"
                        className="inputHero"  
                        value={values.weightt}
                        onChange={handleChange}
                        required="required"
                        />
                    </div>           
                    <div className="rangeCont">
                        <label htmlFor="herostrength" className="labelHero rangeCont">Strength:</label>
                        <div>
                            <span>0</span>
                            <input type="range" 
                            id="herostrength"
                            name="strength"
                            className="inputHero range" 
                            min="0"
                            max="1000"
                            step="1"
                            value={values.strength}
                            onChange={handleChange}
                            required="required"/>
                            <span>1000</span>
                        </div>
                    </div>
                    <div className="rangeCont">
                        <label htmlFor="heroint" className="labelHero">Intelligence:</label>
                        <div>
                            <span>0</span>
                            <input type="range" 
                            id="heroint"
                            name="intelligence"
                            className="inputHero range" 
                            min="0"
                            max="1000"
                            step="1"
                            value={values.intelligence}
                            onChange={handleChange}
                            required="required"/>
                            <span>1000</span>
                        </div>
                    </div>
                    <div className="rangeCont">
                        <label htmlFor="herospeed" className="labelHero">Speed:</label>
                        <div>
                            <span>0</span>
                            <input type="range" 
                            id="herospeed"
                            name="speed" 
                            className="inputHero range" 
                            min="0"
                            max="1000"
                            step="1"
                            value={values.speed}
                            onChange={handleChange}
                            required="required"/>
                            <span>1000</span>
                        </div>
                    </div> 
                    <div className="rangeCont">
                        <label htmlFor="heropower" className="labelHero">Power:</label>
                        <div>
                            <span>0</span>
                                <input type="range"
                                id="heropower"
                                name="power"
                                className="inputHero range" 
                                min="0"
                                max="1000"
                                step="1"
                                value={values.power}
                                onChange={handleChange}
                                required="required"/>
                            <span>1000</span>
                        </div>
                    </div>
                    <div>
                        <input  className="selectFIle" type="file" onChange={changeFileHandler} required="required"/>
                    </div>
                    <div className="buttonCont">
                        <button  className="create" type="submit">Create hero</button>
                    </div>
                    {error&&<div className="error">{error}</div>}
                    
                    {uploading&& <ProgressBar2 progress={progress}/>}                   
                </form>
            </div>
        )
          
}

export default ModalForm


