import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// import SearchBar from './SearchBar.js'
// import SearchBarSem from './SearchBarSem.js'
import '../styles/navBar.css';
import { useDispatch } from 'react-redux'
import * as AuthActions from '../actions/authentication';
// import RequestNotification from './RequestNotification.js';

function NavBar(props) {

  const dispatch = useDispatch();
  const history = useHistory();
  // const fullname = useSelector((state) => state.authentication.user.full_name)

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(AuthActions.logout());
    history.push('/')
  }

  return (
    <div className="navbar">
      <div className="navbar__logo-wrapper">
        <Link to="/"><img className="navbar__logo" src="https://whim-bucket.s3-us-west-1.amazonaws.com/whim-assets/whim-logo.svg" alt="" /></Link>
      </div>
      <div className="navbar__options">
        <button onClick={handleSubmit}>Log Out</button>
      </div>
    </div>
  );
}
export default NavBar;
