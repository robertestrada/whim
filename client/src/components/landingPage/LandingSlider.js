import React from 'react';
import LandingSlide from './LandingSlide';
import '../../styles/landingSlides.css';

const LandingSlider = ({
                          sliderIdx, 
                          slideBulkCount, 
                          slideBulk, 
                          slideStartsCounts,
                          slidersNotLoaded,
                          landingBlurSupported,
                          successfullImages,
                          setSuccessfullImages
                      }) => {

  const sliderNum = {'1': 'one', '2': 'two', '3': 'three'};
  const [slideStart, slideCount] = [slideStartsCounts[sliderIdx].start, slideStartsCounts[sliderIdx].count];

  return (
    <div className={`${sliderIdx % 2 === 0 ? "landing__sliders-wrapper-rev" : "landing__sliders-wrapper"}${sliderIdx !== 0 ? ` ${sliderNum[sliderIdx]}` : ''}${slidersNotLoaded && landingBlurSupported ? ' slider-blur' : ''}`}>
        <div className={`${sliderIdx % 2 === 0 ? "landing__slider-rev" : "landing__slider"}`}>
          { slideBulkCount >= slideStart
            && slideBulk.slice(slideStart, slideCount).map((url, idx) => <LandingSlide key={`${url}${idx}`} url={url} successfullImages={successfullImages} setSuccessfullImages={setSuccessfullImages} />)
        }
        </div>
      </div>
  );
}

export default LandingSlider;