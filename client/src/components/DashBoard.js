import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCart } from '../actions/cart';
import NavBar from './NavBar';
import Feed from './Feed';
import SideBanner from './SideBanner';
import Modal from './Modal';
import '../styles/dashboard.css';


function DashBoard() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.authentication.user);
    const [modalData, setModalData] = useState({ "productId": null, "showModal": false });
    const [panelType, setPanelType] = useState('feed');
    const [checkedOut, setCheckedOut] = useState(false);

    useEffect(() => {
        if (currentUser){
            dispatch(loadCart(currentUser.id));
        }
    }, [dispatch, currentUser]);

    const handleModalChange = ({ productId, showModal }) => {
        setModalData({ "productId": productId, "showModal": showModal })
    }

    if (!currentUser){
        return null
    }


    return (
        <div className="dashboard">
            <NavBar panelType={panelType}/>
            <Feed setCheckedOut={setCheckedOut} panelType={panelType} setPanelType={setPanelType} modalChange={handleModalChange} />
            {panelType === 'feed' ? <SideBanner setPanelType={setPanelType}/> : null }
            <Modal checkedOut={checkedOut} setCheckedOut={setCheckedOut} modalData={modalData} modalChange={handleModalChange}/>
        </div>
    );
}
export default DashBoard;
