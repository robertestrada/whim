import React from "react";
import { useSelector } from 'react-redux';
import LandingPage from './LandingPage.js'
import DashBoard from './DashBoard.js'

function Main() {
  const needSignIn = useSelector(state => !state.authentication.token);

  return (
    <>
      {needSignIn ? <LandingPage/> : <DashBoard/>}
    </>
  );
}
export default Main;