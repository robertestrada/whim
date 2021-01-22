import React from 'react';
import '../../../styles/modal.css';

const ModalLeaveCart = ({ handleTabChangeNo, handleTabChangeYes }) => {

  return (
    <div className="modal__scroll checkedout-scroll">
      <div className="modal__content-leave-wrapper">
        <div className="modal__leave-question-large">Are you sure?</div>
        <div className="modal__leave-question-small">Do you want to leave the cart?</div>
        <div className="modal__leave-no" onClick={() => handleTabChangeNo()}>No</div>
        <div className="modal__leave-yes" onClick={() => handleTabChangeYes()}>Yes</div>
      </div>
    </div>
  );
}

export default ModalLeaveCart;