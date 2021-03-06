import React, { useEffect, useRef } from 'react';
import FeedFilterRatings from './FeedFilterRatings';
import FeedFilterPrices from './FeedFilterPrices';
import FeedFilterShippingSpeeds from './FeedFilterShippingSpeeds';
import '../../../../styles/feedFilter.css';


const FeedFilterChoices = ({  setPageData, lastFilterTerm, setLastFilterTerm, 
                              showFilterChoices, setShowFilterChoices, 
                              handleButtonClose, handleClearAll 
                          }) => {
  const nodeFilterChoices = useRef(null);

  const handleClickOffFilterWrapper = e => {
    if (nodeFilterChoices.current.contains(e.target)) {
      return;
    }
    setShowFilterChoices(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOffFilterWrapper);
    return () => {
      document.removeEventListener("mousedown", handleClickOffFilterWrapper)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={ showFilterChoices ? "filter__choices-wrapper" : "filter__choices-wrapper hide-choices"} ref={nodeFilterChoices}>
      <FeedFilterRatings setPageData={setPageData} lastFilterTerm={lastFilterTerm} setLastFilterTerm={setLastFilterTerm}/>
      <FeedFilterPrices setPageData={setPageData} lastFilterTerm={lastFilterTerm} setLastFilterTerm={setLastFilterTerm} />
      <FeedFilterShippingSpeeds setPageData={setPageData} lastFilterTerm={lastFilterTerm} setLastFilterTerm={setLastFilterTerm} />
      <div className="filter__choices-close-wrapper">
        <div className="filter__choices-close-button" onClick={() => handleButtonClose()}>Close</div>
        <div className="filter__choices-clear-all" onClick={() => handleClearAll()}>Clear All</div>
      </div>
    </div>
  );
}


export default FeedFilterChoices;
