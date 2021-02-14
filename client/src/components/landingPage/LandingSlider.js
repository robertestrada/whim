import React from 'react';
import '../../styles/landingSlides.css';

const LandingSlider = ({
                          sliderIdx, 
                          slideBulkCount, 
                          slideBulk, 
                          slideStartsCounts,
                      }) => {

  const sliderNum = {'1': 'one', '2': 'two', '3': 'three'};

  const [slideStart, slideCount] = [slideStartsCounts[sliderIdx].start, slideStartsCounts[sliderIdx].count];

  return (
      <div className={`${sliderIdx % 2 === 0 ? "landing__sliders-wrapper-rev" : "landing__sliders-wrapper"}${ sliderIdx !==  0 ? ` ${sliderNum[sliderIdx]}` : ''}`}>
        <div className={`${sliderIdx % 2 === 0 ? "landing__slider-rev" : "landing__slider"}`}>
          { slideBulkCount >= slideStart
            && slideBulk.slice(slideStart, slideCount).map((url, idx) => 
                <img 
                  key={`${url}${idx}`}
                  src={url} 
                  alt={""} 
                  className="landing__slider-img" 
                />)
        }
        </div>
      </div>
  );
}

export default LandingSlider;