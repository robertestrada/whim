import React from 'react';
import moment from 'moment';
import '../styles/modal.css';

const ModalDescription = ({ productData }) => {

  return (
    <div className="modal__description-wrapper">
      <div className="modal__description-header">
        <div className="modal__description-title">Standard Shipping</div>
        <div className="modal__description-text">
          {productData.description}
        </div>
      </div>
    </div>
  );
}

export default ModalDescription;