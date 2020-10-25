import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../actions/cart';
import CartEmpty from './CartEmpty';
import CartItem from './CartItem';
import '../styles/cart.css';


const Cart = ({ setModalType, modalChange, setPanelType }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => Object.values(state.cart.items));

  const itemTotal = cartItems.reduce((acc, item) => {
    return acc + (item.option_data.price_ending * item.quantity);
  }, 0);

  const shippingTotal = cartItems.reduce((acc, item) => {
    return acc + (2 + item.option_data.weight) * item.quantity;
  }, 0);

  

  const handleCheckout = () => {
    dispatch(clearCart());
    modalChange({ "productId": null, "showModal": true });
    setModalType('checkedOut');
  };

  return (
    <div className="cart__wrapper">
      <div className="cart__main-wrapper">
        <div className="cart__content-wrapper">
          <div className="cart__upper-wrapper">
            <div className="cart__left-wrapper">
              <div className="cart__list-wrapper">
                <h2 className="cart__list-title">Items In Cart</h2>
                { cartItems.length === 0 
                  ? <CartEmpty setPanelType={setPanelType}/>
                  : cartItems.map((item, idx) => <CartItem key={idx} item={item} itemQuantity={item.quantity}/>)}
              </div>
            </div>
            <div className="cart__right-wrapper">
              <div className="cart__fixed-wrapper">
                <h2 className="cart__order-header">Order Summary</h2>
                <div className="cart__order-wrapper">
                  <div className={cartItems.length ? "cart__pricing" : "cart__pricing cart-empty"}>
                    <div className="cart__price-row"><div className="cart__price-title">Item Total</div>{`$${itemTotal.toFixed(2)}`}</div>
                    <div className="cart__price-row"><div className="cart__price-title">Shipping</div>{`$${shippingTotal.toFixed(2)}`}</div>
                    <div className="cart__price-row"><div className="cart__price-title">Order Total</div>{`$${(itemTotal + shippingTotal).toFixed(2)}`}</div>
                    { cartItems.length 
                      ? <div className="cart__tax-text">Taxes included where applicable</div>
                      : null
                    }
                  </div>
                  { cartItems.length ?
                      <div>
                        <div className="cart__button-wrapper" onClick={() => handleCheckout()}>
                          <div className="cart__button">Checkout</div>
                        </div>
                        <div className="cart__return-policy-wrapper">
                          <div className="cart__return-svg-wrapper">
                            <svg className="cart__return-svg" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                              <g fill="none" fillRule="evenodd">
                                <path d="M36.098 9.716c-.93 12.852-6.27 22.005-16.02 27.46-4.97-3.398-8.783-7.24-11.441-11.527l27.46-15.933z" fill="#49C3EE"></path>
                                <path d="M3.902 9.765c3.823-2.295 9.373-5.481 15.986-7.814 5.08 2.032 10.084 4.115 16.21 7.814-.934 12.74-6.3 21.815-16.098 27.222C9.459 29.877 4.093 20.802 3.902 9.765z" fillOpacity=".84" fill="#2fb7ec"></path>
                                <path d="M8.921 12.172c2.701-1.62 6.623-3.868 11.296-5.515 3.59 1.434 7.127 2.905 11.455 5.515-.66 8.993-4.451 15.398-11.375 19.215-7.45-5.02-11.241-11.424-11.376-19.215z" fillOpacity=".97" fill="#FFF" opacity=".162"></path>
                                <path d="M.488.488h39.024v39.024H.488z"></path>
                                <path d="M19.824 1.951L20 36.964l-.04.023C9.442 29.81 4.09 20.721 3.901 9.72c3.799-2.301 9.852-5.668 15.922-7.769z" fill="#FFF" opacity=".33"></path>
                                <path fill="#FFF" opacity=".823" d="M20 21.664l-3.804 2.066.85-4.15-3.2-2.872 4.328-.499L20 12.367l1.826 3.842 4.329.499-3.2 2.872.849 4.15z"></path>
                              </g>
                            </svg>
                          </div>
                          <div className="cart__return-text">
                            30 Day Free Return and Refund
                          </div>
                        </div>
                      </div>
                      : null
                    }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;