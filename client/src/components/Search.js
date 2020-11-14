import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { baseUrl } from '../config';
import '../styles/search.css';

const Search = ({ panelType, setPanelType }) => {
  const [delay, setDelay] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [autoInput, setAutoInput] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const node = useRef();

  const handleClickOff = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    setShowSearchResults(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOff);
    return () => {
      document.removeEventListener("mousedown", handleClickOff)
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
        setSearchResults(null);
        setAutoInput(null);
      }
    } else {
      const timeout = setTimeout(() => {
        if(searchInput !== ''){
          getOptions(searchInput);
          setSearchInput(searchInput);
        } else {
          setSearchInput('');
          setSearchResults(null);
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
    if (searchResults !== null){
      for (let i = 0; i < searchResults.length; i++){
        const searchResult = searchResults[i][1];
        if (searchResult.startsWith(searchInput)){
          const newSearchResults = searchResults.filter(result => result[1].startsWith(searchInput));
          setSearchResults(newSearchResults);
          setAutoInput(searchResult);
          return;
        }
      }
    }
  }, [searchInput]);

  const getOptions = async (searchInput) => {
    console.log("searchInput:", searchInput);
      const response = await fetch(`${baseUrl}/product/search/options`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchInput }),
      });
      if (response.ok) {
        const responseJSON = await response.json();
        if (responseJSON.data.length !== 0){
          if (responseJSON.data[0][1].startsWith(searchInput.toLowerCase())){
            setSearchResults(responseJSON.data);
            setAutoInput(responseJSON.data[0][1]);
            setShowSearchResults(true);
          }
        }
      }
  };

  const getResults = async (autoInput, page) => {
    const response = await fetch(`${baseUrl}/product/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ autoInput, page }),
    });
    if (response.ok) {
      const responseJSON = await response.json();
      setSearchResults(responseJSON.data);
      setAutoInput(responseJSON.data[0][1]);
    }
  };

  const handleSearchSubmit = () => {
    if (autoInput !== null && searchInput !== ''){
      if (autoInput.length >= searchInput.length){

        getResults(autoInput, 1);
        setSearchInput('');
        setSearchResults(null);
        setAutoInput(null);
        setShowSearchResults(false);
      }
    } else if (autoInput === null && searchInput !== ''){
      getResults(searchInput, 1);
      setSearchInput('');
      setSearchResults(null);
      setAutoInput(null);
      setShowSearchResults(false);
    }
  };


  return (
    <div className="search__wrapper" ref={node}>
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
          <form className="search__form" onSubmit={() => handleSearchSubmit()}>
            <input value={searchInput} onClick={() => setShowSearchResults(true)} onChange={e => setSearchInput(e.target.value)} maxLength="24" type="text" placeholder="What do you want to find?" className="search__input" />
            <div className="search__text">
              <div className="search__input-text" >{searchInput}</div>
              { searchInput && autoInput ? <div className="search__input-suggestion" >{autoInput.slice(searchInput.length)}</div> : null }
            </div>
          </form>
        </div>
        {searchInput && showSearchResults && searchResults !== null
          ? <div className={searchResults ? "search__suggestions" : "search__suggestions hide-suggestions"}>
            {searchResults.map((result, idx) => <div key={idx} onClick={() => handleSearchSubmit()} onMouseEnter={() => setAutoInput(result[1])} className="search__suggestion">{result[1]}</div>)}
            </div>
          : null
        }
      </div>
      <div className="search__button" onClick={() => handleSearchSubmit()}>Search</div>
    </div>
  );
}
export default Search;
