import React, { useEffect, useState } from 'react';
import FeedFilterButton from './FeedFilterButton';
import FeedFilterChoices from './FeedFilterChoices';
import '../styles/feedFilter.css';


const FeedFilter = ({ searchTerm, tagTerm, setTagTerm, submittedSearchFilters }) => {
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
      if ((totalTagsSize + tagSize) < (windowWidth - 250 - 115 - 140) && searchTerm !== submittedSearchFilters[i][1]){
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
    console.log(submittedSearchFilters[i][1]);
    setTagTerm(submittedSearchFilters[i][1]);
  };

  const handleTagExit = () => {
    setTagTerm(searchTerm);
  };

  const handleButtonOpen = () => {
    setShowFilterChoices(true);
  };

  const handleButtonClose = () => {
    setShowFilterChoices(false);
  };

  const handleClearAll = () => {

  };

  return (
    <div className="filter__wrapper">
      { tagTerm !== null && tagTerm !== searchTerm
        ? <div className="filter__tag-path">
            {`${searchTerm} / `}
            <div onClick={() => handleTagExit()} className="filter__tag tag-selected">
              {tagTerm}
              <div className="filter__tag-close">
                <svg className="filter__tag-close-svg" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" >
                  <g stroke="#afc7d1" stroke-width="1.5" fill="none" fillRule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 1l8 8M9 1L1 9"></path>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        : <div className="filter__tags">
            { filterSize > 0 ? submittedSearchFilters.map((filter, idx) => filterSize > idx && filter[1] !== searchTerm ? <div key={idx} onClick={() => handleTagClick(idx)} className="filter__tag">{filter[1]}</div> : null) : null }
          </div>
      }
      <FeedFilterButton handleButtonOpen={handleButtonOpen} />
      { hiddenFilterChoices ? <FeedFilterChoices showFilterChoices={showFilterChoices} handleButtonClose={handleButtonClose} handleClearAll={handleClearAll} /> : null }
    </div>
  );
}


export default FeedFilter;
