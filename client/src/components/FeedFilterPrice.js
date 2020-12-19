import React from 'react';
import '../styles/feedFilter.css';


const FeedFilterPrice = ({ idx, priceRange, setPageData, lastSearchTerm, setLastSearchTerm }) => {

  const handleRadioClick = () => {
    setPageData({ "page": 1, "loadMore": false, "tab": "search" });
    setLastSearchTerm({ ...lastSearchTerm, 'price': idx });
  };

  return (
    <div key={idx} className="filter__rating-option" onClick={() => handleRadioClick()}>
      <div className={ lastSearchTerm.price === idx ? "filter__rating-radio radio-selected" : "filter__rating-radio" }>
        <div className={ lastSearchTerm.price === idx ? "filter__rating-dot dot-selected" : "filter__rating-dot" }></div>
      </div>
      <div className="filter__price-text">
        {priceRange}
      </div>
    </div>
  );
}


export default FeedFilterPrice;