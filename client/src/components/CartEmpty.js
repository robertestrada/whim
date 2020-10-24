import React from 'react';
import '../styles/cart.css';


const CartEmpty = ({ setPanelType }) => {
  

  return (
    <div className="cart__empty-wrapper">
      <div className="cart__icon-wrapper">
        <svg className="cart__icon-svg" viewBox="0 0 21 17" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <g transform="translate(.56 .52)" fill="#192a32">
              <ellipse cx="14.753" cy="14.813" rx="1.366" ry="1.285"></ellipse>
              <ellipse cx="6.674" cy="14.813" rx="1.366" ry="1.285"></ellipse>
              <path d="M1.113 1.873h-.28a.832.832 0 0 1 0-1.665h2.83a1 1 0 0 1 .779.373l1.41 1.752a1 1 0 0 0 .779.373h12.106a1 1 0 0 1 .978 1.207l-1.365 6.422a1 1 0 0 1-.854.784L5.797 12.587a1 1 0 0 1-1.09-.736L2.508 3.583 2.03 2.476a1 1 0 0 0-.917-.603z"></path>
            </g>
            <path d="M0-2h21v21H0z"></path>
          </g>
        </svg>
      </div>
      <div className="cart__empty-text">Your cart is empty!</div>
      <div className="cart__empty-shopping" onClick={() => setPanelType('feed')}>Continue Shopping</div>
    </div>
  );
}

export default CartEmpty;