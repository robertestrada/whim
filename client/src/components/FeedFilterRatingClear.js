import React, { useEffect, useState } from 'react';
import '../styles/feedFilter.css';


const FeedFilterRatingClear = ({ setRadioSelected }) => {

  // useEffect(() => {

  // }, []);

  const handleClearClick = () => {

    setRadioSelected(null);
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