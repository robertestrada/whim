import React, { useState } from 'react';
import '../styles/landingPage.css';
import LogIn from './LogIn.js'
import SignUp from './SignUp.js'
import { useDispatch } from 'react-redux'
import * as AuthActions from '../actions/authentication';

function LandingPage() {
  const dispatch = useDispatch();
  const [button, setButton] = useState("login")

  const handleClearErrors = async () => {
    await dispatch(AuthActions.removeValErrors());
  }

  const handleButtonChange = (newButton) => {
    handleClearErrors();
    setButton(newButton)
  }
  
  return (
    <div className="landing">
      <div className="landing__panel-right" style={{ animation: `fadeIn 0.5s` }}>
        <div className="landing__logo-wrapper">
          <img className="landing__logo" src="https://whim-bucket.s3-us-west-1.amazonaws.com/whim-assets/whim-logo.svg" alt="whim-logo" />
        </div>
        <div className="landing__details">
          <div className="landing__buttons">
            <button className={button === "login" ? "landing__button pressed" : "landing__button"} onClick={() => handleButtonChange("login")} >Log In</button>
            <button className={button === "signup" ? "landing__button pressed" : "landing__button"} onClick={() => handleButtonChange("signup")} >Sign Up</button>
          </div>
          { button === "login"
            ? <LogIn/>
            : <SignUp/>
          }
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
