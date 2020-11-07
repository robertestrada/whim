import React, { useState } from 'react';
import '../styles/modal.css';

const ModalDescription = ({ productData }) => {
  const [showLess, setShowLess] = useState(false);

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
        <div className="modal__description-title">Description</div>
        <div className="modal__description-less" onClick={() => handleShowLessClick()}>{showLess ? "Show More" : "Show Less"}</div>
      </div>
      <div className={showLess ? "modal__description-container description-show-less" : "modal__description-container"}>
        <div className="modal__description-text">
          {productData.description}
        </div>
      </div>
    </div>
  );
}

export default ModalDescription;