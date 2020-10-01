import React, { useState } from 'react';
import NavBar from './NavBar';
import Feed from './Feed';
import SideBanner from './SideBanner';
import Modal from './Modal';
import '../styles/dashboard.css';
import { useSelector } from 'react-redux'


function DashBoard() {
    const currentUser = useSelector(state => state.authentication.user)
    const [modalData, setModalData] = useState({ "productId": null, "showModal": false });

    const handleModalChange = ({ productId, showModal }) => {
        setModalData({ "productId": productId, "showModal": showModal })
    }

    if (!currentUser){
        return null
    }

    return (
        <div className="dashboard">
            <NavBar/>
            <Feed modalChange={handleModalChange} />
            <SideBanner />
            <Modal modalData={modalData} modalChange={handleModalChange}/>
        </div>
    );
}
export default DashBoard;
