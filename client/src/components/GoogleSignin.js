import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as AuthActions from '../actions/authentication';
import '../styles/logIn.css';

function GoogleSignin() {
  const [auth, setAuth] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '200012556157-sfdghuss7qmpecojpucib1qggovlajht.apps.googleusercontent.com',
        scope: 'email',
        apiKey: 'AIzaSyAvOjlm1n826DLkUo3rkK6EQqknve3LZ3s',
      }).then(() => {
        let authorized = window.gapi.auth2.getAuthInstance();
        setAuth(authorized)
      })
    });
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(AuthActions.removeAuth());
    try {
      const storeReady = await dispatch(AuthActions.signIn(auth.currentUser.le.nt.Wt, auth.currentUser.le.nt.yT));
      if (storeReady) {
        history.push('/')
      }
    } catch {
      const storeReady = await dispatch(AuthActions.signIn('causeError', 'C4useError'));
      if (storeReady) {
        history.push('/')
      }
    }
  }

  return (
    <>
      <button onClick={handleSubmit} className="">
        <i className="google icon" style={{ marginBottom: 8 }}/>
          Sign In
      </button>
    </>
  );
}
export default GoogleSignin;
