import React from 'react';
import PropTypes from 'prop-types';
import {
  FaArrowLeft, FaArrowRight
} from 'react-icons/fa';
import './MenuSelect.css';

function MenuSelectMobile({
    handleOneLast, handleOneNext,
}) {
  /* eslint-disable jsx-a11y/control-has-associated-label */
  return (
    <div className="butonCont">
      <button type="button" onClick={handleOneLast} className="floatleft"><FaArrowLeft className="iconSize" /></button>
      <button type="button" onClick={handleOneNext} className="floatright"><FaArrowRight className="iconSize" /></button> 
    </div>

  );
}

MenuSelectMobile.propTypes = {
  
  handleOneNext: PropTypes.func.isRequired,
  handleOneLast: PropTypes.func.isRequired,
};

export default MenuSelectMobile;