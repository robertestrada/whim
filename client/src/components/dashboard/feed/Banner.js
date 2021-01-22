import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartNotified } from '../../../actions/cart';
import '../../../styles/banner.css';

const Banner = ({ setPanelType }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => Object.values(state.cart.items));
  const [notify, setNotify] = useState(false);

  const recentCartItem = cartItems.length > 0 ? cartItems.reduce((acc, item) => {
    if (acc.updated_at < item.updated_at){
      return item
    } else {
      return acc;
    }
  }) : null;

  useEffect(() => {
    if (recentCartItem !== null && recentCartItem.notified === false) {
      setNotify(true);
      const notifyTimer = setTimeout(() => {
        dispatch(updateCartNotified(recentCartItem.id));
        setNotify(false)
      }, 3000);
      return () => clearTimeout(notifyTimer)
    };
  }, [recentCartItem, dispatch]);

  console.log("cartItems: ", cartItems);
  console.log("recentCartItem: ", recentCartItem);
  // console.log("recentCartItem.product_data: ", recentCartItem.product_data);

  return (
    <div className="banner__item-wrapper">
      { recentCartItem !== null
        ? <div className={notify ? "banner__item-container banner-reveal" : "banner__item-container"}>
            <div className="banner__left">
              <img alt={''} src={recentCartItem.image} className="banner__image"/>
            </div>
            <div className="banner__right">
              <div className="banner__item-added">Item added in Cart</div>
              <div className="banner__item-name">{recentCartItem.product_data.name}</div>
              <div className="banner__item-option">
                {`${recentCartItem.option_data.size ? recentCartItem.option_data.size : ''}${recentCartItem.option_data.size && cartItems[0].option_data.color ? ', ' : ''}${cartItems[0].option_data.color ? cartItems[0].option_data.color : ''}`}
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