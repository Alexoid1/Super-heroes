import React,{useState} from 'react';

import { projectStorage } from "../firebase/config";
import ProgressBar2 from '../components/ProgressBar2';
import './ModalForm.css'


const ModalForm = ()=>{
    const[file,setFile] = useState(null);
    const[error, setError] = useState(null);
    const [progress, setProgress] = useState(0);


    const imgTypes = ['image/png','image/jpeg'];
    console.log(file)
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

    const handleUpload = () => {
        const storageRef = projectStorage.ref(`images/${file.name}`);
        storageRef.put(file).on('state_changed', (snap)=>{
            let percentage = (snap.bytesTransferred/snap.totalBytes)*100;
            console.log(percentage)
            setProgress(percentage);
            
          
        },(err)=>{
            setError(err)
            console.log(error)
        },()=>{
            projectStorage.ref("images").child(file.name).getDownloadURL().then(url=>{
                console.log(url)
            })

            
          
        })
    }
 
        return (
            <div>
                <form>
                    
                    <div>
                        <input type="file" onChange={changeFileHandler}/>
                    </div>
                    <div>
                        <button type="button" onClick={handleUpload}>Create hero</button>
                    </div>
                    {error&&<div className="error">{error}</div>}
                    {file&& <ProgressBar2 progress={progress}/>}
                    
                    
                </form>
            </div>
        )
          
}

export default ModalForm


