import React from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.css';

function ProgressBar({ pts }) {
  return (
    <div className="container">
      <div className="progressbar-container">
        <div className="progressbar-complete" style={{ width: `${pts}%` }}>
          <div className="progressbar-liquid" />
        </div>
        <span className="progress">
          {pts}
          pts
        </span>
      </div>
    </div>

  );
}

ProgressBar.propTypes = {
  pts: PropTypes.number.isRequired,
};

export default ProgressBar;
