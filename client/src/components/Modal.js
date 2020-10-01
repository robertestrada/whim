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

const Modal = ({ modalData: { productId, showModal }, modalChange }) => {
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
    </div>
  );
}

export default Modal;