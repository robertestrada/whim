import React from 'react';
import moment from 'moment';
import '../styles/modal.css';

const ModalShipping = ({ productData }) => {

  return (
    <div className="modal__shipping-wrapper">
      <div className="modal__shipping-conatiner">
        <div className="modal__shipping-info">
          {productData.shipping_speed === 1 &&
            <div>
              <div className="modal__shipping-speed">
                <div className="modal__shipping-speed-title">Express Shipping</div>
                <div className="modal__shipping-speed-amount">
                  {productData.options_data && `$${(2 + productData.options_data[0].weight)}`}
                </div>
                <svg className="modal__shipping-express-icon" viewBox="0 0 18 12">
                  <g fill="none" fillRule="evenodd">
                    <path d="M17.2362829 5.299777c0-.763717-.6364308-1.400148-1.4001479-1.400148l-1.8583781-.1527434-.868597-2.7249975c-.0254573-.0254572-.0254573-.0509145-.0509145-.0763717C12.8036731.5891151 12.3963573.36 11.9126698.36H4.5164936c-.7128025 0-1.1017881.7647904-1.1781598 1.4266785H.5600592C.2545724 1.7866785 0 2.041251 0 2.3467377s.2545724.5600592.5600592.5600592h2.738872c.2800296.0509145.4836875.2800296.4836875.5600591 0 .3054869-.2545724.5600592-.5600592.5600592h-1.355125c-.3054868 0-.5600592.2545724-.5600592.5600592s.2545724.5600592.5600592.5600592H4.3525771c.3054868 0 .5600592.2545723.5600592.5600591 0 .3054869-.2545724.5600592-.5600592.5600592H3.046245c-.349069 0-.6036414.2545724-.6036414.5600592s.2545724.5600591.5600592.5600591h.8297055c-.3564013.0763718-.6109736.4073158-.6109736.7891743v1.0182894c0 .432773.3564013.8146316.8146315.8146316h.8480718c.2545723.8910032 1.094661 1.5528913 2.062036 1.5528913.9928321 0 1.8074637-.6618881 2.062036-1.5528913h3.0602941c.2545724.8910032 1.0946611 1.5528913 2.0620361 1.5528913.9928321 0 1.8074637-.6618881 2.062036-1.5528913h.9928322c.432773 0 .8146315-.3564013.8146315-.8146316V8.1764445c-.0509145-.4582302-.3818585-.8146315-.7637171-.8400887V5.299777zM6.8952196 10.4166812c-.5855164 0-1.094661-.4836874-1.094661-1.0946611 0-.5855164.4836874-1.0946611 1.094661-1.0946611.6109737 0 1.0946611.4836875 1.0946611 1.0946611-.0254572.6109737-.5091447 1.0946611-1.094661 1.0946611zm7.1843662 0c-.5855164 0-1.0946611-.4836874-1.0946611-1.0946611 0-.5855164.4836875-1.0946611 1.0946611-1.0946611.5855164 0 1.0946611.4836875 1.0946611 1.0946611 0 .6109737-.4836875 1.0946611-1.0946611 1.0946611z" fill="#EA9C51"></path>
                    <path d="M0-3h18v18H0z"></path>
                  </g>
                </svg>
              </div>
              <div className="modal__shipping-dates">
                {`${moment().add(4, 'd').format('MMM D')} - ${moment().add(20, 'd').format('MMM D')}`}
              </div>
            </div>
          }
          <div className={productData.shipping_speed === 1 ? "modal__shipping-speed express-shipping" : "modal__shipping-speed"}>
            <div className="modal__shipping-speed-title">Standard Shipping</div>
            <div className="modal__shipping-speed-amount">
              {productData.options_data && `$${(1 + productData.options_data[0].weight)}`}
            </div>
          </div>
          <div className="modal__shipping-dates">
            {`${moment().add(10, 'd').format('MMM D')} - ${moment().add(30, 'd').format('MMM D')}`}
          </div>
        </div>
        <div className="modal__sold-by">{productData.merchant && `Items are sold and shipped by ${productData.merchant.merchant_name}`}</div>
      </div>
    </div>
  );
}

export default ModalShipping;