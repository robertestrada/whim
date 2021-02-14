import React from 'react';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import moment from 'moment';
import '../../../../styles/product.css';

const Product = ({ product: { imgs_folder, id, category, feed_pricing, feed_almost_gone, advert, shipping_speed, shipping_usa, verified, feed_past_orders, created_at }, modalChange, setModalType }) => {
  let product_img_url = `https://whim-bucket.s3-us-west-1.amazonaws.com/whim-products/${category}/${imgs_folder}/1.jpg`

  const tzOffset = { "h": moment().utcOffset() / 60, "m": moment().utcOffset() % 60 };

  const handleProductClick = () => {
    modalChange({ "productId": id, "showModal": true });
    setModalType('product');
  }

  return (
    <div className="product" onClick={handleProductClick} style={{ animation: `fadeIn 0.5s` }}>
      <div className="product__container">
        <ProductImage 
          product_img_url={product_img_url}
          feed_pricing={feed_pricing}
          feed_almost_gone={feed_almost_gone}
        />
        <div className="product__details">
          <ProductInfo 
            feed_pricing={feed_pricing} 
            advert={advert} 
            shipping_speed={shipping_speed} 
            shipping_usa={shipping_usa} 
            verified={verified}
          />
          <div className="product__message">
            { advert 
              ? 'Featured'
              : moment().diff(moment(created_at).subtract(tzOffset), 'd') < 8
                ? 'Just in' 
                : `${feed_past_orders}+ bought this`
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
