import React, { useState, useEffect, useRef } from 'react';
import { baseUrl } from '../config';
import '../styles/search.css';

const Search = ({ setPageData, setViewSwitch, setAllowSearch, searchTerm, setSearchTerm }) => {
  const [delay, setDelay] = useState(false);
  const [autoInput, setAutoInput] = useState(null);
  const [searchSuggestions, setSearchSuggestions] = useState(null);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [listTarget, setListTarget] = useState(null);
  const [allowListNavigation, setAllowListNavigation] = useState(true);
  const [lastSearchTerm, setLastSearchTerm] = useState('');
  const nodeSearchWrapper = useRef();
  const nodeSearchButton = useRef();

  const handleClickOffSearchWrapper = e => {
    if (nodeSearchWrapper.current.contains(e.target)) {
      return;
    }
    setShowSearchSuggestions(false);
    setAutoInput(null);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOffSearchWrapper);
    return () => {
      document.removeEventListener("mousedown", handleClickOffSearchWrapper)
    }
  }, []);

  const handleClickOffSearchButton = e => {
    if (nodeSearchButton.current.contains(e.target)) {
      return;
    }
    setSubmitError(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOffSearchButton);
    return () => {
      document.removeEventListener("mousedown", handleClickOffSearchButton)
    }
  }, []);

  useEffect(() => {
    if(!delay){
      if (searchTerm){
        getOptions(searchTerm);
        setDelay(true);
      }
    } else {
      const timeout = setTimeout(() => {
        if (searchTerm){
          getOptions(searchTerm);
          setDelay(false);
        }
      }, 200);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm && searchTerm.length > 1){
      setSubmitError(false);
    }
    if (autoInput && !autoInput.startsWith(searchTerm)){
      setAutoInput(null);
    }
    if (searchSuggestions !== null){
      for (let i = 0; i < searchSuggestions.length; i++){
        const searchResult = searchSuggestions[i][1];
        if (searchResult.startsWith(searchTerm) && searchTerm.split(' ').length > 1){
          const newSearchSuggestions = searchSuggestions.filter(result => result[1].startsWith(searchTerm));
          setSearchSuggestions(newSearchSuggestions);
          setAutoInput(searchResult);
          return;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const getOptions = async input => {
      const response = await fetch(`${baseUrl}/product/search/options`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });
      if (response.ok) {
        const responseJSON = await response.json();
        if (responseJSON.data.length !== 0){
          if (responseJSON.data[0][1].startsWith(input.toLowerCase())){
            setSearchSuggestions(responseJSON.data);
            setAutoInput(responseJSON.data[0][1]);
            setShowSearchSuggestions(true);
          }
        } else {
          setAutoInput(null);
          setShowSearchSuggestions(true);
        }
      }
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    if (searchSuggestions === null || searchTerm === ''){
      setSubmitError(true);
    } else if (searchSuggestions){
      if (searchTerm.length === 1){
        setSubmitError(true);
      } else if (searchTerm.length > 1 && lastSearchTerm !== searchTerm){
        setLastSearchTerm(searchTerm);
        setPageData({ "page": 1, "loadMore": false, "tab": "search" });
        setAllowSearch(true);
        setViewSwitch("search");
        setAutoInput(null);
        setShowSearchSuggestions(false);
        e.target.blur();
      }
    }
  };

  const handleSearchSuggestionSubmit = suggestion => {
    if (lastSearchTerm !== suggestion){
      setLastSearchTerm(suggestion);
      setPageData({ "page": 1, "loadMore": false, "tab": "search" });
      setAllowSearch(true);
      setViewSwitch("search");
      setSearchTerm(suggestion);
      setShowSearchSuggestions(false);
    }
  };

  const handleTabOrEnterPress = e => {
    if ((e.keyCode === 9 || (e.keyCode === 39 && e.target.selectionEnd === e.target.value.length)) && autoInput !== null && autoInput.startsWith(searchTerm)){
      e.preventDefault();
      setSearchTerm(autoInput);
    }
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSearchSubmit(e);
    }
    if (allowListNavigation && searchSuggestions && showSearchSuggestions && e.keyCode === 38 && listTarget !== null && listTarget > 0){
      e.preventDefault();
      setListTarget(listTarget - 1);
      setAutoInput(searchSuggestions[listTarget - 1][1]);
    } else if (allowListNavigation && searchSuggestions && showSearchSuggestions && e.keyCode === 40 && listTarget !== null && listTarget < searchSuggestions.length - 1){
      e.preventDefault();
      setListTarget(listTarget + 1);
      setAutoInput(searchSuggestions[listTarget + 1][1]);
    } else if (!allowListNavigation && (e.keyCode === 38 || e.keyCode === 40)){
      e.preventDefault();
    } else if (allowListNavigation && searchSuggestions && showSearchSuggestions && e.keyCode === 38 && listTarget === 0) {
      e.preventDefault();
      setListTarget(null);
      setAutoInput(searchSuggestions[0][1]);
    } else if (allowListNavigation && searchSuggestions && showSearchSuggestions && e.keyCode === 40 && listTarget === null) {
      e.preventDefault();
      setListTarget(0);
      setAutoInput(searchSuggestions[0][1]);
    } else if (allowListNavigation && searchSuggestions && showSearchSuggestions && e.keyCode === 38 && listTarget === null) {
      e.preventDefault();
      setListTarget(null);
      setAutoInput(searchSuggestions[0][1]);
    }
  };

  const handleSuggestionMouseEnter = (suggestion, idx) => {
    if (suggestion.startsWith(searchTerm.toLowerCase())){
      setAllowListNavigation(false);
      setAutoInput(suggestion);
      setListTarget(idx);
    }
  };

  const handleInputClick = e => {
    e.preventDefault();
    setSubmitError(false);
    setListTarget(null);
    if (searchSuggestions){
      setAutoInput(searchSuggestions[0][1]);
    }
    setAllowListNavigation(true);
    setShowSearchSuggestions(true);
  };


  return (
    <div className="search__wrapper" ref={nodeSearchWrapper}>
      <div className="search__bar">
        <div className="search__input-wrapper">
          <div className="search__icon-wrapper">
            <div className="search__svg-wrapper">
              <svg viewBox="0 0 24 24">
                <g fill="none" fillRule="evenodd">
                  <path fill="#000" fillRule="nonzero" stroke="#000" d="M22.78 21.7533333L15.8866667 14.86c1.2222222-1.4666667 1.98-3.3488889 1.98-5.42666667C17.8666667 4.78888889 14.0777778 1 9.43333333 1 4.78888889 1 1 4.78888889 1 9.43333333c0 4.64444447 3.78888889 8.43333337 8.43333333 8.43333337 2.05333337 0 3.95999997-.7333334 5.42666667-1.98L21.7533333 22.78c.2933334.2933333.7577778.2933333 1.0266667 0 .2933333-.2933333.2933333-.7333333 0-1.0266667zm-13.34666667-4.62c-4.24175438 0-7.7-3.4582456-7.7-7.69999997 0-4.24175438 3.45824562-7.7 7.7-7.7 4.24175437 0 7.69999997 3.45824562 7.69999997 7.7 0 4.24175437-3.4582456 7.69999997-7.69999997 7.69999997z"></path>
                  <path d="M0 0h24v24H0z"></path>
                </g>
              </svg>
            </div>
          </div>
          <form className="search__form">
            <input value={searchTerm} onKeyDown={e => handleTabOrEnterPress(e)} onClick={handleInputClick} onChange={e => setSearchTerm(e.target.value.trimLeft())} maxLength="24" type="text" placeholder="What do you want to find?" className="search__input" />
            <div className="search__text">
              <div className="search__input-text" >{searchTerm}</div>
              { searchTerm && autoInput ? <div className="search__input-suggestion" >{autoInput.slice(searchTerm.length)}</div> : null }
            </div>
          </form>
        </div>
        { searchTerm && showSearchSuggestions && searchSuggestions !== null
          ? <div className={searchSuggestions ? "search__suggestions" : "search__suggestions hide-suggestions"} >
            {searchSuggestions.map((result, idx) => <div key={idx} onClick={() => handleSearchSuggestionSubmit(result[1])} onMouseEnter={() => handleSuggestionMouseEnter(result[1], idx)} className={ listTarget === idx ? "search__suggestion suggestion-highlight" : "search__suggestion"}>{result[1]}</div>)}
            </div>
          : null
        }
      </div>
      <div ref={nodeSearchButton} className={submitError ? "search__button no-search-allowed" : 'search__button'} onClick={handleSearchSubmit}>Search</div>
    </div>
  );
}
export default Search;
