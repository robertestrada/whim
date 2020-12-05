import React from 'react';
import FeedFilterRating from './FeedFilterRating';
import FeedFilterRatingClear from './FeedFilterRatingClear';
import '../styles/feedFilter.css';


const FeedFilterRatings = ({ setPageData, searchTerm, setSearchTerm }) => {

  return (
    <div className="filter__ratings-wrapper">
      <div className="filter__ratings-title">Rating</div>
      { [...Array(5)].map((rating, idx) => idx > 0 ? <FeedFilterRating key={idx} idx={idx} setPageData={setPageData} searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> : null ).reverse()}
      { searchTerm.rating !== -1 ? <FeedFilterRatingClear setPageData={setPageData} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/> : null }
    </div>
  );
}


export default FeedFilterRatings;