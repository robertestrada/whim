import React, { useState } from 'react';
// import NumberFormat from 'react-number-format';
import '../styles/product.css';

const Product = ({ product:  { product_img, price_starting, price_ending, inventory_starting, inventory_ending, created_at, ad } }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const pricePercent = ((price_ending - price_starting) / price_starting) * 100;
  
  const productUrgency = () => {
    const inventoryLevel = ((inventory_ending - inventory_starting) / price_starting);
    if (inventoryLevel < 0.2){
      return "Almost Gone!";
    }
  }

  const productMessage = () => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    if (date < created_at ){
      return "Just in";
    }
  }

  return (
    <div className="product" style={{ animation: `fadeIn 0.5s` }}>
      <div className="product__main">
        <div className="product__image">
          <img
            src={product_img}
            alt={"product-image"}
            className={`smooth-image image-${
              imageLoaded ? 'visible' : 'hidden'
            }`}
            onLoad={() => setImageLoaded(true)}
            />
          {!imageLoaded && (
            <div className="smooth-preloader">
              <span className="loader" />
            </div>
          )}
        </div>
        <div className="product__percent">{`${pricePercent}%`}</div>
        <div className="product__percent">{`${productUrgency}`}</div>
      </div>
      <div className="product__details">
        <div className="product__price-info">
          <div className="product__price-prices">            
            <div className="product__new-price">$100</div>
            <div className="product__old-price">$100</div>
          </div>
          { product_ad && <div className="product__ad">ad</div> }
        </div>
        <div className="product__message">{productMessage}</div>
      </div>
    </div>
  );
}

export default Product;
