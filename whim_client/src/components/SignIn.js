import React, { useState }from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../styles/signIn.css';
import { TextField, Button, } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import theme from '../styles/theme.js'
import { ThemeProvider } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import * as AuthActions from '../actions/authentication';
import DemoButton from './DemoButton'

function SignIn() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const valErrors = useSelector(state=> state.authentication.valErrors)

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(AuthActions.removeAuth());
    const storeReady = await dispatch(AuthActions.signIn(email, password));
    if (storeReady) {
      history.push('/dashboard')
    }
  }

    return (
        <>
          <ThemeProvider theme={theme}>
          {valErrors? <Alert severity="error">{valErrors.msg}</Alert> : null}
          <form onSubmit={handleSubmit}>
            <div className="signin_outer_container">
              <div className="signin_title">Sign in to Whim</div>
              <div className="signin_container">
                <div className="signin_box"></div>
                <TextField
                  className="signin_email"
                  size="small"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  label="Email or Mobile">
                  </TextField>
                <div className="signin_password_container">
                  <TextField
                    className="signin_password"
                    size="small"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    label="Password">
                  </TextField>
                </div>
                <div className="signin_demo_submit">
                  <div>
                    <DemoButton email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
                  </div>
                  <div>
                    <Button className="signIn" type="submit" variant="contained" style={{backgroundColor:"#3D95CE", color:"white"}}>Sign In</Button>
                  </div>
                </div>
              </div>
              <Link to="/signup" className="signin_signup_link">Sign Up</Link>
            </div>
          </form>
          </ThemeProvider>
        </>
    );
}
export default SignIn;
