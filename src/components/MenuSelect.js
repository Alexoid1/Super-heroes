import React from 'react';
import PropTypes from 'prop-types';
import './MenuSelect.css';

function MenuSelect({ handleNext, handleLast }) {
  /* eslint-disable jsx-a11y/control-has-associated-label */
  return (
    <div className="butonCont">
      <button type="button" onClick={handleLast}><i className="fa fa-arrow-left fa-2x" aria-hidden="true" /></button>
      <button type="button" onClick={handleNext}><i className="fa fa-arrow-right fa-2x" aria-hidden="true" /></button>
    </div>

  );
}

MenuSelect.propTypes = {
  handleNext: PropTypes.func.isRequired,
  handleLast: PropTypes.func.isRequired,
};

export default MenuSelect;
