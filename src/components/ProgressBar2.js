import React from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.css';

function ProgressBar2({ progress }) {

    
  return (
    <div className="container">
      <div className="progressbar-container">
        <div className="progressbar-complete" style={{ width: `${progress}%` }}>
          <div className="progressbar-liquid" />
        </div>
        <span className="progress">
          {progress}
          %
        </span>
      </div>
    </div>

  );
}

ProgressBar2.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar2;