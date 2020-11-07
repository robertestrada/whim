import React, { useState } from 'react';
import '../styles/modal.css';

const ModalRefPrice = ({productData}) => {
  const [showLess, setShowLess] = useState(true);
  console.log("REF", showLess);

  const handleShowLessClick = () => {
    if (showLess){
      setShowLess(false);
    } else {
      setShowLess(true);
    }
  };

  return (
    <div className="modal__description-wrapper">
      <div className="modal__description-header">
        <div className="modal__description-title">Reference Price by Seller</div>
        <div className="modal__description-less" onClick={() => handleShowLessClick()}>{showLess ? "Show More" : "Show Less"}</div>
      </div>
      <div className={showLess ? "modal__description-container description-show-less" : "modal__description-container"}>
        <div className="modal__description-text">
          {productData.merchant && `A reference price is provided by the seller of the item (${productData.merchant.merchant_name}). Percentage off and savings amounts are based on the seller's reference price.  Sellers are not required to provide a reference price, but if they do, it should be (a) the Manufacturer's Suggested Retail Price (MSRP) or similar List Price of the product; or (b) the price at which the item has been recently offered for sale and for a reasonable period of time.`}
        </div>
      </div>
    </div>
  );
}

export default ModalRefPrice;