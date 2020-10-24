import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/banner.css';

const Banner = ({ setPanelType }) => {
  const cartItems = useSelector(state => Object.values(state.cart.items));
  console.log("cartItems:", cartItems);
  console.log("cartItems:", cartItems[0]);
 
  return (
    <div className="banner__item-wrapper">
      { cartItems[0] 
        ? <div className="banner__item-container">
            <div className="banner__left">
              <img alt={''} src={cartItems[0].image} className="banner__image"/>
            </div>
            <div className="banner__right">
              <div className="banner__item-added">Item added in Cart</div>
              <div className="banner__item-name">{cartItems[0].product_data.name}</div>
              <div className="banner__item-option">
              {`${cartItems[0].option_data.size ? cartItems[0].option_data.size : ''}${cartItems[0].option_data.size && cartItems[0].option_data.color ? ', ' : ''}${cartItems[0].option_data.color ? cartItems[0].option_data.color : ''}`}
              </div>
              <div className="banner__view-cart" onClick={() => setPanelType('cart')}>View Cart</div>
            </div>
          </div>
        : null 
      }
    </div>
  );
}

export default Banner;