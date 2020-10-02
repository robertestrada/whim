import React, { useState, useEffect } from 'react';
import '../styles/landingSlides.css';

const LandingSlides = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [sliderOne, setSliderOne] = useState([]);
  const [sliderTwo, setSliderTwo] = useState([]);
  const [sliderThree, setSliderThree] = useState([]);
  const [sliderFour, setSliderFour] = useState([]);

  const sliderOneBuild = () => {
    let slides = [];
    for(let i = 1; i <= 6; i++){
      slides.push(`https://whim-bucket.s3-us-west-1.amazonaws.com/whim-landing-images/${i}.jpg`);
    }
    setSliderOne([...slides, ...slides]);
  };

  const sliderTwoBuild = () => {
    let slides = [];
    for (let i = 7; i <= 12; i++) {
      slides.push(`https://whim-bucket.s3-us-west-1.amazonaws.com/whim-landing-images/${i}.jpg`);
    }
    setSliderTwo([...slides, ...slides]);
  }

  const sliderThreeBuild = () => {
    const slides = [];
    for (let i = 13; i <= 18; i++) {
      slides.push(`https://whim-bucket.s3-us-west-1.amazonaws.com/whim-landing-images/${i}.jpg`);
    }
    setSliderThree([...slides, ...slides]);
  }

  const sliderFourBuild = () => {
    const slides = [];
    for (let i = 19; i <= 25; i++) {
      slides.push(`https://whim-bucket.s3-us-west-1.amazonaws.com/whim-landing-images/${i}.jpg`);
    }
    setSliderFour([...slides, ...slides]);
  };

  useEffect(() => {
    sliderOneBuild();
    sliderTwoBuild();
    sliderThreeBuild();
    sliderFourBuild();
  }, []);


  return (
    <>
      <div className="landing__sliders-wraper-rev">
        <div className="landing__slider-rev">
          {sliderOne.map((url, idx) => <img 
                                        key={`${url}${idx}`}
                                        src={url} 
                                        alt={""} 
                                        className={`smooth-image-slider image-${imageLoaded ? 'visible' : 'hidden'}`} 
                                        onLoad={() => setImageLoaded(true)} 
                                      />)
        }
        </div>
      </div>
      <div className="landing__sliders-wraper">
        <div className="landing__slider">
          {sliderTwo.map((url, idx) => <img
            key={`${url}${idx}`}
            src={url}
            alt={""}
            className={`smooth-image-slider image-${imageLoaded ? 'visible' : 'hidden'}`}
            onLoad={() => setImageLoaded(true)}
          />)
          }
        </div>
      </div>
      <div className="landing__sliders-wraper-rev">
        <div className="landing__slider-rev">
          {sliderThree.map((url, idx) => <img
            key={`${url}${idx}`}
            src={url}
            alt={""}
            className={`smooth-image-slider image-${imageLoaded ? 'visible' : 'hidden'}`}
            onLoad={() => setImageLoaded(true)}
          />)
          }
        </div>
      </div>
      <div className="landing__sliders-wraper">
        <div className="landing__slider">
          {sliderFour.map((url, idx) => <img
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