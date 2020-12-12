import React, { useEffect } from 'react';
import '../styles/feedFilter.css';


const FeedFilterButton = ({ searchTerm, handleButtonOpen }) => {
  const filterCount = Object.entries(searchTerm).reduce((count, entry) => entry[0] !== 'term' && entry[1] !== -1 ? count += 1 : count, 0);
  useEffect(() => {}, [searchTerm.rating, searchTerm.price]);
  

  return (
    <div className="filter__button-wrapper">
      <div className="filter__button-icon" onClick={() => handleButtonOpen()}>
        <svg className="filter__button-icon-svg" viewBox="0 0 40 40">
          <g fill="none" fillRule="evenodd">
            <circle cx="20" cy="20" r="20" fill="#2fb7ec" fillRule="nonzero"></circle>
            <g fill="#FFF" transform="translate(11 11.5)">
              <path d="M0 1.436h18v1.8H0zm0 6h18v1.8H0zm.9 6H18v.932c0 .48-.389.868-.868.868H.9a.9.9 0 1 1 0-1.8z"></path>
              <circle cx="5.018" cy="2.318" r="2.318"></circle>
              <circle cx="5.006" cy="14.33" r="2.272"></circle>
              <circle cx="12.999" cy="8.237" r="2.193"></circle>
              <circle cx="5" cy="2.336" r="1"></circle>
              <circle cx="13" cy="8.236" r="1"></circle>
              <circle cx="5" cy="14.336" r="1"></circle>
            </g>
          </g>
        </svg>
        <div className="filter__button-count">{filterCount > 0 ? `Filter (${filterCount})` : 'Filter'}</div>
      </div>
    </div>
  );
}


export default FeedFilterButton;
