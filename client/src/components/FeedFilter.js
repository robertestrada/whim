import React, { useEffect, useState, useRef } from 'react';
import '../styles/feedFilter.css';


const FeedFilter = ({ submittedSearchFilters }) => {
  const [filterSize, setFilterSize] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [renderedFilters, setRenderedFilters] = useState(submittedSearchFilters.slice(0, 1));
  const filterWidth = useRef(null);

  const getWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", getWindowWidth);
    return () => window.removeEventListener("resize", getWindowWidth);
  }, []);

  useEffect(() => {
    if (filterWidth.current && filterSize < submittedSearchFilters.length && filterWidth.current.offsetWidth + 100 < windowWidth){
      setFilterSize(filterSize + 1);
    }
  }, [windowWidth]);

  useEffect(() => {
    setRenderedFilters(submittedSearchFilters.slice(0, filterSize));
  }, [filterSize]);



  const handleClick = () => {

  }

  if (filterWidth.current){
    console.log("filterWidth: ", filterWidth.current.offsetWidth);
    console.log("windowWidth: ", windowWidth)
    console.log("filterSize: ", filterSize);
  }

  return (
    <div className="filter" ref={filterWidth}>
      { renderedFilters ? renderedFilters.map((filter, idx) => <div key={idx} onClick={idx => handleClick(idx)} className="filter__tag">{filter[1]}</div>) : null }
    </div>
  );
}


export default FeedFilter;
