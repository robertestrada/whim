import React from 'react';
import ModalDetailsPricing from './ModalDetailsPricing';
import ModalDetailsOptions from './ModalDetailsOptions';
import '../../../../../styles/modal.css';

const ModalDetails = ({ productData, productImgUrl, handleModalExit }) => {
  
  return (
    <div className="modal__right-wrapper">
      <div className="modal__product-details">
        <h1 className="modal__product-title">{productData.name}</h1>
        {productData.options && <ModalDetailsPricing productData={productData}/>}
        {productData.options && <ModalDetailsOptions productImgUrl={productImgUrl} productId={productData.id} options={productData.options} handleModalExit={handleModalExit}/>}
      </div>
    </div>
  );
}

export default ModalDetails;