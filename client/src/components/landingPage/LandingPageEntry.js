import React, { useState, useEffect } from 'react';
import { baseUrl } from '../../config';
import '../../styles/landingPage.css';
import LogIn from './login/LogIn.js';
import SignUp from './signup/SignUp.js';
import LandingTrustFeatures from './LandingTrustFeatures';


const LandingPageEntry = ({ button, setButton, emailLogin, setEmailLogin, 
                            passwordLogin, setPasswordLogin, firstNameSignup, 
                            setFirstNameSignup, lastNameSignup, setLastNameSignup,
                            emailSignup, setEmailSignup, passwordSignup, setPasswordSignup,
                            valErrors, handleValidate, handleSubmit, 
                            signupValidationMsgs, setSignupValidationMsgs, loginValidationMsg,
                            showLoginLoader, setShowLoginLoader, showDemoLoginLoader, setShowDemoLoginLoader,
                            showSignUpLoader, setShowSignUpLoader
                          }) => {

  const [rcSiteKey, setRCSiteKey] = useState('');
  const [googleCreds, setGoogleCreds] = useState('');


  const handleGetSecretKeys = async () => {
    const secretsFetch = await fetch(`${baseUrl}/backend-keys`);
    const secretsJSON = await secretsFetch.json();
    setGoogleCreds({ 'client_id': secretsJSON.client_id, 'api_key': secretsJSON.api_key });
    setRCSiteKey(secretsJSON.rcSiteKey);
  };

  useEffect(() => {
    handleGetSecretKeys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
      <div className="landing__panel-right-wrapper">
        <div className="landing__panel-trust-logo-wrapper" style={{ animation: `fadeIn 1s` }}>
          <div className="landing__logo-wrapper">
            <img className="landing__logo" src="https://whim-bucket.s3-us-west-1.amazonaws.com/whim-assets/whim-logo.svg" alt="whim-logo" />
          </div>
          { button === "signup" 
            && <LandingTrustFeatures button={button}/>
          }
        </div>
        <div className="landing__details">
          <div className="landing__buttons">
            <button className={button === "login" ? "landing__button pressed" : "landing__button"} onClick={() => setButton("login")} >Log In</button>
            <button className={button === "signup" ? "landing__button pressed" : "landing__button"} onClick={() => setButton("signup")} >Sign Up</button>
          </div>
          { button === "login"
            ? <LogIn 
                googleCreds={googleCreds}
                emailLogin={emailLogin}
                setEmailLogin={setEmailLogin}
                passwordLogin={passwordLogin}
                setPasswordLogin={setPasswordLogin}
                handleValidate={handleValidate}
                valErrors={valErrors}
                loginValidationMsg={loginValidationMsg}
                showLoginLoader={showLoginLoader}
                setShowLoginLoader={setShowLoginLoader}
                showDemoLoginLoader={showDemoLoginLoader}
                setShowDemoLoginLoader={setShowDemoLoginLoader}
              />
            : <SignUp 
                googleCreds={googleCreds}
                firstNameSignup={firstNameSignup}
                setFirstNameSignup={setFirstNameSignup}
                lastNameSignup={lastNameSignup}
                setLastNameSignup={setLastNameSignup}
                emailSignup={emailSignup}
                setEmailSignup={setEmailSignup}
                passwordSignup={passwordSignup}
                setPasswordSignup={setPasswordSignup}
                rcSiteKey={rcSiteKey}
                valErrors={valErrors}
                handleValidate={handleValidate}
                handleSubmit={handleSubmit}
                signupValidationMsgs={signupValidationMsgs}
                setSignupValidationMsgs={setSignupValidationMsgs}
                showSignUpLoader={showSignUpLoader}
                setShowSignUpLoader={setShowSignUpLoader}
              />
          }
        </div>
      </div>
  );
}
export default LandingPageEntry;
