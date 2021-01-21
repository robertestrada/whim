import React from 'react';
import FeedFilterPrice from './FeedFilterPrice';
import FeedFilterPriceClear from './FeedFilterPriceClear';
import '../styles/feedFilter.css';


const FeedFilterPrices = ({ setPageData, lastFilterTerm, setLastFilterTerm }) => {
  const priceRanges = ["$0 - $5", "$5 - $10", "$10 - $20", "$20 - $50", "$50 - $100", "$100+"]

  return (
    <div className="filter__ratings-wrapper">
      <div className="filter__ratings-title">Price</div>
      { priceRanges.map((priceRange, idx) => <FeedFilterPrice key={idx} idx={idx} priceRange={priceRange} setPageData={setPageData} lastFilterTerm={lastFilterTerm} setLastFilterTerm={setLastFilterTerm} /> ) }
      { lastFilterTerm.price !== -1 ? <FeedFilterPriceClear setPageData={setPageData} lastFilterTerm={lastFilterTerm} setLastFilterTerm={setLastFilterTerm}/> : null }
    </div>
  );
}


export default FeedFilterPrices;