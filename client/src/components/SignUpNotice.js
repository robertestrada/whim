import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/signUpNotice.css';
import theme from '../styles/theme.js'
import { ThemeProvider } from '@material-ui/core/styles';
import { Button, Divider } from '@material-ui/core';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import CreditCardIcon from '@material-ui/icons/CreditCard';


function SignUpNotice() {
    return (
      <>
      <ThemeProvider theme={theme}>
      <div className="signup_outer_container">
        <div className="signup_box">
          <div className="signup_title">The fun and easy way to socially shop!</div>
        </div>
        <CompareArrowsIcon style={{color:"3D95CE", fontSize:"30px"}}/>
        <LocalAtmIcon color="primary" style={{color:"3D95CE", fontSize:"30px"}}/>
        <CreditCardIcon size="large" style={{color:"3D95CE", fontSize:"30px"}}/>
        <Divider />
        <Link to='/signup/email' style={{textDecoration:'none', marginTop:50}}>
          <Button
            variant="contained"
            color="primary"
            className="signup_next_button"
            style={{backgroundColor:"#3D95CE", color:"white"}}
          >Next</Button>
        </Link>
      </div>
      </ThemeProvider>
    </>
    );
}
export default SignUpNotice;
