import React, { useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as AuthActions from '../actions/authentication';
import LandingPage from './LandingPage.js';
import DashBoard from './DashBoard.js';


const Main = () => {
  const dispatch = useDispatch();
  const needSignIn = useSelector(state => !state.authentication.token);

  useEffect(() => {
    const getToken = async () => {
        await dispatch(AuthActions.loadToken());
        await dispatch(AuthActions.loadUser());
    }
    getToken();
  }, [dispatch]);

  return (
    <>
      {needSignIn ? <LandingPage/> : <DashBoard/>}
    </>
  );
}
export default Main;