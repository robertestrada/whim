import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthActions from '../../actions/authentication';
import * as CartActions from '../../actions/cart';
import { baseUrl } from '../../config';
import '../../styles/landingPage.css';
import LogIn from './login/LogIn.js';
import SignUp from './signup/SignUp.js';
import LandingSlides from './LandingSlides';
import LandingTrustFeatures from './LandingTrustFeatures';


const LandingPage = () => {
  const dispatch = useDispatch();
  const [rcSiteKey, setRCSiteKey] = useState('');
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [emailSignup, setEmailSignup] = useState('');
  const [passwordSignup, setPasswordSignup] = useState('');
  const [firstNameSignup, setFirstNameSignup] = useState('');
  const [lastNameSignup, setLastNameSignup] = useState('');
  const [button, setButton] = useState("login")
  const valErrors = useSelector(state => state.authentication.valErrors)
  const [loginValidationMsg, setLoginValidationMsg] = useState('');
  const [signupValidationMsgs, setSignupValidationMsgs] = useState({ 'names': '', 'email': '', 'password': '' });

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

  const handleSubmit = async () => {
    await dispatch(AuthActions.removeAuth())
    await dispatch(CartActions.clearCartAction());
    
    if (button === "login"){
      await dispatch(AuthActions.signIn(emailLogin, passwordLogin));

    } else if (button === "signup") {
      await dispatch(AuthActions.signUp(firstNameSignup, lastNameSignup, emailSignup, passwordSignup));
    }
  }

  const handleValidate = () => {
    const emailRegEx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    const passwordRegExLowercase = /^(?=.*[a-z]).*$/;
    const passwordRegExUppercase = /^(?=.*[A-Z]).*$/;
    const passwordRegExNumber = /^(?=.*\d).*$/;
    const passwordRegExSymbol = /^(?=.*[-+_!@#$%^&*.,?]).*$/;
    handleClearErrors();

    if (button === "login") {
      if (emailLogin === '' || passwordLogin === '') {
        setLoginValidationMsg('Please fill out all fields.');
        return
      }
      setLoginValidationMsg('');
      handleSubmit();

    } else if (button === "signup") {

      let signupValidationMsgsTemp = { ...signupValidationMsgs };

      if (firstNameSignup === '') {
        if (lastNameSignup === '') {
          signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'names': 'Please fill in your first and last names.' };
        } else {
          signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'names': 'Please fill in your first name.' };
        }
      } else if (firstNameSignup !== '') {
        if (lastNameSignup !== '') {
          signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'names': '' };
        } else {
          signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'names': 'Please fill in your last name.' };
        }
      }

      if (emailSignup === '') {
        signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'email': 'Please enter an email address.' };
      } else if (!emailRegEx.test(emailSignup)) {
        signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'email': 'Hmm, try double-checking your email.' };
      } else {
        signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'email': '' };
      }

      if (passwordSignup === '') {
        signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'password': 'Please enter a password.' };
      } else if (!passwordRegExLowercase.test(passwordSignup)) {
        signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'password': 'Password must contain a lowercase letter.' };
      } else if (!passwordRegExUppercase.test(passwordSignup)) {
        signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'password': 'Password must contain an uppercase letter.' };
      } else if (!passwordRegExNumber.test(passwordSignup)) {
        signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'password': 'Password must contain a number.' };
      } else if (!passwordRegExSymbol.test(passwordSignup)) {
        signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'password': 'Password must contain a symbol.' };
      } else if (passwordSignup.length < 8 || passwordSignup.length > 50) {
        signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'password': 'Password must be between 8 and 50 characters.' };
      } else {
        signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'password': '' };
      }

      setSignupValidationMsgs({ ...signupValidationMsgsTemp });
      if (Object.values(signupValidationMsgsTemp).every(value => value === '')){
        return true;
      }
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
                emailLogin={emailLogin}
                setEmailLogin={setEmailLogin}
                passwordLogin={passwordLogin}
                setPasswordLogin={setPasswordLogin}
                handleValidate={handleValidate}
                valErrors={valErrors}
                loginValidationMsg={loginValidationMsg}
              />
            : <SignUp 
                firstNameSignup={firstNameSignup}
                setFirstNameSignup={setFirstNameSignup}
                lastNameSignup={lastNameSignup}
                setLastNameSignup={setLastNameSignup}
                emailSignup={emailSignup}
                setEmailSignup={setEmailSignup}
                passwordSignup={passwordSignup}
                setPasswordSignup={setPasswordSignup}
                rcSiteKey={rcSiteKey}
                handleValidate={handleValidate}
                handleSubmit={handleSubmit}
                valErrors={valErrors}
                signupValidationMsgs={signupValidationMsgs}
                setSignupValidationMsgs={setSignupValidationMsgs}
              />
          }
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
