import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signUp } from '../actions/authentication'
import '../styles/logIn.css';

function GoogleSignUp() {
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
        setAuth(authorized);
      })
    });
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      auth.signIn().then(() => {
        const storeReady = dispatch(signUp(auth.currentUser.le.nt.dV, auth.currentUser.le.nt.fT, auth.currentUser.le.nt.Wt, auth.currentUser.le.nt.yT, auth.currentUser.le.nt.JJ))
        storeReady.then((result) => {
          if (result === true) {
            history.push('/');
          }
        })
      })
    }
    catch {
      const storeReady = dispatch(signUp('CauseError', 'CauseError', 'CauseError', 'CauseError', 'CauseError'))
      if (storeReady) {
        history.push('/');
      }
    }
  }

  return (
    <>
      <button onClick={handleSubmit} className="">
        <i className="google icon" style={{ marginBottom: 8 }} />
          Signup with Google
      </button>
    </>
  );
}
export default GoogleSignUp;
