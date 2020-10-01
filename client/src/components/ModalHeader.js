import React from 'react';
import '../styles/modal.css';

const ModalImages = ({ handleModalExit }) => {

  return (
    <div className="modal__header">
      <div className="modal__tab-bar">
        <div className="modal__tab-wrapper">
          <div className="modal__tab"><h1 className="modal__tab-label">Overview</h1></div>
        </div>
      </div>
      <button className="modal__close" onClick={() => handleModalExit()}>
        <svg width="14px" height="14px" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#3C4646" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 1l8 8M9 1L1 9"></path>
          </g>
        </svg>
      </button>
    </div>
  );
}

export default ModalImages;