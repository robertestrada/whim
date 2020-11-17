import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCart, removeCartItem } from '../actions/cart';
import NavBar from './NavBar';
import Feed from './Feed';
import SideBanner from './SideBanner';
import Banner from './Banner';
import Modal from './Modal';
import '../styles/dashboard.css';


const DashBoard = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.authentication.user);
    const [modalData, setModalData] = useState({ "productId": null, "showModal": false });
    const [panelType, setPanelType] = useState('feed');
    const [modalType, setModalType] = useState('hidden');
    const [viewSwitchHold, setViewSwitchHold] = useState(null);
    const [viewSwitch, setViewSwitch] = useState(null);
    const [itemIdHold, setItemIdHold] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);
    const [lastSearchTerm, setLastSearchTerm] = useState(null);

    useEffect(() => {
        if (currentUser){
            dispatch(loadCart(currentUser.id));
        }
    }, [dispatch, currentUser]);

    useEffect(() => {
        if (searchTerm !== null){
            setViewSwitch("search");
        }
    }, [searchTerm]);

    useEffect(() => {
        if (viewSwitch !== "search") {
            setSearchTerm(null);
        }
    }, [viewSwitch]);

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

    if (!currentUser){
        return null
    }


    return (
        <div className="dashboard">
            <NavBar 
                panelType={panelType} 
                setPanelType={setPanelType} 
                handleTabChange={handleTabChange} 
                viewSwitch={viewSwitch} 
                setViewSwitch={setViewSwitch}
                setSearchTerm={setSearchTerm}
                lastSearchTerm={lastSearchTerm}
                setLastSearchTerm={setLastSearchTerm}
            />
            <Feed 
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
            />
            {panelType === 'feed' ? <SideBanner setPanelType={setPanelType}/> : null }
            <Banner setPanelType={setPanelType}/>
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
