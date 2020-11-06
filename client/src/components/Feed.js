import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import { baseUrl } from '../config';
import '../styles/feed.css';
import Product from './Product';
import Cart from './Cart';
import FeedTabs from './FeedTabs';
import CategoryPanel from './CategoryPanel';

const Feed = ({ setModalType, panelType, setPanelType, modalChange, handleTabChange, viewSwitch, setViewSwitch, handleRemoveItem, itemHold, setItemHold }) => {
  const { promiseInProgress } = usePromiseTracker();
  const initialPageData = { "page": 1, "loadMore": false, "tab": "popular"};
  const [pageData, setPageData] = useState(initialPageData);
  const [allowScroll, setAllowScroll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState({"products": null, "moreData": false});
  const [catShow, setCatShow] = useState(false);
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
                      };
    const result = await trackPromise(fetch(`${baseUrl}/product/${fetchPoint[pageData.tab]}`));
    if (result.ok) {
      const resultJSON = await result.json();
      if (pageData.loadMore) {
        setProductsData({ "products": [...productsData.products, ...resultJSON.data], "moreData": resultJSON.more_data });
      }
      else if (!pageData.loadMore) {
        setProductsData({ "products": [...resultJSON.data], "moreData": resultJSON.more_data });
        setLoading(false);
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
    setPanelType('feed');
    setAllowScroll(true);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData.tab]);
  
  useEffect(() => {
    if (pageData.page > 1){
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData.page]);

  useEffect(() => {

    
  }, [catShow]);
  
  useLayoutEffect(() => {
      ref.current.scrollTop = 0;
  }, [pageData.tab]);

  const handleScroll = (e) => {
    const target = e.target
    if (allowScroll && ((target.scrollHeight - target.scrollTop - (target.scrollTop / 2) <= target.clientHeight) && productsData.moreData)) {
      setAllowScroll(false);
      setPageData({...pageData, "page": pageData.page + 1, "loadMore": true});
    }
    else if (target.scrollHeight - target.scrollTop === target.clientHeight && !productsData.moreData) {
      setAllowScroll(false);
      setPageData({ ...pageData, "loadMore": false });
    }
  }

  const handleCategoryClick = () => {
    if(catShow){
      setCatShow(false);
    } else {
      setCatShow(true);
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
    <div className="feed">
      <div className="feed__logo-button" onClick={() => handleTabChange('popular')}/>
      <FeedTabs pageData={pageData} handleTabChange={handleTabChange} setCatShow={setCatShow} handleCategoryClick={handleCategoryClick}/>
      <CategoryPanel catShow={catShow} mouseEnter={() => setCatShow(true)} mouseLeave={() => setCatShow(false)} categoryFetch={handleTabChange} />
      <div className={panelType === 'feed' ? "feed__scroll-wrapper" : "feed__scroll-wrapper cart-visible"}>
        <div className="feed__scroll" ref={ref} onScroll={handleScroll}>
          { panelType === 'cart'
            ? <Cart setModalType={setModalType} setPanelType={setPanelType} modalChange={modalChange} handleRemoveItem={handleRemoveItem} itemHold={itemHold} setItemHold={setItemHold}/>
            : loading || (((promiseInProgress && !productsData.products) && !pageData.loadMore) || (!productsData.products && !pageData.loadMore))
              ? <div className="feed__loader" >
                  <LoadingIndicator/>
                </div>
              : <div className="feed__grid-wrapper">
                  {categories.includes(pageData.tab.toLowerCase())
                    ? <div className="feed__results">Results for "<span className="feed__results-search">{pageData.tab}</span>"</div>
                    : <div className="feed__no-results">&nbsp;</div>
                  }
                  <div className="feed__grid">
                    {productsData.products.map((product, pdx) => <Product key={pdx} pdx={pdx} product={product} modalChange={modalChange} setModalType={setModalType}/>)}
                  </div>
                </div>
          }
        </div>
      </div>
    </div>
  );
}


export default Feed;
