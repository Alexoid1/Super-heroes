import React,{useState,useEffect} from 'react';
import { projectStorage, projectFirestore, timestamp } from "../firebase/config";
import ProgressBar2 from '../components/ProgressBar2';
import './ModalForm.css'


const ModalForm = ()=>{
    const[file,setFile] = useState(null);
    const[error, setError] = useState(null);
    const [progress, setProgress] = useState(0);
    const [url, setUrl] = useState(null);
    const [uploading, setUploading]=useState(false);
    const [heroname,setHeroname] = useState(null);
    const [occupation,setOccupation] = useState(null);
    const [alias, setAlias] = useState(null);
    const [place, setPlace] = useState(null);
    const [heightt, setHeight] = useState(null);
    const [weightt, setWeight] = useState(null);
    const [gender, setGender] = useState(null);
    const [race, setRace] = useState(null);
    const [aligment, setAligment] = useState('Good');
    const [strength, setStrength] = useState(null);
    const [intelligence, setIntelligence] = useState(null);
    const [speed, setSpeed] = useState(null);
    const [power, setPower] = useState(null);



    const imgTypes = ['image/png','image/jpeg'];
    useEffect(()=>{
        setFile(null)
        setUploading(false)
        setSpeed('');
        setStrength('');
        setWeight('');
        setHeight('');
        setGender('');
        setRace('');
        setSpeed('');
        setIntelligence('');
        setHeroname('');
        setAlias('');
        setPlace('');
        setPower('');
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

    const handleHeroNameChange = (e) => {
        setHeroname(e.target.value);
    }

    const handleAliasChange = (e) => {
        setAlias(e.target.value);
    }

    const handlePlaceChange = (e) => {
        setPlace(e.target.value);
    }

    const handleOccupationChange = (e) => {
        setOccupation(e.target.value);
    }

    const handleHeightChange = (e) => {
        setHeight(e.target.value);
    }

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    }

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    }

    const handleAligmentChange = (e) => {
        setAligment(e.target.value);
    }

    const handleRaceChange = (e) => {
        setRace(e.target.value);
    }

    const handleStrengthChange = (e) => {
        setStrength(e.target.value);
    }

    const handleIntelligenceChange = (e) => {
        setIntelligence(e.target.value);
    }

    const handleSpeedChange = (e) => {
        setSpeed(e.target.value);
    }

    const handlePowerChange = (e) => {
        setPower(e.target.value);
    }

    const handleUpload = (e) => {
        e.preventDefault()
        if(heroname&&alias&&place&&file){
            setUploading(true)

            if(!heightt){
                setHeight('0cm');
            }
            
            if(!weightt){
                setWeight('0kg');
            }

            if(!strength){
                setStrength('0');
            }

            if(!power){
                setPower('0');
            }

            if(!speed){
                setSpeed('0');
            }

            if(!intelligence){
                setIntelligence('0');
            }

            if(!gender){
                setGender('Unknow');
            }

            if(!race){
                setRace('Unknow');
            }

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
                    name:heroname,
                    slug:heroname,
                    powerstats:{
                        intelligence,
                        strength,
                        speed,
                        durability:strength,
                        power,
                        combat:power
                    },
                    appearance:{
                        gender,
                        race,
                        height:[heightt],
                        weight:[weightt]
                    },
                    biography: {
                        fullName: heroname,
                        alterEgos: "No alter egos found.",
                        aliases: [alias],
                        placeOfBirth: place,
                        firstAppearance: createdAt,
                        publisher:"No published",
                        aligment,
                    },
                    work: {
                        occupation:"-",
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
                <form>
                    <div>
                        <label htmlFor="heroname" className="labelHero" >Hero Name:</label>
                        <input type="text" 
                        id="heroname"
                        name="heroname"
                        className="inputHero" 
                        placeholder="Write Hero Name" 
                        value={heroname}
                        onChange={handleHeroNameChange}
                        required="required"/>
                    </div>
                    <div>
                        <label htmlFor="heroalias" className="labelHero" >Hero Alias:</label>
                        <input type="text" 
                        id="heroalias"
                        name="heroalias"
                        className="inputHero" 
                        placeholder="Write Hero Alias"
                        value={alias}
                        onChange={handleAliasChange}
                        required="required"/>
                    </div>
                    <div>
                        <label htmlFor="heroplace" className="labelHero">Place of Birth:</label>
                        <input type="text" 
                        id="heroplace"
                        name="heroplace"
                        className="inputHero" 
                        placeholder="City or Country"
                        value={place}
                        onChange={handlePlaceChange}
                        required="required"/>
                    </div>
                    <div>
                        <label htmlFor="heroheight" className="labelHero">Height:</label>
                        <input type="text" 
                        id="heroheight"
                        name="heroheight" 
                        className="inputHero"  
                        value={heightt}
                        onChange={handleHeightChange}
                        required/>
                    </div>
                    <div>
                        <label htmlFor="heroWeight" className="labelHero">Weight:</label>
                        <input type="text" 
                        id="heroWeight"
                        name="heroWeight"
                        className="inputHero"  
                        value={weightt}
                        onChange={handleWeightChange}
                        required/>
                    </div>
                    <div>
                        <label htmlFor="heroGender" className="labelHero">Gender:</label>
                        <input type="text" 
                        id="heroGender"
                        name="heroGender"
                        className="inputHero"     
                        value={gender}
                        onChange={handleGenderChange}/>
                    </div>
                    <div>
                        <label htmFor="heroRace" className="labelHero">Race:</label>
                        <input type="text" 
                        id="heroRace"
                        name="heroRace"
                        className="inputHero"     
                        value={race}
                        onChange={handleRaceChange}/>
                    </div>
                    <div>
                        <label htmlFor="herostrength" className="labelHero">Strength:</label>
                        <input type="number" 
                        id="herostrength"
                        name="herostrength"
                        className="inputHero" 
                        min="0" 
                        maxlength="5" 
                        value={strength}
                        onChange={handleStrengthChange}/>
                    </div>
                    <div>
                        <label htmlFor="heroint" className="labelHero">Intelligence:</label>
                        <input type="number" 
                        id="heroint"
                        name="heroint"
                        className="inputHero" 
                        min="0" 
                        maxLength="5"
                        value={intelligence}
                        onChange={handleIntelligenceChange}/>
                    </div>
                    <div>
                        <label htmlFor="herospeed" className="labelHero">Speed:</label>
                        <input type="number" 
                        id="herospeed"
                        name="herospeed" 
                        className="inputHero" 
                        min="0" 
                        maxLength="5"
                        value={speed}
                        onChange={handleSpeedChange}/>
                    </div> 
                    <div>
                        <label htmlFor="heropower" className="labelHero">Power:</label>
                        <input type="number" 
                        id="heropower"
                        name="heropower"
                        className="inputHero" 
                        min="0" 
                        maxLength="5"
                        value={power}
                        onChange={handlePowerChange}/>
                    </div>
                    <div>
                        <input type="file" onChange={changeFileHandler} required/>
                    </div>
                    <div>
                        <button type="submit" onClick={handleUpload}>Create hero</button>
                    </div>
                    {error&&<div className="error">{error}</div>}
                    {file&& <div>{file.name}</div>}
                    {uploading&& <ProgressBar2 progress={progress}/>}                   
                </form>
            </div>
        )
          
}

export default ModalForm


