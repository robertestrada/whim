import React, { useState } from 'react';
import '../styles/product.css';

const Product = ({ product_img_url, feed_pricing, feed_almost_gone }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="product__main">
      <div className="product__image">
        <img
          src={product_img_url}
          alt={""}
          className={`smooth-image image-${
            imageLoaded ? 'visible' : 'hidden'
          }`}
          onLoad={() => setImageLoaded(true)}
          />
        {!imageLoaded && (
          <div className="product__smooth-preloader"/>
        )}
        {feed_pricing.change ? <div className="product__percent">{`${feed_pricing.change * 100}%`}</div> : null}
        <div className="product__almost-gone">{feed_almost_gone && "Almost Gone!"}</div>
      </div>
    </div>
  );
}

export default Product;
