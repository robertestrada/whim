import React from 'react';
import '../styles/modal.css';

const ModalLeaveCart = ({ setModalType, modalChange, handleTabChangeNo, handleTabChangeYes }) => {

  const handleModalExit = () => {
    setModalType('product');
    modalChange({ "productId": null, "showModal": false })
  }

  return (
    <div className="modal__scroll checkedout-scroll" onClick={() => handleModalExit()}>
      <div className="modal__content-leave-wrapper" onClick={e => e.stopPropagation()}>
        <div className="modal__leave-question-large">Are you sure?</div>
        <div className="modal__leave-question-small">Do you want to leave the cart?</div>
        <div className="modal__leave-no" onClick={() => handleTabChangeNo()}>No</div>
        <div className="modal__leave-yes" onClick={() => handleTabChangeYes()}>Yes</div>
      </div>
    </div>
  );
}

export default ModalLeaveCart;