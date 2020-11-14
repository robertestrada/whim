import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { baseUrl } from '../config';
import '../styles/search.css';

const Search = ({ panelType, setPanelType }) => {
  const [delay, setDelay] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [autoInput, setAutoInput] = useState(null);
  const [showAutoInput, setShowAutoInput] = useState(true);
  const [searchSuggestions, setSearchSuggestions] = useState(null);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [listTarget, setListTarget] = useState(null);
  const [allowListNavigation, setAllowListNavigation] = useState(true);

  const [searchResults, setSearchResults] = useState(null);

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
      if (searchInput !== '') {
        getOptions(searchInput);
        setSearchInput(searchInput);
        setDelay(true);
      } else {
        setSearchInput('');
        setSearchSuggestions(null);
        setAutoInput(null);
      }
    } else {
      const timeout = setTimeout(() => {
        if(searchInput !== ''){
          getOptions(searchInput);
          setSearchInput(searchInput);
        } else {
          setSearchInput('');
          setSearchSuggestions(null);
          setAutoInput(null);
        }
        setDelay(false);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [searchInput]);

  useEffect(() => {
    if (autoInput && !autoInput.startsWith(searchInput)){
      setAutoInput(null);
    }
    console.log('searchSuggestions:', searchSuggestions);
    if (searchSuggestions !== null){
      for (let i = 0; i < searchSuggestions.length; i++){
        const searchResult = searchSuggestions[i][1];
        if (searchResult.startsWith(searchInput)){
          const newSearchSuggestions = searchSuggestions.filter(result => result[1].startsWith(searchInput));
          setSearchSuggestions(newSearchSuggestions);
          setAutoInput(searchResult);
          break;
        }
      }
    }
  }, [searchInput]);

  const getOptions = async (input) => {
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
          setSearchSuggestions(['Try different search terms!']);
          setAutoInput(null);
          setShowSearchSuggestions(true);
        }
      }
  };

  const getResults = async (input, page) => {
    const response = await fetch(`${baseUrl}/product/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input, page }),
    });
    if (response.ok) {
      const responseJSON = await response.json();
      setSearchResults(responseJSON.data);
    }
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    if (searchSuggestions && searchSuggestions[0] === 'Try different search terms!'){
      setSubmitError(true);
    } else if (searchSuggestions === null){
      setSubmitError(true);
    } else if (searchSuggestions){
      getResults(searchInput, 1);
      setAutoInput(null);
      setShowSearchSuggestions(false);
      e.target.blur();
    }
  };

  const handleSearchSuggestionSubmit = suggestion => {
    if (suggestion !== 'Try different search terms!') {
      getResults(suggestion, 1);
      setSearchInput(suggestion);
      setShowSearchSuggestions(false);
    }
  };

  const handleTabOrEnterPress = e => {
    if (e.keyCode === 9){
      e.preventDefault();
      setSearchInput(autoInput);
    }
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSearchSubmit(e);
    }
    if (allowListNavigation && searchSuggestions && showSearchSuggestions && e.keyCode === 38 && listTarget > 0){
      e.preventDefault();
      setListTarget(listTarget - 1);
      setAutoInput(searchSuggestions[listTarget - 1][1]);
    } else if (allowListNavigation && searchSuggestions && showSearchSuggestions && e.keyCode === 40 && listTarget < searchSuggestions.length - 1){
      e.preventDefault();
      if (listTarget === null){
        setListTarget(0);
      } else {
        setListTarget(listTarget + 1);
      }
      setAutoInput(searchSuggestions[listTarget + 1][1]);
    } else if (!allowListNavigation && (e.keyCode === 38 || e.keyCode === 40)){
      e.preventDefault();
    } else if (allowListNavigation && searchSuggestions && showSearchSuggestions && e.keyCode === 38 && listTarget === 0) {
      e.preventDefault();
      setListTarget(null);
      setAutoInput(searchSuggestions[0][1]);
    }
  }

  const handleSuggestionMouseEnter = (suggestion, idx) => {
    setAllowListNavigation(false);
    setAutoInput(suggestion);
    setListTarget(idx);
  }

  const handleInputClick = e => {
    e.preventDefault();
    setListTarget(null);
    if (searchSuggestions){
      setAutoInput(searchSuggestions[0][1]);
    }
    setAllowListNavigation(true);
    setShowSearchSuggestions(true);
  }

  if (searchResults){
    searchResults.forEach(result => {
      console.log(result.name);
    });
  }

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
            <input value={searchInput} onKeyDown={handleTabOrEnterPress} onClick={handleInputClick} onChange={e => setSearchInput(e.target.value)} maxLength="24" type="text" placeholder="What do you want to find?" className="search__input" />
            <div className="search__text">
              <div className="search__input-text" >{searchInput}</div>
              { showAutoInput && searchInput && autoInput ? <div className="search__input-suggestion" >{autoInput.slice(searchInput.length)}</div> : null }
            </div>
          </form>
        </div>
        { searchInput && showSearchSuggestions && searchSuggestions !== null && searchSuggestions[0] !== 'Try different search terms!'
          ? <div className={searchSuggestions ? "search__suggestions" : "search__suggestions hide-suggestions"} >
            {searchSuggestions.map((result, idx) => <div key={idx} onClick={() => handleSearchSuggestionSubmit(result[1])} onMouseEnter={() => handleSuggestionMouseEnter(result[1], idx)} className={ listTarget === idx ? "search__suggestion suggestion-highlight" : "search__suggestion"}>{result[1]}</div>)}
            </div>
          : searchInput && showSearchSuggestions && searchSuggestions !== null && searchSuggestions[0] === 'Try different search terms!'
            ? <div className={searchSuggestions ? "search__suggestions" : "search__suggestions hide-suggestions"}>
                <div className="search__suggestion no-search-result">'Try different search terms!'</div>
              </div>
            : null
        }
      </div>
      <div ref={nodeSearchButton} className={submitError ? "search__button no-search-allowed" : 'search__button'} onClick={handleSearchSubmit}>Search</div>
    </div>
  );
}
export default Search;
