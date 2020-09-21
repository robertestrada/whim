import React, { useEffect, useState } from 'react';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import { baseUrl } from '../config';
import '../styles/modal.css';

const Modal = ({ modalData: { productId, showModal }, modalChange }) => {
  // const currentUserId = useSelector(state => state.authentication.user.id)
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(0)
  const [scrollTopHide, setScrollTopHide] = useState(true);
  const [scrollBottomHide, setScrollBottomHide] = useState(false);
  const [imageFocus, setImageFocus] = useState(0);
  const { promiseInProgress } = usePromiseTracker();
  const [productData, setProductData] = useState({ "product": null });
  const [productImgUrls, setProductImgUrls] = useState([]);

  const fetchData = async () => {
    const result = await trackPromise(fetch(`${baseUrl}/product/${productId}`));
    if (result.ok) {
      const resultJSON = await result.json();
      let imgs = [];
      if (resultJSON.id < 4) {
        for(let i = 1; i <= resultJSON.product_img_amt; i++){
          imgs.push(`https://whim-bucket.s3-us-west-1.amazonaws.com/whim-products/product-${resultJSON.id}/${i}.jpg`);
        }
      }
      else {
        for (let i = 1; i <= 10; i++) {
          imgs.push(`https://whim-bucket.s3-us-west-1.amazonaws.com/whim-products/${resultJSON.category}/${resultJSON.id}.jpg`);
        }
      }
      setProductImgUrls([...imgs]);
      setProductData({ ...resultJSON });
    }
  };

  useEffect(() => { 
    setScrollAmount(0);
    setScrollTopHide(true);
    setScrollBottomHide(false);
    setImageFocus(0)
  }, [showModal, productData]);

  useEffect(() => {
    if (productId){
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleModalExit = () => {
    setImageLoaded(false);
    setProductData({ "product": null });
    setProductImgUrls([]);
    modalChange({ "productId": null, "showModal": false })
  }

  const handleScrollTopClick = () => {
    const scrollDownAmount = 64 + 16;
    const scrollTotal = productData.product_img_amt * scrollDownAmount;
    console.log("TOP scrollTotal:", scrollTotal, "scrollAmount:", scrollAmount)
    if (scrollAmount <= -80){
      setScrollAmount(scrollAmount + scrollDownAmount);
      setScrollBottomHide(false);
    }
    if (!(scrollAmount <= -160)) {
      setScrollTopHide(true);
    }
  }

  const handleScrollBottomClick = () => {
    const scrollUpAmount = 64 + 16;
    const scrollTotal = productData.product_img_amt * scrollUpAmount;
    console.log("BOTTOM scrollTotal:", scrollTotal, "scrollAmount:", scrollAmount)
    if (scrollAmount >= -scrollTotal + 560 + 80) {
      setScrollAmount(scrollAmount - scrollUpAmount);
      setScrollTopHide(false);
    }
    if (!(scrollAmount >= -scrollTotal + 560 + 160)){
      setScrollBottomHide(true);
    }
  }

  const handleImageClick = (idx) => {
    console.log("idx:", idx);
    console.log("productImgUrls:", productImgUrls[idx]);
    if (imageFocus !== idx){
      setImageFocus(idx);
    }
  }

  const LoadingIndicator = () => {
    return (
      <div style={{ width: "100%", height: "100", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Loader type="ThreeDots" color="#00b9e9" height={60} width={60} />
      </div>
    )
  }



  return (
    <div className={showModal ? "modal show" : "modal"}>
      <div className="modal__content">
        {promiseInProgress || !productData
        ? <LoadingIndicator/>
        : <div>
            <div className="modal__header">
              <div className="modal__tab-bar">
                <div className="modal__tab-wrapper">
                  <div className="modal__tab"><h1 className="modal__tab-label">Overview</h1></div>
                </div>
              </div>
              <button className="modal__close" onClick={() => handleModalExit()}>
                <svg width="14px" height="14px" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                  <g stroke="#3C4646" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 1l8 8M9 1L1 9"></path>
                  </g>
                </svg>
              </button>
            </div>
            <div className="modal__product-info">
              <div className="modal__left">
                <div className="modal__images">
                  <div className="modal__images-side">
                    <div className={scrollTopHide ? "modal__scroll-top hide" : "modal__scroll-top"} onClick={() => handleScrollTopClick()}>
                      <svg width="8px" height="5px" viewBox="0 0 8 5">
                        <g fill="none" fillRule="evenodd">
                          <path d="M-4-6h16v16H-4z"></path>
                          <path d="M1 0a1.003 1.003 0 0 0-.71 1.71l3 3c.18.18.43.29.71.29.28 0 .53-.11.71-.29l3-3A1.003 1.003 0 0 0 7 0H1z" fill="#fff"></path>
                        </g>
                      </svg>
                    </div>
                    <div className="modal__images-container" style={{ transform: `translateY(${scrollAmount}px)`}}>
                      {productImgUrls.map((url, idx) =>  <div key={idx} className="modal__image-button" onClick={() => handleImageClick(idx)}>
                                                          <img
                                                            src={url}
                                                            alt={""}
                                                            className={`smooth-image-small image-${
                                                              imageLoaded ? 'visible' : 'hidden'
                                                            }`}
                                                            onLoad={() => setImageLoaded(true)}
                                                          />
                                                          {!imageLoaded && (
                                                            <div className="smooth-preloader">
                                                              <span className="loader" />
                                                            </div>
                                                          )}
                                                        </div>)
                      }
                    </div>
                    <div className={scrollBottomHide ? "modal__scroll-bottom hide" : "modal__scroll-bottom"} onClick={() => handleScrollBottomClick()}>
                      <svg width="8px" height="5px" viewBox="0 0 8 5">
                        <g fill="none" fillRule="evenodd">
                          <path d="M-4-6h16v16H-4z"></path>
                          <path d="M1 0a1.003 1.003 0 0 0-.71 1.71l3 3c.18.18.43.29.71.29.28 0 .53-.11.71-.29l3-3A1.003 1.003 0 0 0 7 0H1z" fill="#fff"></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="modal__images-main">
                    <img
                      src={productImgUrls[imageFocus]}
                      alt={""}
                      className={`smooth-image-main image-${
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
                </div>
                <div className="modal__verified-wrapper">
                  <div className="modal__verified-banner">
                    <div className="modal__verified-badge">
                      <svg class="modal__verified-svg" viewBox="0 0 18 18">
                        <g fill="none" fillRule="evenodd">
                          <path fill="#2FB7EC" d="M8.886 16.545l-2.115.849-1.476-1.727-2.27-.224-.498-2.209-1.906-1.245.595-2.185L.11 7.823l1.55-1.661-.05-2.263 2.151-.757 1.016-2.026 2.26.321L8.885.111l1.85 1.326 2.258-.321 1.017 2.026 2.15.757-.05 2.263 1.55 1.66-1.104 1.982.595 2.185-1.906 1.245-.498 2.21-2.27.223-1.476 1.727z"></path>
                          <path fill="#FFF" d="M5.645 8.91l-1.09 1.08 2.907 2.884L14 6.748l-1.09-1.081-5.45 5.045z"></path>
                          <path d="M-1-1h20v20H-1z"></path>
                        </g>
                      </svg>
                    </div>
                    <div className="modal__verified-info">
                      <div className="modal__verified-title">
                        Verified by Wish Shoppers
                      </div>
                      <div className="modal__verified-detail">
                        Product consistently receives high satisfaction ratings from our shoppers
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal__shipping-wrapper">
                  <div className="modal__shipping-conatiner">
                    <div className="modal__shipping-info">
                      <div className="modal__shipping-speed">
                        <div className="modal__shipping-speed-title">
                          {productData.shipping_speed === 0 ? "Standard Shipping" : "Express Shipping"}
                        </div>
                        <div className="modal__shipping-speed-amount">
                          {`$${(productData.shipping_speed * 10) + 5}`}
                        </div>
                      </div>
                      <div className="modal__shipping-dates">
                        Sep 30 - Oct 15
                      </div>
                    </div>
                    <div className="modal__sold-by">Items are sold and shipped by yijiaxinzi</div>
                  </div>
                </div>
              </div>
              <div className="modal__right">
                <div className="modal__right-wrapper">
                  <div className="modal__product-details">
                    <h1 className="modal__product-title">{productData.name}</h1>
                    <div className="modal__pricing-wrapper">
                      <div className="modal__price-info-wrapper">
                      {(productData.feed_pricing && productData.feed_pricing.ending) &&
                        <div className="modal__actual-price">{`$${productData.feed_pricing.ending}`}</div>}
                      {(productData.feed_pricing && productData.feed_pricing.starting) &&
                        <div className="modal__original-price">{`$${productData.feed_pricing.starting}`}</div>}
                      {(productData && productData.verified) &&
                        <div className="modal__verified">
                          <svg className="modal__verified-badge" viewBox="0 0 18 18">
                            <g fill="none" fillRule="evenodd">
                              <path fill="#2FB7EC" d="M8.886 16.545l-2.115.849-1.476-1.727-2.27-.224-.498-2.209-1.906-1.245.595-2.185L.11 7.823l1.55-1.661-.05-2.263 2.151-.757 1.016-2.026 2.26.321L8.885.111l1.85 1.326 2.258-.321 1.017 2.026 2.15.757-.05 2.263 1.55 1.66-1.104 1.982.595 2.185-1.906 1.245-.498 2.21-2.27.223-1.476 1.727z"></path>
                              <path fill="#FFF" d="M5.645 8.91l-1.09 1.08 2.907 2.884L14 6.748l-1.09-1.081-5.45 5.045z"></path>
                              <path d="M-1-1h20v20H-1z"></path>
                            </g>
                          </svg>
                        </div>}
                      </div>
                      <div class="modal__taxes">Taxes included where applicable</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Modal;