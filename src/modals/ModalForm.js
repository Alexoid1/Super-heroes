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
    const [heroname,setHeroname] = useState('');
    const [alias, setAlias] = useState('');
    const [place, setPlace] = useState(null);
    const [age, setAge] = useState(null);
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
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

    const handleAgeChange = (e) => {
        setAge(e.target.value);
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

    const handleUpload = () => {
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
                        height:[height],
                        weight:[weight],
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
                setUrl(url)
            })
     
        })
    }
        return (
            <div>
                <form>
                    <div>
                        <label for="heroname" className="labelHero" >Hero Name:</label>
                        <input type="text" 
                        id="heroname" 
                        className="inputHero" 
                        placeholder="Write Hero Name" 
                        value={heroname}
                        onChange={handleHeroNameChange}/>
                    </div>
                    <div>
                        <label for="heroalias" className="labelHero" >Hero Alias:</label>
                        <input type="text" 
                        id="heroalias" 
                        className="inputHero" 
                        placeholder="Write Hero Alias"
                        value={alias}
                        onChange={handleAliasChange}/>
                    </div>
                    <div>
                        <label for="heroplace" className="labelHero">Place of Birth:</label>
                        <input type="text" 
                        id="heroplace" 
                        className="inputHero" 
                        placeholder="City or Country"
                        value={place}
                        onChange={handlePlaceChange}/>
                    </div>
                    <div>
                        <label for="heroage" className="labelHero">Age:</label>
                        <input type="number" 
                        id="heroage" 
                        className="inputHero"  
                        min="0" 
                        maxlength="5"
                        value={age}
                        onChange={handleAgeChange}/>
                    </div>
                    <div>
                        <label for="heroheight" className="labelHero">Height:</label>
                        <input type="number" 
                        id="heroheight" 
                        className="inputHero"  
                        min="0" 
                        maxlength="5"
                        value={height+'cm'}
                        onChange={handleHeightChange}/>
                    </div>
                    <div>
                        <label for="heroWeight" className="labelHero">Weight:</label>
                        <input type="number" 
                        id="heroWeight" 
                        className="inputHero"  
                        min="0" 
                        maxlength="5"
                        value={weight+'kg'}
                        onChange={handleWeightChange}/>
                    </div>
                    <div>
                        <label for="heroGender" className="labelHero">Gender:</label>
                        <input type="text" 
                        id="heroGender" 
                        className="inputHero"     
                        value={gender}
                        onChange={handleGenderChange}/>
                    </div>
                    <div>
                        <label for="heroRace" className="labelHero">Race:</label>
                        <input type="text" 
                        id="heroRace"
                        className="inputHero"     
                        value={race}
                        onChange={handleRaceChange}/>
                    </div>
                    <div>
                        <label for="herostrength" className="labelHero">Strength:</label>
                        <input type="number" 
                        id="herostrength"
                        className="inputHero" 
                        min="0" 
                        maxlength="5" 
                        value={strength}
                        onChange={handleStrengthChange}/>
                    </div>
                    <div>
                        <label for="heroint" className="labelHero">Intelligence:</label>
                        <input type="number" 
                        id="heroint" 
                        className="inputHero" 
                        min="0" 
                        maxLength="5"
                        value={intelligence}
                        onChange={handleIntelligenceChange}/>
                    </div>
                    <div>
                        <label for="herospeed" className="labelHero">Speed:</label>
                        <input type="number" 
                        id="herospeed" 
                        className="inputHero" 
                        min="0" 
                        maxLength="5"
                        value={speed}
                        onChange={handleSpeedChange}/>
                    </div> 
                    <div>
                        <label for="heropower" className="labelHero">Power:</label>
                        <input type="number" 
                        id="heropower" 
                        className="inputHero" 
                        min="0" 
                        maxLength="5"
                        value={power}
                        onChange={handlePowerChange}/>
                    </div>
                    <div>
                        <input type="file" onChange={changeFileHandler}/>
                    </div>
                    <div>
                        <button type="button" onClick={handleUpload}>Create hero</button>
                    </div>
                    {error&&<div className="error">{error}</div>}
                    {file&& <div>{file.name}</div>}
                    {uploading&& <ProgressBar2 progress={progress}/>}                   
                </form>
            </div>
        )
          
}

export default ModalForm


