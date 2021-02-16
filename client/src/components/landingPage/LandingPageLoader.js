import React from 'react';
import '../../styles/landingPage.css';
import Loader from 'react-loader-spinner';


const LandingPageLoader = ({ landingBlurSupported, slidersNotLoaded }) => {

  return (
    <div className={slidersNotLoaded ? `landing__loading-container${landingBlurSupported ? "" : " no-blur-support"}` : `landing__loading-container ${landingBlurSupported ? "" : "no-blur-support "}loading-hide`}>
      <Loader type="ThreeDots" color="#00b9e9" height={40} width={40} />
    </div>
  );
}
export default LandingPageLoader;
