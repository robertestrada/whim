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

const ModalProduct = ({ setModalType, productId, modalChange }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFocus, setImageFocus] = useState(0);
  const { promiseInProgress } = usePromiseTracker();
  const [productData, setProductData] = useState({ "product": null });
  const [productImgUrls, setProductImgUrls] = useState([]);
  // const description = cartItems[0] ? cartItems[0].product_data.description.replace(/<br\s*\\?>/g, "\r\n") : '';

  const fetchData = async () => {
    const result = await trackPromise(fetch(`${baseUrl}/product/${productId}`));
    if (result.ok) {
      const resultJSON = await result.json();
      let imgs = [];
      for (let i = 1; i <= resultJSON.product_img_amt; i++) {
        imgs.push(`https://whim-bucket.s3-us-west-1.amazonaws.com/whim-products/${resultJSON.category}/p${resultJSON.id}/${i}.jpeg`);
      }
      setProductImgUrls([...imgs]);
      setProductData({ ...resultJSON });
    }
  };

  useEffect(() => { setImageFocus(0) }, [productData]);

  useEffect(() => {
    if (productId) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleModalExit = () => {
    setImageLoaded(false);
    setProductData({ "product": null });
    setProductImgUrls([]);
    setModalType(false);
    modalChange({ "productId": null, "showModal": false })
  }

  const LoadingIndicator = () => {
    return (
      <div className="modal__loader" style={{ width: "100%", height: "100", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Loader type="ThreeDots" color="#00b9e9" height={60} width={60} />
        <div className="modal__content-loading" />
      </div>
    )
  }

  return (
    <div className="modal__scroll" onClick={() => handleModalExit()}>
      <div className="modal__content" onClick={e => e.stopPropagation()}>
        {promiseInProgress
          ? <LoadingIndicator />
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
                <ModalShipping productData={productData} />
                {/* <div className="banner__details">
                    {cartItems[0] ? description.split(/[\r\n]+/).map(newLine => <div className="banner__details-line">{newLine}</div>) : null}
                  </div> */}
              </div>
              <div className="modal__right">
                <ModalDetails productData={productData} productImgUrl={productImgUrls[0]} handleModalExit={handleModalExit} />
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default ModalProduct;