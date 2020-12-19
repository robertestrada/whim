import React from 'react';
import FeedFilterRating from './FeedFilterRating';
import FeedFilterRatingClear from './FeedFilterRatingClear';
import '../styles/feedFilter.css';


const FeedFilterRatings = ({ setPageData, lastSearchTerm, setLastSearchTerm }) => {

  return (
    <div className="filter__ratings-wrapper">
      <div className="filter__ratings-title">Rating</div>
      { [...Array(5)].map((rating, idx) => idx > 0 ? <FeedFilterRating key={idx} idx={idx} setPageData={setPageData} lastSearchTerm={lastSearchTerm} setLastSearchTerm={setLastSearchTerm} /> : null ).reverse()}
      { lastSearchTerm.rating !== -1 ? <FeedFilterRatingClear setPageData={setPageData} lastSearchTerm={lastSearchTerm} setLastSearchTerm={setLastSearchTerm}/> : null }
    </div>
  );
}


export default FeedFilterRatings;