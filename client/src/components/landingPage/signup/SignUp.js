import React, { useEffect, useRef } from 'react';
import '../../../styles/signUp.css';
import '../../../styles/logIn.css';
import GoogleSignup from './GoogleSignup';
import ReCAPTCHA from "react-google-recaptcha";
import Loader from 'react-loader-spinner';

const SignUp = ({ 
                  firstNameSignup, setFirstNameSignup, lastNameSignup, setLastNameSignup, emailSignup, setEmailSignup, 
                  passwordSignup, setPasswordSignup, valErrors, backendKeys, handleValidate, signupValidationMsgs,
                  handleSubmit, setSignupValidationMsgs, showSignUpLoader, setShowSignUpLoader
                }) => {

  const recaptchaRef = useRef();
  
  useEffect(() => {
    if (firstNameSignup !== '') {
      if (lastNameSignup !== '') {
        setSignupValidationMsgs({ ...signupValidationMsgs, 'names': '' });
      } else if (signupValidationMsgs.names !== '') {
        setSignupValidationMsgs({ ...signupValidationMsgs, 'names': 'Please fill in your last name.' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstNameSignup]);

  useEffect(() => {
    if (lastNameSignup !== '') {
      if (firstNameSignup !== '') {
        setSignupValidationMsgs({ ...signupValidationMsgs, 'names': '' });
      } else if (signupValidationMsgs.names !== '') {
        setSignupValidationMsgs({ ...signupValidationMsgs, 'names': 'Please fill in your first name.' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastNameSignup]);

  useEffect(() => {
    if (emailSignup !== '') {
      setSignupValidationMsgs({ ...signupValidationMsgs, 'email': '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailSignup]);

  useEffect(() => {
    if (passwordSignup !== '') {
      setSignupValidationMsgs({ ...signupValidationMsgs, 'password': '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordSignup]);

  useEffect(() => {
    if (valErrors && valErrors.msg){
      setShowSignUpLoader(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valErrors]);


  const handleFormSubmit = async e => {
    e.preventDefault();
    setShowSignUpLoader(true);
    if (handleValidate()){
      await recaptchaRef.current.executeAsync();
    } else {
      setShowSignUpLoader(false);
    }
  }

  const handleEnterPress = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleFormSubmit(e);
    }
  }


  return (
    <div className="login" style={{ animation: `fadeIn 0.5s` }}>
      { (valErrors && (valErrors.msg === "Please log in using your previously created email account."))
        ? <div className="login__error-wrapper">
            <p className="login__error">{valErrors.msg}</p>
          </div>
        : null
      }
      <div className="signup__names">
        <input
          className={ (signupValidationMsgs.names === 'Please fill in your first and last names.' || signupValidationMsgs.names === 'Please fill in your first name.') ? "login__input first-name input-error" : "login__input first-name" }
          value={firstNameSignup}
          placeholder="First Name"
          onChange={e => setFirstNameSignup(e.target.value)}
          onKeyDown={e => handleEnterPress(e)}
        >
        </input>
        <input
          className={ (signupValidationMsgs.names === 'Please fill in your first and last names.' || signupValidationMsgs.names === 'Please fill in your last name.') ? "login__input last-name input-error" : "login__input last-name" }
          value={lastNameSignup}
          placeholder="Last Name"
          onChange={e => setLastNameSignup(e.target.value)}
          onKeyDown={e => handleEnterPress(e)}
        >
        </input>
      </div>
      { signupValidationMsgs.names !== '' 
        && <div className="signup__input-error">{signupValidationMsgs.names}</div>
      }
      <input
        className={ signupValidationMsgs.email !== ''  ? "login__input input-error" : "login__input" }
        value={emailSignup}
        placeholder="Email Address"
        onChange={e => setEmailSignup(e.target.value)}
        onKeyDown={e => handleEnterPress(e)}
      >
      </input>
      { signupValidationMsgs.email !== ''
        && <div className="signup__input-error">{signupValidationMsgs.email}</div>
      }
      <input
        className={ signupValidationMsgs.password !== ''  ? "login__input login-password input-error" : "login__input login-password" }
        type="text"
        value={passwordSignup}
        placeholder="Password"
        onChange={e => setPasswordSignup(e.target.value)}
        onKeyDown={e => handleEnterPress(e)}
      >
      </input>
      { signupValidationMsgs.password !== ''
        && <div className="signup__input-error">{signupValidationMsgs.password}</div>
      }
      <div className="signup__submit" onClick={handleFormSubmit}>
        { showSignUpLoader 
          ? <Loader className="signup__submit-loader" type="ThreeDots" color="#ffffff" height={40} width={40} /> 
          : "Sign Up"
        }
      </div>
      <div className="login__auth-divider-wrapper">
        <div className="login__auth-divider-line"/>
        <div className="login__auth-divider-text">or</div>
      </div>
      <GoogleSignup 
        setSignupValidationMsgs={setSignupValidationMsgs} 
        backendKeys={backendKeys} 
        valErrors={valErrors}
      />
      <div className="login__terms">
        By clicking 'Sign Up' or 'Google' you agree to the Whim Terms of Use and Privacy Policy. This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
      </div>
      <ReCAPTCHA
        className="signup__recaptcha"
        ref={recaptchaRef}
        sitekey={backendKeys.rcSiteKey}
        size="invisible"
        onChange={handleSubmit}
      />
    </div>
  );
}
export default SignUp;
