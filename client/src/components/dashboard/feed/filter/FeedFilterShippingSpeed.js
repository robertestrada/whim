import React from 'react';
import '../../../../styles/feedFilter.css';


const FeedFilterShippingSpeed = ({ setPageData, lastFilterTerm, setLastFilterTerm }) => {

  const handleRadioClick = () => {
    setPageData({ "page": 1, "loadMore": false, "tab": "search" });
    setLastFilterTerm({ ...lastFilterTerm, 'shippingSpeed': 1 });
  };

  return (
    <div className="filter__rating-option" onClick={() => handleRadioClick()}>
      <div className={ lastFilterTerm.shippingSpeed === 1 ? "filter__rating-radio radio-selected" : "filter__rating-radio" }>
        <div className={ lastFilterTerm.shippingSpeed === 1 ? "filter__rating-dot dot-selected" : "filter__rating-dot" }></div>
      </div>
      <div className="filter__stars-wrapper">
        Express Shipping
      </div>
    </div>
  );
}


export default FeedFilterShippingSpeed;