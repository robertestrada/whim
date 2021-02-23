import React, { useEffect, useRef } from 'react';
import '../../../styles/signUp.css';
import '../../../styles/logIn.css';
import GoogleSignup from './GoogleSignup';
import ReCAPTCHA from "react-google-recaptcha";

const SignUp = ({ 
                  firstNameSignup, setFirstNameSignup, lastNameSignup, setLastNameSignup, emailSignup, setEmailSignup, 
                  passwordSignup, setPasswordSignup, valErrors, rcSiteKey, handleValidate, signupValidationMsgs,
                  handleSubmit, setSignupValidationMsgs, googleCreds
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


  const handleFormSubmit = async e => {
    e.preventDefault();
    if (handleValidate()){
      await recaptchaRef.current.executeAsync();
    }
  }


  return (
    <div className="login" style={{ animation: `fadeIn 0.5s` }}>
      { (valErrors && (valErrors.msg === "Please log in using your previously created email account."))
        ?  <div className="login__error-wrapper">
              <p className="login__error">{valErrors.msg}</p>
            </div>
        : null
      }
      <div className="signup__names">
        <input
          className={ (signupValidationMsgs.names === 'Please fill in your first and last names.' || signupValidationMsgs.names === 'Please fill in your first name.') ? "login__input first-name input-error" : "login__input first-name" }
          value={firstNameSignup}
          placeholder="First Name"
          onChange={e => setFirstNameSignup(e.target.value)}>
        </input>
        <input
          className={ (signupValidationMsgs.names === 'Please fill in your first and last names.' || signupValidationMsgs.names === 'Please fill in your last name.') ? "login__input last-name input-error" : "login__input last-name" }
          value={lastNameSignup}
          placeholder="Last Name"
          onChange={e => setLastNameSignup(e.target.value)}>
        </input>
      </div>
      { signupValidationMsgs.names !== '' 
        && <div className="signup__input-error">{signupValidationMsgs.names}</div>
      }
      <input
        className={ signupValidationMsgs.email !== ''  ? "login__input input-error" : "login__input" }
        value={emailSignup}
        placeholder="Email Address"
        onChange={e => setEmailSignup(e.target.value)}>
      </input>
      { signupValidationMsgs.email !== ''
        && <div className="signup__input-error">{signupValidationMsgs.email}</div>
      }
      <input
        className={ signupValidationMsgs.password !== ''  ? "login__input login-password input-error" : "login__input login-password" }
        type="text"
        value={passwordSignup}
        placeholder="Password"
        onChange={e => setPasswordSignup(e.target.value)}>
      </input>
      { signupValidationMsgs.password !== ''
        && <div className="signup__input-error">{signupValidationMsgs.password}</div>
      }
      <div className="signup__submit" onClick={handleFormSubmit}>Sign Up</div>
      <div className="login__auth-divider-wrapper">
        <div className="login__auth-divider-line"/>
        <div className="login__auth-divider-text">or</div>
      </div>
      <GoogleSignup setSignupValidationMsgs={setSignupValidationMsgs} googleCreds={googleCreds}/> 
      <div className="login__terms">
        By clicking 'Sign Up' or 'Google' you agree to the Whim Terms of Use and Privacy Policy. This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
      </div>
      <ReCAPTCHA
        className="signup__recaptcha"
        ref={recaptchaRef}
        sitekey={rcSiteKey}
        size="invisible"
        onChange={handleSubmit}
      />
    </div>
  );
}
export default SignUp;
