import React from 'react';
import '../styles/feedFilter.css';


const FeedFilterRating = ({ idx, setPageData, searchTerm, setSearchTerm }) => {

  const handleRadioClick = () => {
    setPageData({ "page": 1, "loadMore": false, "tab": "search" });
    setSearchTerm({ ...searchTerm, 'rating': idx });
  };

  return (
    <div key={idx} className="filter__rating-option" onClick={() => handleRadioClick()}>
      <div className={ searchTerm.rating === idx ? "filter__rating-radio radio-selected" : "filter__rating-radio" }>
        <div className={ searchTerm.rating === idx ? "filter__rating-dot dot-selected" : "filter__rating-dot" }></div>
      </div>
      <div className="filter__stars-wrapper">
        { [...Array(idx)].map((star, sdx) => {
            return (<svg key={sdx} className="filter__star" viewBox="0 0 14 13" >
                      <path d="M3.142 11.886c-.55.28-.91.027-.806-.567l.642-3.617L.26 5.14c-.445-.42-.307-.83.308-.917l3.754-.528L6.002.405c.275-.54.72-.54.996 0l1.679 3.29 3.754.528c.615.087.754.497.307.917l-2.716 2.562.642 3.617c.105.594-.256.847-.806.567L6.5 10.178l-3.358 1.708z" fill="#2fb7ec"></path>
                    </svg>)
        }) }
      </div>
        &nbsp;& Up
    </div>
  );
}


export default FeedFilterRating;