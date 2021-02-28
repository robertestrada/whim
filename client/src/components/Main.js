import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as AuthActions from '../actions/authentication';
import { baseUrl } from '../config';
import LandingPage from './landingPage/LandingPage.js';
import DashBoard from './dashboard/DashBoard.js';
import '../styles/main.css';


const Main = () => {
  const dispatch = useDispatch();
  const needSignIn = useSelector(state => !state.authentication.token);
  const showSurvey = useSelector(state => state.authentication.showSurvey);
  const [panelType, setPanelType] = useState('feed');
  const [modalData, setModalData] = useState({ "productId": null, "showModal": false });
  const [landingBlurSupported, setLandingBlurSupported] = useState(null);
  const [rcSiteKey, setRCSiteKey] = useState('');
  const [googleCreds, setGoogleCreds] = useState('');

  const handleGetSecretKeys = async () => {
    const secretsFetch = await fetch(`${baseUrl}/backend-keys`);
    const secretsJSON = await secretsFetch.json();
    setGoogleCreds({ 'client_id': secretsJSON.client_id, 'api_key': secretsJSON.api_key});
    setRCSiteKey(secretsJSON.rcSiteKey);
  };

  useEffect(() => {
    handleGetSecretKeys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (window.CSS.supports(`(filter: blur(48px)) or (-webkit-filter: blur(48px)) or (-moz-filter: blur(48px)) or (-o-filter: blur(48px)) or (-ms-filter: blur(48px))`)) {
      setLandingBlurSupported(true);
    } else {
      setLandingBlurSupported(false);
    }
  }, []);

  useEffect(() => {
    const getToken = () => {
        dispatch(AuthActions.loadToken());
        dispatch(AuthActions.loadUser());
    }
    getToken();
  }, [dispatch]);

  useEffect(() => {
    if (panelType === 'feed'){
      document.body.classList.remove('cart-visible');
    } else {
      document.body.classList.add('cart-visible');
    }
  }, [panelType]);

  useEffect(() => {
    if (modalData.showModal) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [modalData.showModal]);

  
  return (
    <div>
      { needSignIn || showSurvey
        ? <LandingPage 
            googleCreds={googleCreds}
            rcSiteKey={rcSiteKey}
            showSurvey={showSurvey} 
            landingBlurSupported={landingBlurSupported}
          /> 
        : <DashBoard 
              panelType={panelType}
              setPanelType={setPanelType}
              modalData={modalData}
              setModalData={setModalData}
            />
      }
    </div>
  );
}
export default Main;