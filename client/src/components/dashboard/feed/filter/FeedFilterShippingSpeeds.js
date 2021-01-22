import React from 'react';
import FeedFilterShippingSpeed from './FeedFilterShippingSpeed';
import FeedFilterShippingSpeedClear from './FeedFilterShippingSpeedClear';
import '../../../../styles/feedFilter.css';


const FeedFilterShippingSpeeds = ({ setPageData, lastFilterTerm, setLastFilterTerm }) => {

  return (
    <div className="filter__ratings-wrapper">
      <div className="filter__ratings-title">Rating</div>
      <FeedFilterShippingSpeed setPageData={setPageData} lastFilterTerm={lastFilterTerm} setLastFilterTerm={setLastFilterTerm} />
      { lastFilterTerm.shippingSpeed !== -1 ? <FeedFilterShippingSpeedClear 
                                                setPageData={setPageData} lastFilterTerm={lastFilterTerm} 
                                                setLastFilterTerm={setLastFilterTerm}
                                              /> : null 
      }
    </div>
  );
}


export default FeedFilterShippingSpeeds;