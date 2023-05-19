import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modalRoot');



export default function Modal({ pic, onClose }) {
  
useEffect(() => {
  function handleKeyDown (e) {
    if (e.code === 'Escape') {
      return onClose();
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return ()=>{window.removeEventListener('keydown', handleKeyDown)} 
}, [onClose])


return createPortal(
      <div className={css.overlay}>
        <div className={css.modal}>
          <img src={pic} alt="" />
        </div>
      </div>,
      modalRoot
    );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  pic: PropTypes.string.isRequired,
};