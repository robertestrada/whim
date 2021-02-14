import React from 'react';
import '../../../styles/logIn.css';
import DemoButton from './DemoButton';
import GoogleSignin from './GoogleSignin.js';


const LogIn = ({ 
                emailLogin, setEmailLogin, passwordLogin, setPasswordLogin, 
                handleValidate, valErrors, loginValidationMsg 
              }) => {


  return (
    <div className="login" style={{ animation: `fadeIn 0.5s` }}>
      { (((valErrors && (valErrors.msg !== "Please login using your previously created email account."))) || loginValidationMsg) 
        && <div className="login__error-wrapper">
        {((valErrors && (valErrors.msg !== "Please login using your previously created email account.")))
            ? <p className="login__error">{valErrors.msg}</p>
            : <p className="login__error">{loginValidationMsg}</p>
          }
          </div> 
      }
      <input
        className="login__input"
        value={emailLogin}
        placeholder="Email Address"
        onChange={e => setEmailLogin(e.target.value)}>
      </input>
      <input
        className="login__input login-password"
        placeholder="Password"
        type="text"
        value={passwordLogin}
        onChange={e => setPasswordLogin(e.target.value)}>
      </input>
      <div className="login__buttons">
        <DemoButton emailLogin={emailLogin} setEmailLogin={setEmailLogin} passwordLogin={passwordLogin} setPasswordLogin={setPasswordLogin}/>
        <button className="login__submit login-button" onClick={handleValidate}>Log In</button>
      </div>
      <div className="login__auth-divider-wrapper">
        <div className="login__auth-divider-line"/>
        <div className="login__auth-divider-text">or</div>
      </div>
      <GoogleSignin/> 
      <div className="login__terms">
        By clicking 'Log In' or 'Google' you agree to the Whim Terms of Use and Privacy Policy. This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
      </div>
    </div>
  );
}
export default LogIn;
