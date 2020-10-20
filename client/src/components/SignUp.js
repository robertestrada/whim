import React, { useState } from 'react';
import '../styles/signUp.css';
import '../styles/logIn.css';
import { useDispatch, useSelector } from 'react-redux'
import { removeAuth, signUp } from '../actions/authentication';
import {useHistory} from 'react-router-dom'
import GoogleSignup from './GoogleSignup'

function SignUp() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const valErrors = useSelector(state=> state.authentication.valErrors)

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(removeAuth())
    const storeReady = await dispatch(signUp(firstName, lastName, email, password));
    if (storeReady) {
      history.push('/')
    }
  }

    return (
      <form className="login" style={{ animation: `fadeIn 0.5s` }} onSubmit={handleSubmit}>
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
        <button className="login__submit" type="submit" >Sign Up</button>
        <div className="login__terms">
          By clicking 'Sign Up', you agree to the Whim Terms of Use and Privacy Policy. Terms of Service apply.
        </div>
      </form>
    );
}
export default SignUp;
