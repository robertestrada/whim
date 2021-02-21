import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthActions from '../../actions/authentication';
import * as CartActions from '../../actions/cart';
import { baseUrl } from '../../config';
import '../../styles/landingPage.css';
import SignUpSurvey from './signup/SignUpSurvey.js';
import LandingSliders from './LandingSliders';
import LandingPageLoader from './LandingPageLoader';
import LandingPageEntry from './LandingPageEntry';


const LandingPage = ({ landingBlurSupported }) => {
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
  const [slidersNotLoaded, setSlidersNotLoaded] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  const handleGetRecaptchaSiteKey = async () => {
    const recaptchaSiteKeyFetch = await fetch(`${baseUrl}/recaptcha-site-key`);
    const recaptchaSiteKey = await recaptchaSiteKeyFetch.json();
    setRCSiteKey(recaptchaSiteKey.rcSiteKey);
  };

  const handleClearErrors = () => {
    dispatch(AuthActions.removeValErrors());
  }

  useEffect(() => {
    handleGetRecaptchaSiteKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!slidersNotLoaded) {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slidersNotLoaded]);

  const handleSubmit = () => {
    dispatch(AuthActions.removeAuth())
    dispatch(CartActions.clearCartAction());
    
    if (button === "login"){
      dispatch(AuthActions.signIn(emailLogin, passwordLogin));

    } else if (button === "signup") {
      dispatch(AuthActions.signUp(firstNameSignup, lastNameSignup, emailSignup, passwordSignup));
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

  if (landingBlurSupported === null) {
    return null;
  }
  



  return (
    <div className="landing">
      <LandingSliders 
        landingBlurSupported={landingBlurSupported} 
        slidersNotLoaded={slidersNotLoaded} 
        setSlidersNotLoaded={setSlidersNotLoaded}
      />
      { showLoader && <div className="landing__overlay-loading-container"/>}
      { showLoader && <LandingPageLoader landingBlurSupported={landingBlurSupported} slidersNotLoaded={slidersNotLoaded} /> }
      { true
        ? <SignUpSurvey/>
        : <LandingPageEntry
            button={button}
            setButton={setButton}
            emailLogin={emailLogin}
            setEmailLogin={setEmailLogin}
            passwordLogin={passwordLogin}
            setPasswordLogin={setPasswordLogin}
            loginValidationMsg={loginValidationMsg}
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
          />
      }
    </div>
  );
}
export default LandingPage;
