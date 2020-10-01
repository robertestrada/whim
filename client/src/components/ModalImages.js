import React, { useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '../styles/modalSplide.css';
import '../styles/modal.css';

const ModalImages = ({ productImgUrls, imageLoaded, imageFocus, setImageFocus, setImageLoaded }) => {
  const handleImageSelect = (idx) => { if (imageFocus !== idx) setImageFocus(idx) };


  return (
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
                className={`${imageFocus === idx && `image-selected`} smooth-image-small image-${imageLoaded ? 'visible' : 'hidden'
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
          className={`smooth-image-main image-${imageLoaded ? 'visible' : 'hidden'
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
  );
}

export default ModalImages;