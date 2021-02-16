import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as AuthActions from '../actions/authentication';
import LandingPage from './landingPage/LandingPage.js';
import DashBoard from './dashboard/DashBoard.js';
import '../styles/main.css';


const Main = () => {
  const dispatch = useDispatch();
  const needSignIn = useSelector(state => !state.authentication.token);
  const [panelType, setPanelType] = useState('feed');
  const [modalData, setModalData] = useState({ "productId": null, "showModal": false });
  const [landingBlurSupported, setLandingBlurSupported] = useState(null);

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
      {needSignIn 
        ? <LandingPage landingBlurSupported={landingBlurSupported}/> 
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