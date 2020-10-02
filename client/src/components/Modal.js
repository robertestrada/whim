import React, { useEffect, useState } from 'react';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import { baseUrl } from '../config';
import ModalImages from './ModalImages';
import ModalHeader from './ModalHeader';
import ModalVerified from './ModalVerified';
import ModalShipping from './ModalShipping';
import ModalDetails from './ModalDetails';
import '../styles/modal.css';

const Modal = ({ checkedOut, setCheckedOut, modalData: { productId, showModal }, modalChange }) => {
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
  // useEffect(() => {  }, [checkedOut]);

  useEffect(() => {
    if (productId) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleModalExit = (e) => {
      setImageLoaded(false);
      setProductData({ "product": null });
      setProductImgUrls([]);
      setCheckedOut(false);
      modalChange({ "productId": null, "showModal": false })
  }

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
      { checkedOut === true
        ? <div>
            <div className="modal__scroll checkedout-scroll" onClick={() => handleModalExit()}>
            <div className="modal__content checkedout-content" onClick={e => e.stopPropagation()}>
                <div className="modal__content-wrapper">
                  <div className="modal__header">
                    <div className="modal__tab-bar"></div>
                    <button className="modal__close" onClick={() => handleModalExit()}>
                      <svg width="14px" height="14px" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                        <g stroke="#3C4646" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 1l8 8M9 1L1 9"></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                  <div className="modal__checkedout-info">
                    <img
                      src="https://whim-bucket.s3-us-west-1.amazonaws.com/whim-assets/whim-logo.svg"
                      alt={""}
                      className={`smooth-image-checkout image-${imageLoaded ? 'visible-checkout' : 'hidden-checkout'}`}
                      onLoad={() => setImageLoaded(true)}
                    />
                    <div className="modal__checkedout-text-wrapper">
                      <div className="modal__checkedout-title">Thanks for Splurging!</div>
                      <div className="modal__checkedout-text">You unlocked the end of this demo's buying experience!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        : <div>
            <div className="modal__scroll" onClick={() => handleModalExit()}>
              <div className="modal__content" onClick={e => e.stopPropagation()}>
                {promiseInProgress
                ? <LoadingIndicator/>
                : <div className="modal__content-wrapper">
                    <ModalHeader handleModalExit={handleModalExit} />
                    <div className="modal__product-info">
                      <div className="modal__left">
                        <ModalImages 
                          productImgUrls={productImgUrls} 
                          imageLoaded={imageLoaded}
                          imageFocus={imageFocus}
                          setImageFocus={setImageFocus}
                          setImageLoaded={setImageLoaded}
                        />
                        <ModalVerified productData={productData} />
                        <ModalShipping productData={productData}/>
                      </div>
                      <div className="modal__right">
                        <ModalDetails productData={productData} productImgUrl={productImgUrls[0]} handleModalExit={handleModalExit} />
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
      }
    </div>
  );
}

export default Modal;