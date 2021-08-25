import React from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal';
import ModalForm from './ModalForm';
import './Modal.css';

const styles = {
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 1450,
    justifyContent: 'center',
    alignItems: 'center',

  },

  window: {
    position: 'fixed',
    background: 'rgba(23, 86, 124, 0.9)',
    borderRadius: 5,
    top: 70,
    left: '38%',
    padding: 15,
    boxShadow: 'rgba(0, 0, 0, 0.61)',
    zIndex: 10,
    minWidth: 270,

  },

  closeBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: 1450,
    background: 'rgba(0, 0, 0, 0.68)',
    top: 0,
    left: 0,
  },

};

function Modal({ active, toggle }) {
  return (
    <Portal>
      {active
                    && (
                    <div style={styles.wrapper}>
                      <div className="window" style={styles.window}>
                        <button type="button" style={styles.closeBtn} onClick={toggle}>X</button>
                        <ModalForm />
                      </div>
                      <div onClick={toggle} style={styles.background} aria-hidden="true" />
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
