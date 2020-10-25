import React, { useEffect } from 'react';
import ModalCheckedOut from './ModalCheckedOut';
import ModalProduct from './ModalProduct';
import ModalLeaveCart from './ModalLeaveCart';
import ModalRemoveItem from './ModalRemoveItem';
import '../styles/modal.css';

const Modal = ({ modalType, setModalType, modalData: { productId, showModal }, modalChange, handleTabChangeNo, handleTabChangeYes }) => {
  useEffect(() => {  }, [showModal, modalType]);

  return (
    <div className={showModal ? "modal show" : "modal"}>
      { modalType === 'modalType'
        ? <ModalCheckedOut setModalType={setModalType} modalChange={modalChange}/>
        : modalType === 'product'
          ? <ModalProduct setModalType={setModalType} productId={productId} modalChange={modalChange}/>
          : modalType === 'removeItem'
            ? <ModalRemoveItem setModalType={setModalType} productId={productId} modalChange={modalChange} />
            : modalType === 'leaveCart'
              ? <ModalLeaveCart 
                  setModalType={setModalType} 
                  productId={productId} 
                  modalChange={modalChange} 
                  handleTabChangeNo={handleTabChangeNo} 
                  handleTabChangeYes={handleTabChangeYes} 
                />
              : null
      }
    </div>
  );
}

export default Modal;