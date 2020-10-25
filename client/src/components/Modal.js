import React, { useEffect } from 'react';
import ModalCheckedOut from './ModalCheckedOut';
import ModalProduct from './ModalProduct';
import '../styles/modal.css';

const Modal = ({ checkedOut, setCheckedOut, modalData: { productId, showModal }, modalChange }) => {
  useEffect(() => {  }, [showModal]);

  return (
    <div className={showModal ? "modal show" : "modal"}>
      { checkedOut === true
        ? <ModalCheckedOut setCheckedOut={setCheckedOut} modalChange={modalChange}/>
        : <ModalProduct setCheckedOut={setCheckedOut} productId={productId} modalChange={modalChange}/>
      }
    </div>
  );
}

export default Modal;