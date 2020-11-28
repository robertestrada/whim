import React from 'react';
import '../styles/feedFilter.css';


const FeedFilterPriceClear = ({ setPageData, searchTerm, setSearchTerm }) => {

  const handleClearPriceClick = () => {
    console.log("CLEARCLICK PRICE");
    setPageData({ "page": 1, "loadMore": false, "tab": "search" });
    setSearchTerm({ ...searchTerm, 'price': -1 });
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