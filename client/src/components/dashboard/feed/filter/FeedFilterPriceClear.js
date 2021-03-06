import React from 'react';
import '../../../../styles/feedFilter.css';


const FeedFilterPriceClear = ({ setPageData, lastFilterTerm, setLastFilterTerm }) => {

  const handleClearPriceClick = () => {
    setPageData({ "page": 1, "loadMore": false, "tab": "search" });
    setLastFilterTerm({ ...lastFilterTerm, 'price': -1 });
  };


  return (
    <div className="filter__rating-option" onClick={() => handleClearPriceClick()}>
      <div className="filter__rating-radio">
        <div className="filter__rating-dot"/>
      </div>
      <div className="filter__stars-wrapper">Clear</div>
    </div>
  );
}


export default FeedFilterPriceClear;