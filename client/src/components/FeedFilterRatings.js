import React, { useEffect, useState } from 'react';
import FeedFilterRating from './FeedFilterRating';
import FeedFilterRatingClear from './FeedFilterRatingClear';
import '../styles/feedFilter.css';


const FeedFilterRatings = () => {
  const [radioSelected, setRadioSelected] = useState(null);

  // useEffect(() => {

  // }, []);


  return (
    <div className="filter__ratings-wrapper">
      <div className="filter__ratings-title">Rating</div>
      { [...Array(5)].map((rating, idx) => idx > 0 ? <FeedFilterRating idx={idx} radioSelected={radioSelected} setRadioSelected={setRadioSelected} /> : null ).reverse()}
      { radioSelected !== null ? <FeedFilterRatingClear setRadioSelected={setRadioSelected}/> : null } 
    </div>
  );
}


export default FeedFilterRatings;