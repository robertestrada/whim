import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import * as AuthActions from '../../actions/authentication';
import * as CartActions from '../../actions/cart';
import { baseUrl } from '../../config';
import '../../styles/landingPage.css';
import LogIn from './login/LogIn.js'
import SignUp from './signup/SignUp.js'
import LandingSlides from './LandingSlides'
import LandingTrustFeatures from './LandingTrustFeatures';


const LandingPage = () => {
  const [rcSiteKey, setRCSiteKey] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const valErrors = useSelector(state => state.authentication.valErrors)
  const [button, setButton] = useState("login")

  const handleGetRecaptchaSiteKey = async () => {
    const recaptchaSiteKeyFetch = await fetch(`${baseUrl}/recaptcha-site-key`);
    const recaptchaSiteKey = await recaptchaSiteKeyFetch.json();
    setRCSiteKey(recaptchaSiteKey.rcSiteKey);
  };

  const handleClearErrors = async () => {
    await dispatch(AuthActions.removeValErrors());
  }

  useEffect(() => {
    handleGetRecaptchaSiteKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(()=>{
    handleClearErrors();
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [button]);

  const handleSubmit = async () => {
    await dispatch(AuthActions.removeAuth())
    await dispatch(CartActions.clearCartAction());
    let storeReady;
    
    if (button === "login"){
      storeReady = await dispatch(AuthActions.signIn(email, password));
    } else if (button === "signup") {
      storeReady = await dispatch(AuthActions.signUp(firstName, lastName, email, password));
    }
    if (storeReady) {
      history.push('/')
    }
  }

  
  return (
    <div className="landing">
      <div className="landing__panel-left" style={{ animation: `fadeIn 0.5s` }}>
        <LandingSlides/>
      </div>
      <div className="landing__panel-right-wrapper">
        <div className="landing__panel-trust-logo-wrapper" style={{ animation: `fadeIn 0.5s` }}>
          <div className="landing__logo-wrapper">
            <img className="landing__logo" src="https://whim-bucket.s3-us-west-1.amazonaws.com/whim-assets/whim-logo.svg" alt="whim-logo" />
          </div>
          { button === "signup" 
            ? <LandingTrustFeatures button={button}/>
            : null
          }
        </div>
        <div className="landing__details">
          <div className="landing__buttons">
            <button className={button === "login" ? "landing__button pressed" : "landing__button"} onClick={() => setButton("login")} >Log In</button>
            <button className={button === "signup" ? "landing__button pressed" : "landing__button"} onClick={() => setButton("signup")} >Sign Up</button>
          </div>
          { button === "login"
            ? <LogIn 
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
                valErrors={valErrors}
              />
            : <SignUp 
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                rcSiteKey={rcSiteKey}
                handleSubmit={handleSubmit}
                valErrors={valErrors}
              />
          }
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
