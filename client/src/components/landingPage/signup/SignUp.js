import React from 'react';
import '../../../styles/signUp.css';
import '../../../styles/logIn.css';
import GoogleSignup from './GoogleSignup'

const SignUp = ({ firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, setShowRecaptcha, valErrors }) => {

    return (
      <div className="login" style={{ animation: `fadeIn 0.5s` }}>
        {valErrors &&
          <div className="login__error-wrapper">
            <p className="login__error">{valErrors.msg}</p>
          </div>
        }
        <div className="signup__names">
          <input
            className="login__input first-name"
            required
            value={firstName}
            placeholder="First Name"
            onChange={e => setFirstName(e.target.value)}>
          </input>
          <input
          className="login__input last-name"
            required
            value={lastName}
            placeholder="Last Name"
            onChange={e => setLastName(e.target.value)}>
          </input>
        </div>
        <input
          required
          className="login__input"
          value={email}
          placeholder="Email Address"
          onChange={e => setEmail(e.target.value)}>
        </input>
        <input
          required
          className="login__input"
          type="password"
          value={password}
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}>
        </input>
        { password.length < 8 && password.length > 0 
          ? <p className="signup_submit_disclaimer">Password must be at least 8 characters, have one number and one capital</p> 
          : null
        }
        <div className="signup__submit" onClick={() => setShowRecaptcha(true)}>Sign Up</div>
        <div className="login__auth-divider-wrapper">
          <div className="login__auth-divider-line" />
          <div className="login__auth-divider-text">or</div>
        </div>
        <GoogleSignup/> 
        <div className="login__terms">
          By clicking 'Sign Up' or 'Google' you agree to the Whim Terms of Use and Privacy Policy. The Google Privacy Policy and Terms of Service apply.
        </div>
      </div>
    );
}
export default SignUp;
