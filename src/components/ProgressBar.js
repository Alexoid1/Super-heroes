import React from 'react';
import './ProgressBar.css'

function ProgressBar({pts}) {
  
    return (
        <div className="container">
            <div className="progressbar-container">
            <div className="progressbar-complete" style={{width: `${pts}%`}}>
                <div className="progressbar-liquid"></div>
            </div>
            <span className="progress">{pts}pts</span>
            </div>
        </div>
      
  
    );
}
  
export default ProgressBar;