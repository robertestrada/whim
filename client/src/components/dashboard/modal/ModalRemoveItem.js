import React from 'react';
import '../../../styles/modal.css';

const ModalRemoveItem = ({ handleRemoveItemNo, handleRemoveItemYes }) => {

  return (
    <div className="modal__scroll checkedout-scroll">
      <div className="modal__content-leave-wrapper">
        <div className="modal__leave-question-large">Are you sure?</div>
        <div className="modal__leave-question-small">Do you want to remove this from the cart?</div>
        <div className="modal__leave-no" onClick={() => handleRemoveItemNo()}>No</div>
        <div className="modal__leave-yes" onClick={() => handleRemoveItemYes()}>Yes</div>
      </div>
    </div>
  );
}

export default ModalRemoveItem;