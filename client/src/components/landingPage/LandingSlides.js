import React, { useState, useEffect } from 'react';
import '../../styles/landingSlides.css';

const LandingSlides = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [slideBulk, setSlideBulk] = useState([]);
  const slideAmount = 6;

  const slideBuild = () => {
    let slides = [];
    for (let i = 0; i < slideAmount * 4; i++) {
      if (i % slideAmount < slideAmount) {
        slides.push(`https://whim-bucket.s3-us-west-1.amazonaws.com/whim-landing-images/${i + 1}.jpg`);
        if (i % slideAmount === slideAmount - 1) {
          slides = slides.concat(slides.slice(-slideAmount));
        }
      }
    }
    setSlideBulk([...slides]);
  };

  
  useEffect(() => {
    slideBuild();
  }, []);

  const [slideCount, setSlideCount] = useState(0);

  useEffect(() => {
    let slideCounter = slideCount;
    const slideInterval = setInterval(() => {
      if (slideCounter>= slideBulk) {
        clearInterval(slideInterval);
      } else {
        setSlideCount(c => c + 1);
        slideCounter++;
      }
    }, 100);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideBulk]);

  const slideBulkLength = slideBulk.length;
  const slideOneCount = slideCount >= slideAmount * 2 ? slideAmount * 2 : slideCount;

  const slideTwoStart = slideBulkLength / 4;
  const slideTwoCount = slideCount >= slideAmount * 4 ? slideAmount * 4 : slideCount;

  const slideThreeStart = slideTwoStart + slideTwoStart;
  const slideThreeCount = slideCount >= slideAmount * 6 ? slideAmount * 6 : slideCount;

  const slideFourStart = slideThreeStart + slideTwoStart;
  const slideFourCount = slideCount >= slideAmount * 8 ? slideAmount * 8 : slideCount;


  return (
    <>
      <div className="landing__sliders-wrapper-rev one">
        <div className="landing__slider-rev">
          { slideCount >= 0 && slideBulk.slice(0, slideOneCount).map((url, idx) => <img 
                                        key={`${url}${idx}`}
                                        src={url} 
                                        alt={""} 
                                        className={`smooth-image-slider image-${imageLoaded ? 'visible' : 'hidden'}`} 
                                        onLoad={() => setImageLoaded(true)} 
                                      />)
        }
        </div>
      </div>
      <div className="landing__sliders-wrapper two">
        <div className="landing__slider">
          { slideCount >= slideTwoStart && slideBulk.slice(slideTwoStart, slideTwoCount).map((url, idx) => <img
            key={`${url}${idx}`}
            src={url}
            alt={""}
            className={`smooth-image-slider image-${imageLoaded ? 'visible' : 'hidden'}`}
            onLoad={() => setImageLoaded(true)}
          />)
          }
        </div>
      </div>
      <div className="landing__sliders-wrapper-rev three">
        <div className="landing__slider-rev">
          { slideCount >= slideThreeStart && slideBulk.slice(slideThreeStart, slideThreeCount).map((url, idx) => <img
            key={`${url}${idx}`}
            src={url}
            alt={""}
            className={`smooth-image-slider image-${imageLoaded ? 'visible' : 'hidden'}`}
            onLoad={() => setImageLoaded(true)}
          />)
          }
        </div>
      </div>
      <div className="landing__sliders-wrapper four">
        <div className="landing__slider">
          { slideCount >= slideFourStart && slideBulk.slice(slideFourStart, slideFourCount).map((url, idx) => <img
            key={`${url}${idx}`}
            src={url}
            alt={""}
            className={`smooth-image-slider image-${imageLoaded ? 'visible' : 'hidden'}`}
            onLoad={() => setImageLoaded(true)}
          />)
          }
        </div>
      </div>
    </>
  );
}

export default LandingSlides;