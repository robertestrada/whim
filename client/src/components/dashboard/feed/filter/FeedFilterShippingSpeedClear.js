import React from 'react';
import '../../../../styles/feedFilter.css';


const FeedFilterShippingSpeedClear = ({ setPageData, lastFilterTerm, setLastFilterTerm }) => {

  const handleClearShippingSpeedClick = () => {
    setPageData({ "page": 1, "loadMore": false, "tab": "search" });
    setLastFilterTerm({ ...lastFilterTerm, 'shippingSpeed': -1 });
  };


  return (
    <div className="filter__rating-option" onClick={() => handleClearShippingSpeedClick()}>
      <div className="filter__rating-radio">
        <div className="filter__rating-dot"/>
      </div>
      <div className="filter__stars-wrapper">Clear</div>
    </div>
  );
}


export default FeedFilterShippingSpeedClear;