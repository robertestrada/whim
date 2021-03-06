import React from 'react';
import '../../../../styles/modal.css';

const ModalMerchant = ({ productData }) => {

  return (
    <div className="modal__description-wrapper">
      <div className="modal__description-header">
        <div className="modal__description-title">Sold By</div>
        <div className="modal__description-less" >Store Ratings</div>
      </div>
      <div className="modal__merchant-section">
        <div className="modal__merchant-info">
          <img src={productData.merchant && `https://whim-bucket.s3-us-west-1.amazonaws.com/whim-merchants/${productData.merchant.id}.png`} alt='' className="modal__merchant-img"/>
          <div className="modal__merchant-description">
            <div className="modal__merchant-name">
              {productData.merchant && productData.merchant.merchant_name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalMerchant;