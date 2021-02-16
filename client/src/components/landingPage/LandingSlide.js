import React, { useState } from 'react';
import '../../styles/landingSlides.css';

const LandingSlide = ({ url, successfullImages, setSuccessfullImages }) => {

  const [imageSuccess, setImageSuccess] = useState(true);

  const handleImageError = () => {
    setImageSuccess(false);
    setSuccessfullImages(successfullImages + 1)
  }

  return (
    <>
      { imageSuccess 
        ? <img
            src={url}
            alt={""} 
            className="landing__slider-img"
            onLoad={() => setSuccessfullImages(successfullImages + 1)}
            onError={handleImageError}
          />
        : 
        <svg className="landing__slider-svg" fill="#2FB7EC" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 53.8 53.8" xmlSpace="preserve">
          <path d="M18.9,5.1c-0.5,0-1,0.4-1.1,1l-0.5,4c-0.1,0.4-0.3,0.8-0.6,1.1c-0.4,0.3-0.8,0.5-1.2,0.5c-0.4,0-0.8-0.2-1.1-0.5c-0.3-0.3-0.4-0.7-0.3-1.1l0.3-2.4c0-0.5-0.4-0.9-0.9-0.9h-1.3c-0.5,0-1,0.4-1.1,0.9l-0.3,2.4c-0.1,0.5-0.3,0.8-0.6,1.1c-0.4,0.3-0.8,0.5-1.2,0.5c-0.4,0-0.8-0.2-1.1-0.5c-0.3-0.3-0.4-0.7-0.3-1.1l0.7-5.3c0.1-0.5-0.2-1.1-0.7-1.3c0,0-5.5-2.3-5.9-2.5C1.3,0.9,0.9,1.2,0.8,1.8L0.4,3.1C0.3,3.7,0.6,4.3,1.2,4.6l3.7,1.5l-0.6,4c-0.2,1.3,0.1,2.5,0.9,3.5c0.8,1,1.9,1.4,3.2,1.4c1.2,0,2.4-0.4,3.4-1.2c0.8,0.8,1.8,1.2,3.1,1.2c1.3,0,2.6-0.5,3.6-1.4c1.1-1,1.7-2.1,1.9-3.5c0,0,0.6-4.2,0.6-4.3c0.1-0.4-0.3-0.7-0.9-0.7L18.9,5.1L18.9,5.1z"></path>
          <g>
            <path d="M34,3.5c-0.3-0.3-0.4-0.7-0.3-1.2c0.1-0.5,0.3-0.9,0.6-1.2c0.4-0.3,0.8-0.5,1.2-0.5c0.5,0,0.8,0.2,1.1,0.5C36.9,1.5,37,1.9,37,2.4c-0.1,0.5-0.3,0.9-0.6,1.2C36,3.8,35.5,4,35.1,4C34.6,4,34.3,3.8,34,3.5"></path>
            <path d="M35.8,5.1h-1.2c-0.5,0-0.9,0.4-1,0.9c0,0-1.2,8.3-1.2,8.4c0,0.3,0.3,0.6,0.8,0.6h1.2c0.5,0,0.9-0.4,1-0.9l1.2-8.4C36.6,5.3,36.2,5.1,35.8,5.1"></path>
          </g>
          <path d="M31.3,6.2C30.6,5.4,29.7,5,28.6,5c-1.1,0-2.2,0.2-3.2,1.2L26,1c0-0.3-0.3-0.6-0.8-0.6H24c-0.5,0-1,0.4-1,0.9l-1.9,13.1c0,0.3,0.3,0.6,0.8,0.6h1.2c0.5,0,0.9-0.4,1-0.9h0l0.6-4.1c0.1-0.8,0.4-1.4,1-1.9c0.5-0.4,1.1-0.6,1.7-0.6c1.2,0,1.7,0.8,1.5,2.4l-0.6,4.4c0,0.3,0.3,0.6,0.8,0.6h1.2c0.5,0,1-0.4,1-0.9L32,9.3C32.2,8,31.9,7,31.3,6.2"></path>
          <path d="M53.4,10c0.2-1.3-0.1-2.5-0.9-3.5c-0.8-1-1.9-1.4-3.2-1.4c-1.2,0-2.4,0.4-3.4,1.2c-0.8-0.8-1.8-1.2-3.1-1.2c-1.3,0-2.6,0.5-3.6,1.4c-1.1,1-1.7,2.1-1.9,3.5c0,0-0.6,4.2-0.6,4.3c-0.1,0.4,0.3,0.7,0.9,0.7h1.3v0c0.5,0,1-0.4,1.1-1l0.5-4c0.1-0.4,0.3-0.8,0.6-1.1c0.4-0.3,0.8-0.5,1.2-0.5c0.4,0,0.8,0.2,1.1,0.5c0.3,0.3,0.4,0.7,0.3,1.1l-0.3,2.4c0,0.5,0.4,0.9,0.9,0.9h1.3c0.5,0,1-0.4,1.1-0.9l0.3-2.4c0.1-0.5,0.3-0.8,0.6-1.1c0.4-0.3,0.8-0.5,1.2-0.5c0.4,0,0.8,0.2,1.1,0.5c0.3,0.3,0.4,0.7,0.3,1.1l-0.6,4.3c-0.1,0.4,0.3,0.7,0.9,0.7h1.3v0c0.5,0,1-0.4,1.1-1L53.4,10z"></path>
        </svg>
      }
    </>
  );
}

export default LandingSlide;