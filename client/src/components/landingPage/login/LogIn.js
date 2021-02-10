import React from 'react';
import '../../../styles/logIn.css';
import DemoButton from './DemoButton';
import GoogleSignin from './GoogleSignin.js';


const LogIn = ({ email, setEmail, password, setPassword, handleSubmit, valErrors }) => {

  return (
    <div className="login" style={{ animation: `fadeIn 0.5s` }}>
      { valErrors &&
        <div className="login__error-wrapper">
          <p className="login__error">{valErrors.msg}</p>
        </div> 
      }
      <input
        className="login__input"
        value={email}
        placeholder="Email Address"
        onChange={e => setEmail(e.target.value)}>
      </input>
      <input
        className="login__input"
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}>
      </input>
      <div className="login__buttons">
        <DemoButton email={email} setEmail={setEmail} password={password} setPassword={setPassword}/>
        <button className="login__submit login-button" onClick={handleSubmit}>Log In</button>
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
