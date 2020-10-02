import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCartItem } from '../actions/cart';
import { clearCart } from '../actions/cart';
import moment from 'moment';
import '../styles/cart.css';


const Cart = ({ setCheckedOut, modalChange, setPanelType }) => {
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);
  const cartItems = useSelector(state => Object.values(state.cart.items));

  useEffect(() => { 
    if (cartItems.length === 0) {
      setPanelType('feed');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  const itemTotal = cartItems.reduce((acc, item) => {
    return acc + item.productData.feed_pricing.ending;
  }, 0)

  const shippingTotal = cartItems.reduce((acc, item) => {
    return acc + 2 + item.productData.options_data[0].weight;
  }, 0)

  const handleRemoveItem = (id) => {
    dispatch(removeCartItem(id));
  };

  const handleCheckout = () => {
    dispatch(clearCart());
    setPanelType('feed');
    modalChange({ "productId": null, "showModal": true });
    setCheckedOut(true);
  };

  return (
    <div className="cart__wrapper">
      <div className="cart__main-wrapper">
        <div className="cart__content-wrapper">
          <div className="cart__upper-wrapper">
            <div className="cart__left-wrapper">
              <div className="cart__list-wrapper">
                <h2 className="cart__list-title">Items In Cart</h2>
                {cartItems.map((item, idx) => <div className="cart__item-wrapper" key={idx}>
                  <div className="cart__item-inner-wrapper">
                      <div className="cart__product-image-wrapper">
                        <img
                          src={item.productImgUrl}
                          alt={""}
                          className={`smooth-image-cart image-${imageLoaded ? 'visible' : 'hidden'}`}
                          onLoad={() => setImageLoaded(true)}
                        />
                      </div>
                      <div className="cart__product-info">
                        <div className="cart__product-name">{item.productData.name}</div>
                          {item.color && item.size
                            ? <div className="cart__product-detail">{`${item.color}, Size ${item.size}`}</div>
                            : item.color
                              ? <div className="cart__product-detail">{item.color}</div>
                              : item.size
                                ? <div className="cart__product-detail">{`Size ${item.size}`}</div>
                                : null
                          }
                        <div className="cart__product-detail">{`Shipping: $${(2 + item.productData.options_data[0].weight)}`}</div>
                        <div className="cart__product-detail">
                          {`(${moment().add(4, 'd').format('MMM D')} - ${moment().add(20, 'd').format('MMM D')})`}
                          <svg className="cart__product-shipping-svg" viewBox="0 0 18 12">
                            <g fill="none" fillRule="evenodd">
                              <path d="M17.2362829 5.299777c0-.763717-.6364308-1.400148-1.4001479-1.400148l-1.8583781-.1527434-.868597-2.7249975c-.0254573-.0254572-.0254573-.0509145-.0509145-.0763717C12.8036731.5891151 12.3963573.36 11.9126698.36H4.5164936c-.7128025 0-1.1017881.7647904-1.1781598 1.4266785H.5600592C.2545724 1.7866785 0 2.041251 0 2.3467377s.2545724.5600592.5600592.5600592h2.738872c.2800296.0509145.4836875.2800296.4836875.5600591 0 .3054869-.2545724.5600592-.5600592.5600592h-1.355125c-.3054868 0-.5600592.2545724-.5600592.5600592s.2545724.5600592.5600592.5600592H4.3525771c.3054868 0 .5600592.2545723.5600592.5600591 0 .3054869-.2545724.5600592-.5600592.5600592H3.046245c-.349069 0-.6036414.2545724-.6036414.5600592s.2545724.5600591.5600592.5600591h.8297055c-.3564013.0763718-.6109736.4073158-.6109736.7891743v1.0182894c0 .432773.3564013.8146316.8146315.8146316h.8480718c.2545723.8910032 1.094661 1.5528913 2.062036 1.5528913.9928321 0 1.8074637-.6618881 2.062036-1.5528913h3.0602941c.2545724.8910032 1.0946611 1.5528913 2.0620361 1.5528913.9928321 0 1.8074637-.6618881 2.062036-1.5528913h.9928322c.432773 0 .8146315-.3564013.8146315-.8146316V8.1764445c-.0509145-.4582302-.3818585-.8146315-.7637171-.8400887V5.299777zM6.8952196 10.4166812c-.5855164 0-1.094661-.4836874-1.094661-1.0946611 0-.5855164.4836874-1.0946611 1.094661-1.0946611.6109737 0 1.0946611.4836875 1.0946611 1.0946611-.0254572.6109737-.5091447 1.0946611-1.094661 1.0946611zm7.1843662 0c-.5855164 0-1.0946611-.4836874-1.0946611-1.0946611 0-.5855164.4836875-1.0946611 1.0946611-1.0946611.5855164 0 1.0946611.4836875 1.0946611 1.0946611 0 .6109737-.4836875 1.0946611-1.0946611 1.0946611z" fill="#EA9C51"></path>
                              <path d="M0-3h18v18H0z"></path>
                            </g>
                          </svg>
                        </div>
                        <div className="cart__product-quantity">
                        <div className="cart__product-remove" onClick={() => handleRemoveItem(item.id)}>Remove</div>
                        </div>
                      </div>
                      <div className="cart__price-info">
                        <div className="cart__price-original">{`$${item.productData.feed_pricing.starting}`}</div>
                        <div className="cart__price-ending">{`$${item.productData.feed_pricing.ending}`}</div>
                      </div>
                    </div>
                  </div>)
                }
              </div>
            </div>
            <div className="cart__right-wrapper">
              <div className="cart__fixed-wrapper">
                <h2 className="cart__order-header">Order Summary</h2>
                <div className="cart__order-wrapper">
                  <div className="cart__pricing">
                    <div className="cart__price-row"><div className="cart__price-title">Item Total</div>{`$${itemTotal.toFixed(2)}`}</div>
                    <div className="cart__price-row"><div className="cart__price-title">Shipping</div>{`$${shippingTotal.toFixed(2)}`}</div>
                    <div className="cart__price-row"><div className="cart__price-title">Order Total</div>{`$${(itemTotal + shippingTotal).toFixed(2)}`}</div>
                    <div className="cart__tax-text">Taxes included where applicable</div>
                  </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;