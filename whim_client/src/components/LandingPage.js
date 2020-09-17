import React from 'react';
import '../styles/landingPage.css';
import { Button, Divider } from '@material-ui/core';
import theme from '../styles/theme.js';
import { ThemeProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


function LandingPage() {
    return (
        <>
        <ThemeProvider theme={theme}>
          <div className="landing_navbar">
            <Link to="/"><img className="landing_logo" src="https://whim-bucket.s3-us-west-1.amazonaws.com/whim-assets/whim-logo.svg" alt="" /></Link>
            <div className="landing_buttons">
              <Button size="small" style={{ fontColor: "white" }} disabled>Business</Button>
              <Button size="small" style={{ fontColor: "white" }} disabled>Card</Button>
              <Button size="small" style={{ fontColor: "white" }} disabled>Security</Button>
              <Button size="small" style={{ fontColor: "white" }} disabled>Contact Us</Button>
              <Link to="/signin" style={{ textDecoration: 'none' }}><Button size="small" style={{ fontColor: "white" }}>Sign In</Button></Link>
            </div>
          </div>
          <Divider />
        </ThemeProvider>
        </>
    );
}
export default LandingPage;
