import React, { useEffect, useState } from 'react';
import '../styles/feedFilter.css';


const FeedFilter = ({ setTagTerm, submittedSearchFilters }) => {
  const [filterSize, setFilterSize] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const getWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", getWindowWidth);
    return () => window.removeEventListener("resize", getWindowWidth);
  }, []);

  useEffect(() => {
    
  }, []);

  useEffect(() => {
    let filterCount = 0;
    let totalTagsSize = 0;
    for (let i = 0; i < submittedSearchFilters.length; i++){
      const tagSize = (submittedSearchFilters[i][1].length * 8) + 24 + 16;
      if ((totalTagsSize + tagSize) < (windowWidth - 250 - 115 - 140)){
        totalTagsSize += tagSize;
        filterCount += 1;
      }
    }
    setFilterSize(filterCount);
  }, [windowWidth]);

  const handleTagClick = i => {
    console.log(submittedSearchFilters[i][1]);
    setTagTerm(submittedSearchFilters[i][1]);
  };

  return (
    <div className="filter__wrapper">
      <div className="filter__tags">
        {filterSize > 0 ? submittedSearchFilters.map((filter, idx) => filterSize > idx ? <div key={idx} onClick={() => handleTagClick(idx)} className="filter__tag">{filter[1]}</div> : null) : null }
      </div>
    </div>
  );
}


export default FeedFilter;
