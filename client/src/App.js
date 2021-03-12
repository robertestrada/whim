import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as AuthActions from './actions/authentication';
import LandingPage from './components/landingPage/LandingPage';
import DashBoard from './components/dashboard/DashBoard';
import './styles/main.css';


const App = () => {
    const dispatch = useDispatch();
    const needSignIn = useSelector(state => !state.authentication.token);
    const showSurvey = useSelector(state => state.authentication.showSurvey);

    const getToken = () => {
        dispatch(AuthActions.loadToken());
        dispatch(AuthActions.loadUser());
    }

    useEffect(() => {
        getToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={
                        needSignIn || showSurvey
                        ?   () => <LandingPage showSurvey={showSurvey}/>
                        :   () => <DashBoard/>
                    }
                />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
