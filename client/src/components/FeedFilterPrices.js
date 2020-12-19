import React from 'react';
import FeedFilterPrice from './FeedFilterPrice';
import FeedFilterPriceClear from './FeedFilterPriceClear';
import '../styles/feedFilter.css';


const FeedFilterPrices = ({ setPageData, lastSearchTerm, setLastSearchTerm }) => {
  const priceRanges = ["$0 - $5", "$5 - $10", "$10 - $20", "$20 - $50", "$50 - $100", "$100+"]

  return (
    <div className="filter__ratings-wrapper">
      <div className="filter__ratings-title">Price</div>
      { priceRanges.map((priceRange, idx) => <FeedFilterPrice key={idx} idx={idx} priceRange={priceRange} setPageData={setPageData} lastSearchTerm={lastSearchTerm} setLastSearchTerm={setLastSearchTerm} /> ) }
      { lastSearchTerm.price !== -1 ? <FeedFilterPriceClear setPageData={setPageData} lastSearchTerm={lastSearchTerm} setLastSearchTerm={setLastSearchTerm}/> : null }
    </div>
  );
}


export default FeedFilterPrices;