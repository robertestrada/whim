import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { usePromiseTracker, trackPromise } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';
import { baseUrl } from '../config';
import { useSelector } from 'react-redux';
import '../styles/feed.css';
import Product from './Product';

const Feed = () => {
  const currentUserId = useSelector(state => state.authentication.user.id)
  const { promiseInProgress } = usePromiseTracker();
  const initialPageData = { "page": 1, "loadMore": false, "tab": "public"};
  const [pageData, setPageData] = useState(initialPageData);
  const [allowScroll, setAllowScroll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState({"products": null, "moreData": false})
  const ref = useRef(null);
  
  const fetchData = async () => {
    const fetchPoint = { "public": `public/${pageData.page}`, "friends": `${currentUserId}/friends/${pageData.page}`, "mine": `${currentUserId}/${pageData.page}` };
    const result = await trackPromise(fetch(`${baseUrl}/Product/${fetchPoint[pageData.tab]}`));
    if (result.ok) {
      const resultJSON = await result.json();
      if (pageData.loadMore) {
        setProductsData({ "products": [...productsData.Products, ...resultJSON.data], "moreData": resultJSON.more_data });
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
    e.stopPropagation();
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
    setLoading(true);
    setPageData({ "page": 1, "loadMore": false, "tab": newTab })
  }
  
  const LoadingIndicator = () => {
    return (
      <div style={{ width: "100%", height: "100", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Loader type="ThreeDots" color="#adccf7" height={50} width={50} />
      </div>
    )
  }

  return (
    <div className="feed">
      <div className="feed__tabs">
        <button className={pageData.tab === "public" ? "pressed" : ""} onClick={() => handleTabChange("public")}>PUBLIC</button>
        <button className={pageData.tab === "friends" ? "pressed" : ""} onClick={() => handleTabChange("friends")}>FRIENDS</button>
        <button className={pageData.tab === "mine" ? "pressed" : ""} onClick={() => handleTabChange("mine")}>MINE</button>
      </div>
      <div className="feed__scroll" ref={ref} onScroll={handleScroll}>
        {
          loading || (((promiseInProgress && !productsData.products) && !pageData.loadMore) || (!productsData.products && !pageData.loadMore))
          ? <LoadingIndicator/> 
          : 
          productsData.products.map((product, pdx) => <Product 
            key={pdx} 
            pdx={pdx}
            product={product} 
          />)
        }
      </div>
    </div>
  );
}

export default Feed;
