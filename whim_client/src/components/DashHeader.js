import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
// import SearchBar from './SearchBar.js'
// import SearchBarSem from './SearchBarSem.js'
import '../styles/dashheader.css';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import * as AuthActions from '../actions/authentication';
// import RequestNotification from './RequestNotification.js';


const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: 'none',
    }
  },
  palette: {
    text: {
      primary: 'rgb(255,255,255)'
    }
  }
})

function DashHeader(props) {

  const dispatch = useDispatch();
  const history = useHistory();
  const username = useSelector((state) => state.authentication.user.username)
  const fullname = useSelector((state) => state.authentication.user.full_name)

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(AuthActions.logout());
    history.push('/')
  }

  return (
      <>
        <ThemeProvider theme={theme}>
          <div className="dash_container">
            <div className="dash_logo_search">
            <Link to="/dashboard"><img className="dash_logo" src="https://whim-bucket.s3-us-west-1.amazonaws.com/whim-assets/whim-logo.svg" alt="" /></Link>
              {/* <SearchBar /> */}
            </div>

            <div className="dash_account_buttons">
              {/* <RequestNotification /> */}
              {fullname
              ? <Button size="small">{fullname}</Button>
              : <Button size="small">{username}</Button>
              }
              <Button size="small">Statement</Button>
              <Button size="small">Settings</Button>
              <Button size="small">Help</Button>
              <Button size="small" onClick={handleSubmit}>Log Out</Button>
            </div>
          </div>

        </ThemeProvider>
      </>
  );
}
export default DashHeader;