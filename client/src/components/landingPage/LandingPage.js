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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [button, setButton] = useState("login")
  const valErrors = useSelector(state => state.authentication.valErrors)
  const [loginValidationMsg, setLoginValidationMsg] = useState(null);
  const [signupValidationMsgs, setSignupValidationMsgs] = useState({ 'names': '', 'email': '', 'password': '' });
  const [allowSignup, setAllowSignup] = useState(false);

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
    setAllowSignup(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [button]);

  useEffect(() => {
    let signupValidationMsgsTemp = { ...signupValidationMsgs };
    if (firstName !== '') {
      if (lastName !== '') {
        signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'names': '' };
      } else {
        signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'names': 'Please fill in your last name.' };
      }
    } else if (lastName !== '') {
      signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'names': 'Please fill in your first name.' };
    }
    setSignupValidationMsgs({ ...signupValidationMsgsTemp })
  }, [firstName, lastName]);

  const handleSubmit = async () => {
    await dispatch(AuthActions.removeAuth())
    await dispatch(CartActions.clearCartAction());
    // const emailRegEx = /^[a-z0-9][-_.+!#$%&'*/=?^`{|]{0,1}([a-z0-9][-_.+!#$%&'*/=?^`{|]{0,1})*[a-z0-9]@[a-z0-9][-.]{0,1}([a-z][-.]{0,1})*[a-z0-9].[a-z0-9]{1,}([.-]{0,1}[a-z]){0,}[a-z0-9]{0,}$/;
    if (button === "login"){
      if (email === '' || password === '') {
        setLoginValidationMsg('Please fill out all fields.');
        return
      }
      await dispatch(AuthActions.signIn(email, password));
    } else if (button === "signup") {
      let allowSignupTemp = true;
      let signupValidationMsgsTemp = { ...signupValidationMsgs };
      if (firstName === '') {
        if (lastName === '') {
          signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'names': 'Please fill in your first and last names.' };
          allowSignupTemp = false;
        } else {
          signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'names': 'Please fill in your first name.' };
          allowSignupTemp = false;
        }
      } else if (lastName === '') {
        signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'names': 'Please fill in your last name.' };
        allowSignupTemp = false;
      }
      // if (email === '') {
      //   signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'email': 'Please enter an email address.' };
      //   allowSignupTemp = false;
      // } else if (!emailRegEx.test(email)) {
      //   signupValidationMsgsTemp = { ...signupValidationMsgsTemp, 'email': 'Hmm, try double-checking your email.' };
      //   allowSignupTemp = false;
      // }
      if (password === '') {
        setSignupValidationMsgs({ ...signupValidationMsgs, 'password': 'Please enter a password.' });
        allowSignupTemp = false;
      }
      setSignupValidationMsgs({ ...signupValidationMsgsTemp });
      setAllowSignup(allowSignupTemp);
    }
  }

  useEffect(() => {
    if (allowSignup){
      setAllowSignup(false);
      dispatch(AuthActions.signUp(firstName, lastName, email, password));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allowSignup]);
  console.log(signupValidationMsgs);
  console.log(allowSignup);
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
                loginValidationMsg={loginValidationMsg}
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
                signupValidationMsgs={signupValidationMsgs}
              />
          }
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
