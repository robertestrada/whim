import React from 'react';
import '../styles/modal.css';


const ModalDetailsOption = ({ option, handleSelection }) => {
  return (
    <div className="modal__select" onClick={() => handleSelection(option)}>
      <div className="modal__select-text">{option}</div>
      <div className="modal__select-icon">icon</div>
    </div>
  );
}

export default ModalDetailsOption;