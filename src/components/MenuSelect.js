import React from 'react';
import './MenuSelect.css'

function MenuSelect({handleNext, handleLast}) {
    return (
      <div className="butonCont">
        <button onClick={handleLast}><i class="fa fa-arrow-left fa-2x" aria-hidden="true"></i></button>
        <button onClick={handleNext}><i class="fa fa-arrow-right fa-2x" aria-hidden="true"></i></button>
      </div>
  
    );
}
  
export default MenuSelect;