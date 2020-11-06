import React from 'react';
import '../styles/modal.css';

const ModalDescription = ({ productData }) => {

  return (
    <div className="modal__description-wrapper">
      <div className="modal__description-header">
        <div className="modal__description-title">Description</div>
        <div className="modal__description-less">Show Less</div>
      </div>
      <div className="modal__description-container">
        <div className="modal__description-text">
          {productData.description}
        </div>
      </div>
    </div>
  );
}

export default ModalDescription;