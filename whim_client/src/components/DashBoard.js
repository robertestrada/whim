import React from 'react';
import NavBar from './NavBar';
import Feed from './Feed';
import '../styles/dashboard.css';
import { useSelector } from 'react-redux'


function DashBoard() {

    return (
        <div className="dashboard">
            <NavBar/>
            <Feed />
        </div>
    );
}
export default DashBoard;
