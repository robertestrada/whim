import React from 'react';
import ModalDetailsPricing from './ModalDetailsPricing';
import ModalDetailsOptions from './ModalDetailsOptions';
import '../styles/modal.css';

const ModalDetails = ({ productData, handleModalExit }) => {


  return (
    <div className="modal__right-wrapper">
      <div className="modal__product-details">
        <h1 className="modal__product-title">{productData.name}</h1>
        <ModalDetailsPricing productData={productData}/>
        {productData.options && <ModalDetailsOptions options={productData.options} handleModalExit={handleModalExit}/>}
      </div>
    </div>
  );
}

export default ModalDetails;