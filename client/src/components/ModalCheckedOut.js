import React, { useState } from 'react';
import '../styles/modal.css';

const ModalCheckedOut = ({ setModalType, modalChange }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleModalExit = () => {
    setImageLoaded(false);
    setModalType(false);
    modalChange({ "productId": null, "showModal": false })
  }

  return (
    <div className="modal__scroll checkedout-scroll" onClick={() => handleModalExit()}>
      <div className="modal__content checkedout-content" onClick={e => e.stopPropagation()}>
        <div className="modal__content-wrapper">
          <div className="modal__header">
            <div className="modal__tab-bar"></div>
            <button className="modal__close" onClick={() => handleModalExit()}>
              <svg width="14px" height="14px" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                <g stroke="#3C4646" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 1l8 8M9 1L1 9"></path>
                </g>
              </svg>
            </button>
          </div>
          <div className="modal__checkedout-info">
            <img
              src="https://whim-bucket.s3-us-west-1.amazonaws.com/whim-assets/whim-logo.svg"
              alt={""}
              className={`smooth-image-checkout image-${imageLoaded ? 'visible-checkout' : 'hidden-checkout'}`}
              onLoad={() => setImageLoaded(true)}
            />
            <div className="modal__checkedout-text-wrapper">
              <div className="modal__checkedout-title">Thanks for Splurging!</div>
              <div className="modal__checkedout-text">You unlocked the end of this demo's buying experience!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCheckedOut;