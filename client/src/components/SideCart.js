import React from 'react';
import '../styles/sideCart.css';


const SideCart = ({ setPanelType, cartItems, imageLoaded, setImageLoaded }) => {

  return (
    <>
      <div className="sidecart__view-button-top" onClick={() => setPanelType('cart')} >View Cart</div>
      <div className="sidecart__cart-container">
        <div className="sidecart__cart-list">
          {cartItems.map((item, idx) => <div className="sidecart__cart-item" key={idx}>
              <div className="sidecart__product-image-wrapper">
                <img
                  src={item.productImgUrl}
                  alt={""}
                  className={`smooth-image-sidecart image-${imageLoaded ? 'visible' : 'hidden'}`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
              <div className="sidecart__product-name">{item.productData.name}</div>
            </div>)
          }
        </div>
      </div>
      <div className="sidecart__view-button-bottom" onClick={() => setPanelType('cart')} >View Cart</div>
    </>
  );
}

export default SideCart;