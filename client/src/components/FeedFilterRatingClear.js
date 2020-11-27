import React, { useEffect, useState } from 'react';
import '../styles/feedFilter.css';


const FeedFilterRatingClear = ({ searchTerm, setSearchTerm }) => {

  // useEffect(() => {

  // }, []);

  const handleClearClick = () => {
    setSearchTerm({ ...searchTerm, 'rating': null });
  };


  return (
    <div className="filter__rating-option" onClick={() => handleClearClick()}>
      <div className="filter__rating-radio">
        <div className="filter__rating-dot"/>
      </div>
      <div className="filter__stars-wrapper">Clear</div>
    </div>
  );
}


export default FeedFilterRatingClear;