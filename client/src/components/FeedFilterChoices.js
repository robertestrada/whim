import React, { useEffect, useState } from 'react';
import '../styles/feedFilter.css';


const FeedFilterChoices = ({ showFilterChoices, handleButtonClose, handleClearAll }) => {

  useEffect(() => {

  }, []);

  return (
    <div className={ showFilterChoices ? "filter__choices-wrapper" : "filter__choices-wrapper hide-choices"}>
      
      <div className="filter__choices-close-wrapper">
        <div className="filter__choices-close-button" onClick={() => handleButtonClose()}>Close</div>
        <div className="filter__choices-clear-all" onClick={() => handleClearAll()}>Clear All</div>
      </div>
    </div>
  );
}


export default FeedFilterChoices;
