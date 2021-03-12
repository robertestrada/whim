import React, { useEffect } from 'react';
import '../../../styles/logIn.css';
import DemoButton from './DemoButton';
import GoogleSignin from './GoogleSignin.js';
import Loader from 'react-loader-spinner';


const LogIn = ({ 
                emailLogin, setEmailLogin, passwordLogin, setPasswordLogin, 
                handleValidate, valErrors, loginValidationMsg, backendKeys,
                showLoginLoader, setShowLoginLoader, showDemoLoginLoader, setShowDemoLoginLoader
              }) => {

  useEffect(() => {
    if (valErrors && valErrors.msg) {
      setShowLoginLoader(false);
      setShowDemoLoginLoader(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valErrors]);
  
  const handleEnterPress = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      setShowLoginLoader(true);
      handleValidate();
    }
  }

  const handleLoginClick = () => {
    setShowLoginLoader(true);
    handleValidate();
  }


  return (
    <div className="login" style={{ animation: `fadeIn 0.5s` }}>
      { (((valErrors && (valErrors.msg !== "Please log in using your previously created email account."))) || loginValidationMsg) 
        && <div className="login__error-wrapper">
        {((valErrors.msg !== null && valErrors.msg !== "Please log in using your previously created email account."))
            ? <p className="login__error">{valErrors.msg}</p>
            : <p className="login__error">{loginValidationMsg}</p>
          }
          </div> 
      }
      <input
        className="login__input"
        value={emailLogin}
        placeholder="Email Address"
        type="text"
        onChange={e => setEmailLogin(e.target.value)}
        onKeyDown={e => handleEnterPress(e)}
      >
      </input>
      <input
        className="login__input login-password"
        placeholder="Password"
        type="text"
        value={passwordLogin}
        onChange={e => setPasswordLogin(e.target.value)}
        onKeyDown={e => handleEnterPress(e)}
        >
      </input>
      <div className="login__buttons">
        <DemoButton 
          emailLogin={emailLogin} 
          setEmailLogin={setEmailLogin} 
          passwordLogin={passwordLogin} 
          setPasswordLogin={setPasswordLogin}
          showDemoLoginLoader={showDemoLoginLoader}
          setShowDemoLoginLoader={setShowDemoLoginLoader}
          handleValidate={handleValidate}
        />
        <button className="login__submit login-button" onClick={handleLoginClick}>
          { showLoginLoader
            ? <Loader className="signup__submit-loader" type="ThreeDots" color="#ffffff" height={40} width={40} />
            : "Log In"
          }
        </button>
      </div>
      <div className="login__auth-divider-wrapper">
        <div className="login__auth-divider-line"/>
        <div className="login__auth-divider-text">or</div>
      </div>
      <GoogleSignin backendKeys={backendKeys}/> 
      <div className="login__terms">
        By clicking 'Log In' or 'Google' you agree to the Whim Terms of Use and Privacy Policy. This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
      </div>
    </div>
  );
}
export default LogIn;
