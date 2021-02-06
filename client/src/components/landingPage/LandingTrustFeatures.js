import React from 'react';
import '../../styles/landingPage.css';

const LandingTrustFeatures = () => {
  
  return (
    <div className="landing__trust-wrapper">
      <div className="landing__trust-slogan-1">
        <svg className="landing__trust-slogan-1-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 11">
          <path fill="#0098d3" d="M13.087.667A.998.998 0 1114.5 2.08l-8.494 8.617a.998.998 0 01-1.411 0L.292 6.906a.998.998 0 011.412-1.412L5.3 8.578l7.788-7.91z"></path>
        </svg>
        Buyer Guarantee
      </div>
      <div className="landing__trust-slogan-2">
        <svg className="landing__trust-slogan-2-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 15">
          <g fill="#0098d3">
            <path d="M11.38 12.977A6.29 6.29 0 011.295 5.82a.765.765 0 011.39.64 4.762 4.762 0 109 1.104 4.734 4.734 0 00-1.252-2.418 4.745 4.745 0 00-3.56-1.451.765.765 0 01-.043-1.53c1.756-.05 3.46.63 4.704 1.918a6.284 6.284 0 01-.155 8.894z"></path>
            <path d="M7.131.354A.765.765 0 018.252 1.39l-.07.076-1.554 1.467 1.57 1.57a.765.765 0 01.068 1.003l-.069.079a.765.765 0 01-1.003.068l-.079-.068L4.99 3.458a.765.765 0 01-.051-1.025l.067-.072L7.13.354z"></path>
          </g>
        </svg>
        30 Day Returns
      </div>
      <div className="landing__trust-slogan-3">
        <svg className="landing__trust-slogan-3-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 14">
          <path fill="#0098d3" fillRule="evenodd" d="M0 .5v6.446c0 2.917 2.523 5.556 6.251 6.946 3.729-1.39 6.251-4.029 6.251-6.946V.5a.5.5 0 00-.5-.5H.5a.5.5 0 00-.5.5zm6.25.89v11.112C3.23 11.1 1.61 9.248 1.388 6.946V1.39H6.25z"></path>
        </svg>
        Secure Payments
      </div>
    </div>
  );
}
export default LandingTrustFeatures;
