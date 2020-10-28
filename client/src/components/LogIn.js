import React, { useState }from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/logIn.css';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthActions from '../actions/authentication';
import DemoButton from './DemoButton';
import GoogleSignin from './GoogleSignin.js';

const LogIn = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const valErrors = useSelector(state => state.authentication.valErrors)

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(AuthActions.removeAuth());
    const storeReady = await dispatch(AuthActions.signIn(email, password));
    if (storeReady) {
      history.push('/')
    }
  }

  return (
    <form className="login" style={{ animation: `fadeIn 0.5s` }} onSubmit={handleSubmit}>
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
        <DemoButton email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
        <button className="login__submit login-button" type="submit">Log In</button>
      </div>
      <div className="login__auth-divider-wrapper">
        <div className="login__auth-divider-line"/>
        <div className="login__auth-divider-text">or</div>
      </div>
      <GoogleSignin/> 
      <div className="login__terms">
        By clicking 'Log In' or 'Google' you agree to the Whim Terms of Use and Privacy Policy. The Google Privacy Policy and Terms of Service apply.
      </div>
    </form>
  );
}
export default LogIn;
