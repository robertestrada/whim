import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { baseUrl } from '../config';
import '../styles/search.css';

const Search = ({ panelType, setPanelType }) => {
  const [delay, setDelay] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if(!delay){
      if (searchInput !== '') {
        getOptions(searchInput);
        setSearchInput(searchInput);
        setDelay(true);
      } else {
        setSearchInput('');
        setSearchResults(null);
      }
    } else {
      const timeout = setTimeout(() => {
        if(searchInput !== ''){
          getOptions(searchInput);
          setSearchInput(searchInput);
        } else {
          setSearchInput('');
          setSearchResults(null);
        }
        setDelay(false);
      }, 200);
      return () => clearTimeout(timeout);
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
        console.log(responseJSON.data);
        setSearchResults(responseJSON.data);
      }
  };

  const getResults = async (searchInput, page) => {
    const response = await fetch(`${baseUrl}/product/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ searchInput, page }),
    });
    if (response.ok) {
      const responseJSON = await response.json();
      console.log(responseJSON.data);
      setSearchResults(responseJSON.data);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    getResults(searchInput, 1);
  };

  return (
    <div className="search__wrapper">
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
          <form className="search__form" onSubmit={handleSearchSubmit}>
            <input value={searchInput} onChange={e => setSearchInput(e.target.value)} maxLength="100" type="text" placeholder="What do you want to find?" className="search__input" />
          </form>
        </div>
        { searchResults !== null
          ? <div className={searchResults ? "search__suggestions" : "search__suggestions hide-suggestions"}>
              {searchResults.map((result, idx) => <div key={idx} className="search__suggestion">{result[1]}</div>)}
            </div>
          : null
        }
      </div>
      <div className="search__button">Search</div>
    </div>
  );
}
export default Search;
