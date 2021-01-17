import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCart, removeCartItem } from '../actions/cart';
import NavBar from './NavBar';
import Feed from './Feed';
import SideBanner from './SideBanner';
import FeedTabs from './FeedTabs';
import CategoryPanel from './CategoryPanel';
import Modal from './Modal';
import '../styles/dashboard.css';


const DashBoard = ({ panelType, setPanelType }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.authentication.user);
    const [modalData, setModalData] = useState({ "productId": null, "showModal": false });
    const [modalType, setModalType] = useState('hidden');
    const [viewSwitchHold, setViewSwitchHold] = useState(null);
    const [viewSwitch, setViewSwitch] = useState(null);
    const [itemIdHold, setItemIdHold] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [allowScroll, setAllowScroll] = useState(false);
    const [tagTerm, setTagTerm] = useState(null);
    const [lastSearchTerm, setLastSearchTerm] = useState({ 'term': '', 'rating': -1, 'price': -1 });
    const initialPageData = { "page": 1, "loadMore": false, "tab": "popular" };
    const [pageData, setPageData] = useState(initialPageData);
    const [productsData, setProductsData] = useState({ "products": null, "moreData": false });
    const [submittedSearchFilters, setSubmittedSearchFilters] = useState(null);
    const [allowSearch, setAllowSearch] = useState(false);
    const [catShow, setCatShow] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);


    useEffect(() => {
        if (currentUser){
            dispatch(loadCart(currentUser.id));
        }
    }, [dispatch, currentUser]);

    const handleScroll = () => {
        setScrollPosition(window.scrollY);
        if (allowScroll && ((document.body.scrollHeight - window.scrollY - (window.scrollY / 2) <= window.innerHeight) && productsData.moreData)) {
            setAllowScroll(false);
            setPageData({ ...pageData, "page": pageData.page + 1, "loadMore": true });
        }
        else if (document.body.scrollHeight - window.scrollY === window.innerHeight && !productsData.moreData) {
            setAllowScroll(false);
            setPageData({ ...pageData, "loadMore": false });
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [scrollPosition]);

    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [pageData.tab]);

    // useEffect(() => {
    //     if (tagTerm !== null) {
    //         window.scrollTo(0, 0);
    //     }
    // }, [tagTerm]);

    // useEffect(() => {
    //     if (lastSearchTerm.rating !== -1) {
    //         window.scrollTo(0, 0);
    //     } else if (lastSearchTerm.rating === -1 && (lastSearchTerm.term !== '' || tagTerm !== null)) {
    //         window.scrollTo(0, 0);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [lastSearchTerm.rating]);

    // useEffect(() => {
    //     if (lastSearchTerm.price !== -1) {
    //         window.scrollTo(0, 0);
    //     } else if (lastSearchTerm.price === -1 && (lastSearchTerm.term !== '' || tagTerm !== null)) {
    //         window.scrollTo(0, 0);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [lastSearchTerm.price]);


    const handleModalChange = ({ productId, showModal }) => {
        setModalData({ "productId": productId, "showModal": showModal })
    }

    const handleRemoveItem = (itemId) => {
        setItemIdHold(itemId);
        setModalData({ "productId": null, "showModal": true });
        setModalType('removeItem');
    };

    const handleRemoveItemNo = () => {
        setItemIdHold(null);
        setModalData({ "productId": null, "showModal": false });
        setModalType('hidden'); 
    }

    const handleRemoveItemYes = () => {
        if (itemIdHold !== null){
            dispatch(removeCartItem(itemIdHold));
            setItemIdHold(null);
            setModalData({ "productId": null, "showModal": false });
            setModalType('hidden');
        }
    }

    const handleTabChange = newTab => {
        if (panelType === 'cart'){
            setViewSwitchHold(newTab);
            setModalData({ "productId": null, "showModal": true });
            setModalType('leaveCart');
        } else {
            setPanelType('feed');
            setViewSwitch(newTab);
        }
    }

    const handleTabChangeNo = () => {
        setViewSwitchHold(null);
        setModalData({ "productId": null, "showModal": false });
        setModalType('hidden');
    }

    const handleTabChangeYes = () => {
        setViewSwitch(viewSwitchHold);
        setViewSwitchHold(null);
        setPanelType('feed');
        setModalData({ "productId": null, "showModal": false });
        setModalType('hidden');
    }

    const handleCategoryClick = () => {
        if (catShow) {
            setCatShow(false);
        } else {
            setCatShow(true);
        }
    }

    if (!currentUser){
        return null
    }


    return (
        <div className="dashboard" 
            // ref={ref} 
            // onScroll={handleScroll}
        >
            <NavBar 
                panelType={panelType} 
                setPanelType={setPanelType} 
                handleTabChange={handleTabChange} 
                viewSwitch={viewSwitch} 
                setViewSwitch={setViewSwitch}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
                setSubmittedSearchFilters={setSubmittedSearchFilters}
                setAllowSearch={setAllowSearch}
                setPageData={setPageData}
                lastSearchTerm={lastSearchTerm}
                setLastSearchTerm={setLastSearchTerm}
                setTagTerm={setTagTerm}
            />
            <FeedTabs pageData={pageData} handleTabChange={handleTabChange} setCatShow={setCatShow} handleCategoryClick={handleCategoryClick} />
            <CategoryPanel catShow={catShow} mouseEnter={() => setCatShow(true)} mouseLeave={() => setCatShow(false)} categoryFetch={handleTabChange} />
            <Feed 
                setAllowScroll={setAllowScroll}
                productsData={productsData} 
                setProductsData={setProductsData}
                catShow={catShow}
                setModalType={setModalType} 
                panelType={panelType} 
                setPanelType={setPanelType} 
                modalChange={handleModalChange} 
                handleTabChange={handleTabChange} 
                viewSwitch={viewSwitch} 
                setViewSwitch={setViewSwitch}
                handleRemoveItem={handleRemoveItem} 
                itemHold={itemIdHold}
                setItemHold={setItemIdHold}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                submittedSearchFilters={submittedSearchFilters}
                setSubmittedSearchFilters={setSubmittedSearchFilters}
                allowSearch={allowSearch}
                setAllowSearch={setAllowSearch}
                pageData={pageData}
                setPageData={setPageData}
                lastSearchTerm={lastSearchTerm}
                setLastSearchTerm={setLastSearchTerm}
                tagTerm={tagTerm}
                setTagTerm={setTagTerm}
            />
            {panelType === 'feed' ? <SideBanner setPanelType={setPanelType}/> : null }
            <Modal 
                modalType={modalType} 
                setModalType={setModalType} 
                modalData={modalData} 
                modalChange={handleModalChange}
                handleTabChangeNo={handleTabChangeNo}
                handleTabChangeYes={handleTabChangeYes}
                handleRemoveItemNo={handleRemoveItemNo}
                handleRemoveItemYes={handleRemoveItemYes}
            />
        </div>
    );
}
export default DashBoard;
