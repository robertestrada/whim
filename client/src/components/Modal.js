import React, { useEffect, useState } from 'react';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';
import { useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import moment from 'moment';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '../styles/modalSplide.css';
import { baseUrl } from '../config';
import '../styles/modal.css';

const Modal = ({ modalData: { productId, showModal }, modalChange }) => {
  // const currentUserId = useSelector(state => state.authentication.user.id)
  const [imageLoaded, setImageLoaded] = useState(false);
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

  useEffect(() => { setImageFocus(0) }, [showModal, productData]);

  useEffect(() => {
    if (productId) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleModalExit = (e) => {
      setImageLoaded(false);
      setProductData({ "product": null });
      setProductImgUrls([]);
      modalChange({ "productId": null, "showModal": false })
  }

  const handleImageSelect = (idx) => { if (imageFocus !== idx) setImageFocus(idx) };

  const LoadingIndicator = () => {
    return (
      <div className="modal__loader" style={{ width: "100%", height: "100", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Loader type="ThreeDots" color="#00b9e9" height={60} width={60} />
        <div className="modal__content-loading"/>
      </div>
    )
  }

  return (
    <div className={showModal ? "modal show" : "modal"}>
      <div>
        <div className="modal__scroll" onClick={() => handleModalExit()}>
          <div className="modal__content" onClick={e => e.stopPropagation()}>
            {promiseInProgress
            ? <LoadingIndicator/>
            : <div className="modal__content-wrapper">
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
                        <Splide 
                        className="modal__images-container" 
                          options={{
                            type: "slide",
                            perPage: 7,
                            perMove: 4,
                            gap: '1rem',
                            direction: "ttb",
                            height: "568px",
                            pagination: false,
                            arrowPath: "M1 0a1.003 1.003 0 0 0-.71 1.71l3 3c.18.18.43.29.71.29.28 0 .53-.11.71-.29l3-3A1.003 1.003 0 0 0 7 0H1z",
                          }}>
                          {productImgUrls.map((url, idx) => <SplideSlide key={idx} >
                              <div 
                                className={imageFocus === idx ? `modal__image-button selected` : `modal__image-button`}
                                onMouseEnter={() => handleImageSelect(idx)}>
                                <img
                                  src={url}
                                  alt={""}
                                  className={`${imageFocus === idx && `image-selected`} smooth-image-small image-${
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
                            </SplideSlide>)
                          }
                        </Splide>
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
                          <svg className="modal__verified-svg" viewBox="0 0 18 18">
                            <g fill="none" fillRule="evenodd">
                              <path fill="#2FB7EC" d="M8.886 16.545l-2.115.849-1.476-1.727-2.27-.224-.498-2.209-1.906-1.245.595-2.185L.11 7.823l1.55-1.661-.05-2.263 2.151-.757 1.016-2.026 2.26.321L8.885.111l1.85 1.326 2.258-.321 1.017 2.026 2.15.757-.05 2.263 1.55 1.66-1.104 1.982.595 2.185-1.906 1.245-.498 2.21-2.27.223-1.476 1.727z"></path>
                              <path fill="#FFF" d="M5.645 8.91l-1.09 1.08 2.907 2.884L14 6.748l-1.09-1.081-5.45 5.045z"></path>
                              <path d="M-1-1h20v20H-1z"></path>
                            </g>
                          </svg>
                        </div>
                        <div className="modal__verified-info">
                          <div className="modal__verified-title">
                            Verified by Whim Shoppers
                          </div>
                          <div className="modal__verified-detail">
                            Product consistently receives high satisfaction ratings from our shoppers
                          </div>
                        </div>
                      </div>
                      {productData.shipping_speed === 1 && 
                        <div className="modal__verified-banner">
                          <div className="modal__verified-badge">
                            <svg className="modal__verified-svg" viewBox="0 0 18 12">
                              <g fill="none" fillRule="evenodd">
                                <path d="M17.2362829 5.299777c0-.763717-.6364308-1.400148-1.4001479-1.400148l-1.8583781-.1527434-.868597-2.7249975c-.0254573-.0254572-.0254573-.0509145-.0509145-.0763717C12.8036731.5891151 12.3963573.36 11.9126698.36H4.5164936c-.7128025 0-1.1017881.7647904-1.1781598 1.4266785H.5600592C.2545724 1.7866785 0 2.041251 0 2.3467377s.2545724.5600592.5600592.5600592h2.738872c.2800296.0509145.4836875.2800296.4836875.5600591 0 .3054869-.2545724.5600592-.5600592.5600592h-1.355125c-.3054868 0-.5600592.2545724-.5600592.5600592s.2545724.5600592.5600592.5600592H4.3525771c.3054868 0 .5600592.2545723.5600592.5600591 0 .3054869-.2545724.5600592-.5600592.5600592H3.046245c-.349069 0-.6036414.2545724-.6036414.5600592s.2545724.5600591.5600592.5600591h.8297055c-.3564013.0763718-.6109736.4073158-.6109736.7891743v1.0182894c0 .432773.3564013.8146316.8146315.8146316h.8480718c.2545723.8910032 1.094661 1.5528913 2.062036 1.5528913.9928321 0 1.8074637-.6618881 2.062036-1.5528913h3.0602941c.2545724.8910032 1.0946611 1.5528913 2.0620361 1.5528913.9928321 0 1.8074637-.6618881 2.062036-1.5528913h.9928322c.432773 0 .8146315-.3564013.8146315-.8146316V8.1764445c-.0509145-.4582302-.3818585-.8146315-.7637171-.8400887V5.299777zM6.8952196 10.4166812c-.5855164 0-1.094661-.4836874-1.094661-1.0946611 0-.5855164.4836874-1.0946611 1.094661-1.0946611.6109737 0 1.0946611.4836875 1.0946611 1.0946611-.0254572.6109737-.5091447 1.0946611-1.094661 1.0946611zm7.1843662 0c-.5855164 0-1.0946611-.4836874-1.0946611-1.0946611 0-.5855164.4836875-1.0946611 1.0946611-1.0946611.5855164 0 1.0946611.4836875 1.0946611 1.0946611 0 .6109737-.4836875 1.0946611-1.0946611 1.0946611z" fill="#EA9C51"></path>
                                <path d="M0-3h18v18H0z"></path>
                              </g>
                            </svg>
                          </div>
                          <div className="modal__verified-info">
                            <div className="modal__verified-title">
                              Faster Shipping
                            </div>
                            <div className="modal__verified-detail">
                              Get 12 - 14 day delivery on this product!
                            </div>
                          </div>
                        </div>
                      }
                    </div>
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
                            </div>
                          }
                          {(productData && productData.shipping_usa) &&
                            <div className="modal__verified">
                                <svg className="modal__usa-svg" viewBox="0 0 28 20">
                                  <defs>
                                    <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="US_e">
                                      <stop stopColor="#FFF" offset="0%"></stop>
                                      <stop stopColor="#F0F0F0" offset="100%"></stop>
                                    </linearGradient>
                                    <filter x="-5.4%" y="-7.5%" width="110.7%" height="130%" filterUnits="objectBoundingBox" id="US_c">
                                      <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                      <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0" in="shadowOffsetOuter1"></feColorMatrix>
                                    </filter>
                                    <rect id="US_a" x="0" y="0" width="28" height="20" rx="2"></rect>
                                    <path d="M10 6.667A.667.667 0 1110 8a.667.667 0 010-1.333zm-2.667 0a.667.667 0 110 1.333.667.667 0 010-1.333zm-2.666 0a.667.667 0 110 1.333.667.667 0 010-1.333zM2 6.667A.667.667 0 112 8a.667.667 0 010-1.333zm1.333-1.334a.667.667 0 110 1.334.667.667 0 010-1.334zm2.667 0a.667.667 0 110 1.334.667.667 0 010-1.334zm2.667 0a.667.667 0 110 1.334.667.667 0 010-1.334zM10 4a.667.667 0 110 1.333A.667.667 0 0110 4zM7.333 4a.667.667 0 110 1.333.667.667 0 010-1.333zM4.667 4a.667.667 0 110 1.333.667.667 0 010-1.333zM2 4a.667.667 0 110 1.333A.667.667 0 012 4zm1.333-1.333a.667.667 0 110 1.333.667.667 0 010-1.333zm2.667 0A.667.667 0 116 4a.667.667 0 010-1.333zm2.667 0a.667.667 0 110 1.333.667.667 0 010-1.333zM2 1.333a.667.667 0 110 1.334.667.667 0 010-1.334zm2.667 0a.667.667 0 110 1.334.667.667 0 010-1.334zm2.666 0a.667.667 0 110 1.334.667.667 0 010-1.334zm2.667 0a.667.667 0 110 1.334.667.667 0 010-1.334z" id="US_d"></path>
                                  </defs>
                                  <g fill="none" fillRule="evenodd">
                                    <mask id="US_b" fill="#fff">
                                      <use xlinkHref="#US_a"></use>
                                    </mask>
                                    <use fill="#FFF" xlinkHref="#US_a"></use>
                                    <path d="M28 18.667V20H0v-1.333h28zM28 16v1.333H0V16h28zm0-2.667v1.334H0v-1.334h28zm0-2.666V12H0v-1.333h28zM28 8v1.333H0V8h28zm0-2.667v1.334H0V5.333h28zm0-2.666V4H0V2.667h28zM28 0v1.333H0V0h28z" fill="#D02F44" mask="url(#US_b)"></path>
                                    <path fill="#46467F" mask="url(#US_b)" d="M0 0h12v9.333H0z"></path>
                                    <g mask="url(#US_b)">
                                      <use fill="#000" filter="url(#US_c)" xlinkHref="#US_d"></use>
                                      <use fill="url(#US_e)" xlinkHref="#US_d"></use>
                                    </g>
                                  </g>
                                </svg>
                            </div>
                          }
                          {(productData && productData.shipping_speed === 1) &&
                            <div className="modal__verified">
                              <svg className="modal__express-svg" viewBox="0 0 18 12">
                                <g fill="none" fillRule="evenodd">
                                  <path d="M17.2362829 5.299777c0-.763717-.6364308-1.400148-1.4001479-1.400148l-1.8583781-.1527434-.868597-2.7249975c-.0254573-.0254572-.0254573-.0509145-.0509145-.0763717C12.8036731.5891151 12.3963573.36 11.9126698.36H4.5164936c-.7128025 0-1.1017881.7647904-1.1781598 1.4266785H.5600592C.2545724 1.7866785 0 2.041251 0 2.3467377s.2545724.5600592.5600592.5600592h2.738872c.2800296.0509145.4836875.2800296.4836875.5600591 0 .3054869-.2545724.5600592-.5600592.5600592h-1.355125c-.3054868 0-.5600592.2545724-.5600592.5600592s.2545724.5600592.5600592.5600592H4.3525771c.3054868 0 .5600592.2545723.5600592.5600591 0 .3054869-.2545724.5600592-.5600592.5600592H3.046245c-.349069 0-.6036414.2545724-.6036414.5600592s.2545724.5600591.5600592.5600591h.8297055c-.3564013.0763718-.6109736.4073158-.6109736.7891743v1.0182894c0 .432773.3564013.8146316.8146315.8146316h.8480718c.2545723.8910032 1.094661 1.5528913 2.062036 1.5528913.9928321 0 1.8074637-.6618881 2.062036-1.5528913h3.0602941c.2545724.8910032 1.0946611 1.5528913 2.0620361 1.5528913.9928321 0 1.8074637-.6618881 2.062036-1.5528913h.9928322c.432773 0 .8146315-.3564013.8146315-.8146316V8.1764445c-.0509145-.4582302-.3818585-.8146315-.7637171-.8400887V5.299777zM6.8952196 10.4166812c-.5855164 0-1.094661-.4836874-1.094661-1.0946611 0-.5855164.4836874-1.0946611 1.094661-1.0946611.6109737 0 1.0946611.4836875 1.0946611 1.0946611-.0254572.6109737-.5091447 1.0946611-1.094661 1.0946611zm7.1843662 0c-.5855164 0-1.0946611-.4836874-1.0946611-1.0946611 0-.5855164.4836875-1.0946611 1.0946611-1.0946611.5855164 0 1.0946611.4836875 1.0946611 1.0946611 0 .6109737-.4836875 1.0946611-1.0946611 1.0946611z" fill="#EA9C51"></path>
                                  <path d="M0-3h18v18H0z"></path>
                                </g>
                              </svg>
                            </div>
                          }
                          </div>
                          <div className="modal__taxes">Taxes included where applicable</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;