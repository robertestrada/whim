import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import { baseUrl } from '../config';
import '../styles/feed.css';
import Product from './Product';
import FeedTabs from './FeedTabs';
import CategoryPanel from './CategoryPanel';

const Feed = ({ modalChange }) => {
  const { promiseInProgress } = usePromiseTracker();
  const initialPageData = { "page": 1, "loadMore": false, "tab": "popular"};
  const [pageData, setPageData] = useState(initialPageData);
  const [allowScroll, setAllowScroll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState({"products": null, "moreData": false});
  const [catShow, setCatShow] = useState(false);
  const [panelType, setPanelType] = useState('feed');
  const categories = ["clothing", "outdoor", "technology"]
  const ref = useRef(null);
  
  const fetchData = async () => {
    const fetchPoint = { 
                      "popular": `popular/${pageData.page}`, 
                      "express": `express/${pageData.page}`, 
                      "Outdoor": `category/outdoor/${pageData.page}`,
                      "Technology": `category/technology/${pageData.page}`,
                      "Clothing": `category/clothing/${pageData.page}`,
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
  
  
  useLayoutEffect(() => {
      ref.current.scrollTop = 0;
  }, [pageData.tab]);

  const handleScroll = (e) => {
    // e.stopPropagation();
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

  const handleTabChange = (newTab) => {
    if (pageData.tab !== newTab){
      setLoading(true);
      setPageData({ "page": 1, "loadMore": false, "tab": newTab });
    }
  }
  
  const LoadingIndicator = () => {
    return (
      <div style={{ width: "100%", height: "100", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Loader type="ThreeDots" color="#00b9e9" height={60} width={60} />
      </div>
    )
  }

  return (
    <div className="feed">
      <FeedTabs pageData={pageData} handleTabChange={handleTabChange} setCatShow={setCatShow}/>
      <CategoryPanel catShow={catShow} mouseEnter={() => setCatShow(true)} mouseLeave={() => setCatShow(false)} categoryFetch={handleTabChange}/>
      <div className="feed__scroll-wrapper">
        <div className="feed__scroll" ref={ref} onScroll={handleScroll}>
          { loading || (((promiseInProgress && !productsData.products) && !pageData.loadMore) || (!productsData.products && !pageData.loadMore))
            ? <div className="feed__loader" >
                <LoadingIndicator/>
              </div>
            : 
              <div className="feed__grid-wrapper">
                {categories.includes(pageData.tab.toLowerCase())
                  ? <div className="feed__results">Results for "<span className="feed__results-search">{pageData.tab}</span>"</div>
                  : <div className="feed__no-results">&nbsp;</div>
                }
                <div className="feed__grid">
                  {productsData.products.map((product, pdx) => <Product key={pdx} pdx={pdx} product={product} modalChange={modalChange}/>)}
                </div>
              </div>
          }
        </div>
      </div>
    </div>
  );
}


export default Feed;
