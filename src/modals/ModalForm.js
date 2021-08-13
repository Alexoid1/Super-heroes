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
        setValues({
          ...values,
          [name]: value
        });
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
                        weight:[values.weightt]
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
                        placeholder="Write Hero Name" 
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
                        placeholder="Write Hero Alias"
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
                        <label htmlFor="heroheight" className="labelHero">Height:</label>
                        <input type="text" 
                        id="heroheight"
                        name="heightt" 
                        className="inputHero"  
                        value={values.heightt}
                        onChange={handleChange}
                        required/>
                    </div>
                    <div>
                        <label htmlFor="heroWeight" className="labelHero">Weight:</label>
                        <input type="text" 
                        id="heroWeight"
                        name="weightt"
                        className="inputHero"  
                        value={values.weightt}
                        onChange={handleChange}
                        required/>
                    </div>
                    <div>
                        <label htmlFor="heroGender" className="labelHero">Gender:</label>
                        <input type="text" 
                        id="heroGender"
                        name="gender"
                        className="inputHero"     
                        value={values.gender}
                        onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmFor="heroRace" className="labelHero">Race:</label>
                        <input type="text" 
                        id="heroRace"
                        name="race"
                        className="inputHero"     
                        value={values.race}
                        onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="herostrength" className="labelHero">Strength:</label>
                        <input type="number" 
                        id="herostrength"
                        name="strength"
                        className="inputHero" 
                        min="0" 
                        maxLength="5" 
                        value={values.strength}
                        onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="heroint" className="labelHero">Intelligence:</label>
                        <input type="number" 
                        id="heroint"
                        name="intelligence"
                        className="inputHero" 
                        min="0" 
                        maxLength="5"
                        value={values.intelligence}
                        onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="herospeed" className="labelHero">Speed:</label>
                        <input type="number" 
                        id="herospeed"
                        name="speed" 
                        className="inputHero" 
                        min="0" 
                        maxLength="5"
                        value={values.speed}
                        onChange={handleChange}/>
                    </div> 
                    <div>
                        <label htmlFor="heropower" className="labelHero">Power:</label>
                        <input type="number" 
                        id="heropower"
                        name="power"
                        className="inputHero" 
                        min="0" 
                        maxLength="5"
                        value={values.power}
                        onChange={handleChange}/>
                    </div>
                    <div>
                        <input type="file" onChange={changeFileHandler} required/>
                    </div>
                    <div>
                        <button type="submit">Create hero</button>
                    </div>
                    {error&&<div className="error">{error}</div>}
                    
                    {uploading&& <ProgressBar2 progress={progress}/>}                   
                </form>
            </div>
        )
          
}

export default ModalForm


