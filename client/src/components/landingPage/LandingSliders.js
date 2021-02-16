import React, { useState, useEffect } from 'react';
import LandingSlider from './LandingSlider';
import '../../styles/landingSlides.css';
import '../../styles/landingPage.css';

const LandingSliders = ({ landingBlurSupported, slidersNotLoaded, setSlidersNotLoaded }) => {
  const [slideBulk, setSlideBulk] = useState([]);
  const [slideBulkCount, setSlideBulkCount] = useState(0);
  const slideAmount = 12;
  const [successfullImages, setSuccessfullImages] = useState(0);

  const slideBuild = () => {
    let slides = [];
    const categoryProductAmt = 24;
    const categories = [ "fashion", "shoes", "gadgets", "household-supplies", "home-decor", "watches", "tools", "kitchen" ];
    const categoryParams = categories.map((category, i) => ({'name': category, 'start': (categoryProductAmt * i)}));
    const seenProducts = {};

    for (let i = 0; i < slideAmount * 4; i++) {
      let randomCategory = categoryParams[Math.floor(Math.random() * categoryParams.length)].name;
      let randomProduct = categoryParams.filter(categoryParam => categoryParam.name === randomCategory)[0].start + Math.floor((Math.random() * 24) + 1);
      let randomUrlFragment = `${randomCategory}/p${randomProduct}`;

      while (seenProducts[randomUrlFragment]) {
        randomProduct = categoryParams.filter(categoryParam => categoryParam.name === randomCategory)[0].start + Math.floor((Math.random() * 24) + 1);
        randomUrlFragment = `${randomCategory}/p${randomProduct}`;
      }

      seenProducts[randomUrlFragment] = true;
      slides.push(`https://whim-bucket.s3-us-west-1.amazonaws.com/whim-products/${randomUrlFragment}/1.jpg`);

      if (i % slideAmount === slideAmount - 1) {
        slides = slides.concat(slides.slice(-slideAmount));
      }
    }
    setSlideBulk([...slides]);
  };

  const slideStartsCountsBuild = () => {
    const startsCounts = {};
    for (let i = 0; i < 4; i++) {
      const start = i * (slideAmount * 2);
      const countMultiplier = 2 * (i + 1);
      const count = slideBulkCount >= slideAmount * countMultiplier ? slideAmount * countMultiplier : slideBulkCount;

      startsCounts[i] = { 'start': start, 'count': count };
    }
    return startsCounts;
  };
  const slideStartsCounts = slideStartsCountsBuild();
  
  useEffect(() => {
    slideBuild();
  }, []);
  

  useEffect(() => {
    let slideCounter = slideBulkCount;
    const slideInterval = setInterval(() => {
      if (slideCounter === slideBulk.length) {
        clearInterval(slideInterval);
      } else {
        setSlideBulkCount(c => c + 1);
        slideCounter++;
      }
    }, 20);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideBulk]);


  useEffect(() => {
    if (slideAmount * 8 === successfullImages) {
      setSlidersNotLoaded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successfullImages]);


  return (
    <div className="landing__panel-left" style={{ animation: `fadeIn 0.5s` }}>
      { Array(4).fill().map((_, i) => 
          <LandingSlider 
            key={i} 
            sliderIdx={i}
            slideBulk={slideBulk} 
            slideBulkCount={slideBulkCount} 
            slideStartsCounts={slideStartsCounts}
            slidersNotLoaded={slidersNotLoaded}
            landingBlurSupported={landingBlurSupported}
            successfullImages={successfullImages}
            setSuccessfullImages={setSuccessfullImages}
          />)
      }
    </div>
  );
}

export default LandingSliders;