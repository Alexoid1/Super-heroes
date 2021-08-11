import { useState,useEffect } from "react";
import { projectStorage } from "../firebase/config";

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    console.log('helooow')
    useEffect(()=>{
        const storageRef = projectStorage.ref(`images/${file.name}`);
        storageRef.put(file).on('state_changed', (snap)=>{
            let percentage = (snap.bytesTransferred/snap.totalBytes)*100;
            setProgress(percentage);
            console.log(progress)
        },(err)=>{
            setError(err)
            console.log(error)
        },async()=>{
            const url = await storageRef.getDownloadURL();
            setUrl(url);
        })
    },[file]);

    return {progress,url,error}
}

export default useStorage