import React, {useEffect} from 'react';
import '../styles/modal.css';


const ModalBuyButton = ({ colorError, buyReady, handleBuyCheck, handleBuyCheckout }) => {

  return (
    <div>
    { buyReady === true
      ? <div className="modal__buy" onClick={() => handleBuyCheckout()}>
          <div className="modal__buy-text">Buy</div>
        </div>
      : colorError === 'Sold Out'
        ? <div className="modal__buy no-stock" >
            <div className="modal__buy-text no-stock-text">Sold Out</div>
          </div>
        : <div className="modal__buy" onClick={() => handleBuyCheck()}>
            <div className="modal__buy-text">Buy</div>
          </div>
    }
    </div>
  );
}

export default ModalBuyButton;