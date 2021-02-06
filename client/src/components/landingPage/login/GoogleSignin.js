import React from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { baseUrl } from '../../../config';
import { signInGoogle, removeAuth } from '../../../actions/authentication';
import * as CartActions from '../../../actions/cart';
import '../../../styles/logIn.css';

const GoogleSignin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(removeAuth());
    await dispatch(CartActions.clearCartAction());
    const googleCredsFetch = await fetch(`${baseUrl}/google-credentials`);
    const googleCreds = await googleCredsFetch.json();

    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: `${googleCreds.client_id}`,
        scope: 'email',
        apiKey: `${googleCreds.api_key}`,
      }).then(() => {
        const authorized = window.gapi.auth2.getAuthInstance();
        try {
          const profile = authorized.currentUser.get().getBasicProfile();
          const storeReady = dispatch(signInGoogle(profile.getEmail()));
          if (storeReady) {
            history.push('/')
          }
        } catch {
          const storeReady = dispatch(signInGoogle('causeError', 'C4useError'));
          if (storeReady) {
            history.push('/')
          }
        }
      })
    });
  }

  return (
    <button className="login__google google-signin" onClick={handleSubmit}>
      <svg viewBox="0 0 46 46" className="login__google-svg">
        <defs>
          <filter x="-50%" y="-50%" filterUnits="objectBoundingBox" id="GoogleIcon-a">
            <feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
            <feGaussianBlur stdDeviation=".5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.168 0" in="shadowBlurOuter1" result="shadowMatrixOuter1"></feColorMatrix>
            <feOffset in="SourceAlpha" result="shadowOffsetOuter2"></feOffset>
            <feGaussianBlur stdDeviation=".5" in="shadowOffsetOuter2" result="shadowBlurOuter2"></feGaussianBlur>
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.084 0" in="shadowBlurOuter2" result="shadowMatrixOuter2"></feColorMatrix>
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1"></feMergeNode><feMergeNode in="shadowMatrixOuter2"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
          <rect id="b" rx="2"></rect>
        </defs>
        <g fill="none" fillRule="evenodd">
          <g transform="translate(3 3)" filter="url(#GoogleIcon-a)">
            <use fill="#FFF"></use>
            <use></use>
            <use></use>
            <use></use>
          </g>
          <path d="M31.64 23.205c0-.639-.057-1.252-.164-1.841H23v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"></path>
          <path d="M23 32c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711h-3.007v2.332A8.997 8.997 0 0 0 23 32z" fill="#34A853"></path>
          <path d="M17.964 24.71a5.41 5.41 0 0 1-.282-1.71c0-.593.102-1.17.282-1.71v-2.332h-3.007A8.996 8.996 0 0 0 14 23c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"></path>
          <path d="M23 17.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C27.463 14.891 25.426 14 23 14a8.997 8.997 0 0 0-8.043 4.958l3.007 2.332c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335"></path>
          <path d="M14 14h18v18H14V14z"></path>
        </g>
      </svg>
      <div className="login__google-text">
        Google
      </div>
    </button>
  );
}
export default GoogleSignin;
