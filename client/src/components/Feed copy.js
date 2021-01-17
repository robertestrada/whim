import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import { baseUrl } from '../config';
import '../styles/feed.css';
import Product from './Product';
import Cart from './Cart';
import FeedFilter from './FeedFilter';
import Banner from './Banner';

const Feed = ({ catShow, tagTerm, setTagTerm, submittedSearchFilters, lastSearchTerm, setLastSearchTerm, 
                pageData, setPageData, allowSearch, setAllowSearch, setModalType, 
                panelType, setPanelType, modalChange, viewSwitch, setViewSwitch, 
                handleRemoveItem, itemHold, setItemHold 
              }) => {
  const { promiseInProgress } = usePromiseTracker();
  const [allowScroll, setAllowScroll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [productsData, setProductsData] = useState({"products": null, "moreData": false});
  
  const [resultsForSearchTerm, setResultsForSearchTerm] = useState(null);
  const categories = ["fashion", "gadgets", "home-decor", "household-supplies", "kitchen", "shoes", "tools", "watches"]
  const ref = useRef(null);
  
  const fetchData = async () => {
    const fetchPoint = { 
                        "popular": `popular/${pageData.page}`, 
                        "express": `express/${pageData.page}`, 
                        "fashion": `category/fashion/${pageData.page}`,
                        "gadgets": `category/gadgets/${pageData.page}`,
                        "home-decor": `category/home-decor/${pageData.page}`,
                        "household-supplies": `category/household-supplies/${pageData.page}`,
                        "kitchen": `category/kitchen/${pageData.page}`,
                        "shoes": `category/shoes/${pageData.page}`,
                        "tools": `category/tools/${pageData.page}`,
                        "watches": `category/watches/${pageData.page}`,
                        "search": `search/${pageData.page}`,
                      };
    let result;
    if (pageData.tab === "search"){
      if (tagTerm === null){
        result = await trackPromise(fetch(`${baseUrl}/product/${fetchPoint[pageData.tab]}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lastSearchTerm),
        }));
      } else {
        result = await trackPromise(fetch(`${baseUrl}/product/${fetchPoint[pageData.tab]}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ "term": tagTerm, 'rating': lastSearchTerm.rating, 'price': lastSearchTerm.price }),
        }));
      }
    } else {
      result = await trackPromise(fetch(`${baseUrl}/product/${fetchPoint[pageData.tab]}`));
    }
    if (result.ok) {
      const resultJSON = await result.json();
      if (pageData.loadMore) {
        setProductsData({ "products": [...productsData.products, ...resultJSON.data], "moreData": resultJSON.more_data });
      }
      else if (!pageData.loadMore) {
        setProductsData({ "products": [...resultJSON.data], "moreData": resultJSON.more_data });
        setLoading(false);
        setFilterLoading(false);
      }
      setAllowScroll(true);
    }
  };

  useEffect(() => {
    if (viewSwitch !== null){
      setPanelType('feed');
      if (pageData.tab !== viewSwitch) {
        setLoading(true);
        setPageData({ "page": 1, "loadMore": false, "tab": viewSwitch });
      }
      setViewSwitch(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewSwitch]);

  useEffect(() => {
    if (pageData.tab !== "search"){
      setResultsForSearchTerm(null);
      setLastSearchTerm({ 'term': '', 'rating': -1, 'price': -1 });
      setTagTerm(null);
    } else if (pageData.tab === "search" && tagTerm !== null){
      setResultsForSearchTerm(tagTerm);
    } else if (pageData.tab === "search"){
      setResultsForSearchTerm(lastSearchTerm.term.trim());
    }
    setPanelType('feed');
    setAllowScroll(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData.tab]);

  useEffect(() => {
    if (allowSearch){
      setLoading(true);
      setAllowSearch(false);
      setResultsForSearchTerm(lastSearchTerm.term.trim());
      setPanelType('feed');
      setAllowScroll(true);
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowSearch]);
  
  useEffect(() => {
    if (pageData.page > 1){
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData.page]);

  useEffect(() => {
    if (tagTerm !== null) {
      setResultsForSearchTerm(tagTerm);
      setFilterLoading(true);
      setPageData({ ...pageData, "page": 1, "loadMore": false });
      fetchData();
    } else {
      setResultsForSearchTerm(lastSearchTerm.term);
      setFilterLoading(true);
      setPageData({ ...pageData, "page": 1, "loadMore": false });
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagTerm]);

  useEffect(() => {
    if (lastSearchTerm.rating !== -1 && lastSearchTerm.term !== ''){
      setFilterLoading(true);
      fetchData();
    } else if (lastSearchTerm.rating === -1 && lastSearchTerm.term !== ''){
      setFilterLoading(true);
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastSearchTerm.rating]);

  useEffect(() => {
    if (lastSearchTerm.price !== -1 && lastSearchTerm.term !== '') {
      setFilterLoading(true);
      fetchData();
    } else if (lastSearchTerm.price === -1 && lastSearchTerm.term !== '') {
      setFilterLoading(true);
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastSearchTerm.price]);

  useEffect(() => {
    
  }, [catShow]);
  
  useLayoutEffect(() => {
    ref.current.scrollTop = 0;
  }, [pageData.tab]);

  useLayoutEffect(() => {
    if (tagTerm !== null) {
      ref.current.scrollTop = 0;
    }
  }, [tagTerm]);

  useLayoutEffect(() => {
    if (lastSearchTerm.rating !== -1) {
      ref.current.scrollTop = 0;
    } else if (lastSearchTerm.rating === -1 && (lastSearchTerm.term !== '' || tagTerm !== null)){
      ref.current.scrollTop = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastSearchTerm.rating]);

  useLayoutEffect(() => {
    if (lastSearchTerm.price !== -1) {
      ref.current.scrollTop = 0;
    } else if (lastSearchTerm.price === -1 && (lastSearchTerm.term !== '' || tagTerm !== null)){
      ref.current.scrollTop = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastSearchTerm.price]);

  const handleScroll = (e) => {
    const target = e.target
    if (allowScroll && ((target.scrollHeight - target.scrollTop - (target.scrollTop / 2) <= target.clientHeight) && productsData.moreData)){
      setAllowScroll(false);
      setPageData({...pageData, "page": pageData.page + 1, "loadMore": true});
    }
    else if (target.scrollHeight - target.scrollTop === target.clientHeight && !productsData.moreData){
      setAllowScroll(false);
      setPageData({ ...pageData, "loadMore": false });
    }
  }


  
  const LoadingIndicator = () => {
    return (
      <div style={{ width: "100%", height: "100", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
        <Loader type="ThreeDots" color="#00b9e9" height={60} width={60} />
        <div className="feed__loader-spacer"></div>
      </div>
    )
  }

  return (
    <div className={panelType === 'feed' ? "feed__scroll-wrapper" : "feed__scroll-wrapper cart-visible"}>
      <div className="feed__scroll" ref={ref} onScroll={handleScroll}>
        { panelType === 'cart'
          ? <Cart setModalType={setModalType} setPanelType={setPanelType} modalChange={modalChange} handleRemoveItem={handleRemoveItem} itemHold={itemHold} setItemHold={setItemHold}/>
          : loading || (((promiseInProgress && !productsData.products) && !pageData.loadMore) || (!productsData.products && !pageData.loadMore))
            ? <div className="feed__loader" >
                <LoadingIndicator/>
              </div>
            : <div className="feed__grid-wrapper">
                { resultsForSearchTerm
                  ? <FeedFilter 
                    setPageData={setPageData} 
                    lastSearchTerm={lastSearchTerm} 
                    setLastSearchTerm={setLastSearchTerm} 
                    tagTerm={tagTerm} 
                    setTagTerm={setTagTerm} 
                    submittedSearchFilters={submittedSearchFilters}/>
                  : null
                }
                { categories.includes(pageData.tab.toLowerCase()) || resultsForSearchTerm
                  ? <div className={pageData.tab === "search" ? "feed__results filters-show" : "feed__results"}>
                      Results for "
                      <span className={ pageData.tab !== "search" ? "feed__results-not-search" : "feed__results-search"}>
                        {resultsForSearchTerm ? resultsForSearchTerm : pageData.tab}
                      </span>"
                    </div>
                  : <div className="feed__no-results">&nbsp;</div>
                }
                { filterLoading
                  ? <div className="feed__filter-loader" >
                      <LoadingIndicator />
                    </div>
                  : <div className={productsData.products.length > 0 ? "feed__grid" : "feed__no-grid-results"}>
                      { productsData.products.length > 0
                        ? productsData.products.map((product, pdx) => <Product key={pdx} pdx={pdx} product={product} modalChange={modalChange} setModalType={setModalType}/>)
                        : "No Products Found."
                      }
                    </div>
                }
              </div>
        }
      </div>
      <Banner setPanelType={setPanelType} />
    </div>
  );
}


export default Feed;
