import React, { useEffect, useState } from 'react';
import FeedFilterButton from './FeedFilterButton';
import FeedFilterChoices from './FeedFilterChoices';
import '../../../../styles/feedFilter.css';


const FeedFilter = ({ setPageData, lastSearchTerm, 
                      lastFilterTerm, setLastFilterTerm,
                      tagTerm, setTagTerm, submittedSearchFilters 
                    }) => {
  const [filterSize, setFilterSize] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showFilterChoices, setShowFilterChoices] = useState(false);
  const [hiddenFilterChoices, setHiddenFilterChoices] = useState(false);

  const getWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", getWindowWidth);
    return () => window.removeEventListener("resize", getWindowWidth);
  }, []);

  useEffect(() => {
    let filterCount = 0;
    let totalTagsSize = 0;
    for (let i = 0; i < submittedSearchFilters.length; i++){
      const tagSize = (submittedSearchFilters[i][1].length * 8) + 24 + 16;
      if ((totalTagsSize + tagSize) < (windowWidth - 250 - 115 - 140) && lastFilterTerm.term !== submittedSearchFilters[i][1]){
        totalTagsSize += tagSize;
        filterCount += 1;
      }
    }
    setFilterSize(filterCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);
  
  useEffect(() => {
    if (!showFilterChoices){
      const timeout = setTimeout(() => {
        setHiddenFilterChoices(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [showFilterChoices]);

  const handleTagClick = i => {
    setTagTerm(submittedSearchFilters[i][1]);
  };

  const handleTagExit = () => {
    setTagTerm(null)
  };

  const handleButtonOpen = () => {
    setShowFilterChoices(true);
  };

  const handleButtonClose = () => {
    setShowFilterChoices(false);
  };

  const handleClearAll = () => {
    setLastFilterTerm({ ...lastFilterTerm, 'rating': -1, 'price': -1, 'shippingSpeed': -1 });
  };


  return (
    <div className="filter__wrapper">
      { tagTerm !== null && tagTerm !== lastFilterTerm.term
        ? <div className="filter__tag-path">
            {`${lastSearchTerm.term.trim()} / `}
            <div onClick={() => handleTagExit()} className="filter__tag tag-selected">
              {tagTerm}
              <div className="filter__tag-close">
                <svg className="filter__tag-close-svg" viewBox="0 0 10 10" >
                  <g stroke="#afc7d1" strokeWidth="1.5" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 1l8 8M9 1L1 9"></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        : <div className="filter__tags">
            { filterSize > 0 
              ? submittedSearchFilters.map((filter, idx) => filterSize > idx && filter[1] !== lastFilterTerm.term.trim() 
                                                            ? <div key={idx} onClick={() => handleTagClick(idx)} className="filter__tag">
                                                                {filter[1]}
                                                              </div> 
                                                            : null) 
              : null 
            }
          </div>
      }
      <FeedFilterButton lastFilterTerm={lastFilterTerm} handleButtonOpen={handleButtonOpen} />
      { hiddenFilterChoices 
        ? <FeedFilterChoices 
          setPageData={setPageData} 
          lastFilterTerm={lastFilterTerm} 
          setLastFilterTerm={setLastFilterTerm} 
          showFilterChoices={showFilterChoices} 
          setShowFilterChoices={setShowFilterChoices} 
          handleButtonClose={handleButtonClose} 
          handleClearAll={handleClearAll} /> 
        : null 
      }
    </div>
  );
}


export default FeedFilter;
