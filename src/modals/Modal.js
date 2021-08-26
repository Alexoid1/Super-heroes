import React from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal';
import ModalForm from './ModalForm';
import './Modal.css';

function Modal({ active, toggle }) {
  return (
    <Portal>
      {active
                    && (
                    <div className='wrapper'>
                      <div className="window">
                        <button type="button" className="closeBtn" onClick={toggle}>X</button>
                        <ModalForm />
                      </div>
                      <div onClick={toggle} className="background" aria-hidden="true" />
                    </div>
                    )}
    </Portal>
  );
}

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default Modal;
