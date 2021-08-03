import React from 'react';
import PropTypes from 'prop-types';
import { FaArrowLeft,FaArrowRight,
  FaAngleDoubleRight,FaAngleDoubleLeft} from 'react-icons/fa';
import './MenuSelect.css';

function MenuSelect({ handleNext, handleLast, handleOneLast, handleOneNext}) {
  /* eslint-disable jsx-a11y/control-has-associated-label */
  return (
    <div className="butonCont">
      <button type="button" onClick={handleLast}><FaAngleDoubleLeft className="iconSize"/></button>
      <button type="button" onClick={handleOneLast}><FaArrowLeft  className="iconSize" /></button>
      <button type="button" onClick={handleOneNext}><FaArrowRight  className="iconSize" /></button>
      <button type="button" onClick={handleNext}><FaAngleDoubleRight  className="iconSize" /></button>
    </div>
    

  );
}

MenuSelect.propTypes = {
  handleNext: PropTypes.func.isRequired,
  handleLast: PropTypes.func.isRequired,
};

export default MenuSelect;
