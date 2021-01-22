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

  useEffect(() => {
    const getToken = async () => {
        await dispatch(AuthActions.loadToken());
        await dispatch(AuthActions.loadUser());
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

  return (
    <div>
      {needSignIn 
        ? <LandingPage/> 
        : <DashBoard 
            panelType={panelType}
            setPanelType={setPanelType}
          />
      }
    </div>
  );
}
export default Main;