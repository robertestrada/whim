import React from 'react';
import '../styles/feedFilter.css';


const FeedFilterRatingClear = ({ setPageData, searchTerm, setSearchTerm }) => {

  const handleClearRatingClick = () => {
    setPageData({ "page": 1, "loadMore": false, "tab": "search" });
    setSearchTerm({ ...searchTerm, 'rating': -1 });
  };


  return (
    <div className="filter__rating-option" onClick={() => handleClearRatingClick()}>
      <div className="filter__rating-radio">
        <div className="filter__rating-dot"/>
      </div>
      <div className="filter__stars-wrapper">Clear</div>
    </div>
  );
}


export default FeedFilterRatingClear;