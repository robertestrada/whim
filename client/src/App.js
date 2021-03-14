import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as AuthActions from './actions/authentication';
import LandingPage from './components/landingPage/LandingPage';
import DashBoard from './components/dashboard/DashBoard';


const App = () => {
    const dispatch = useDispatch();
    const needSignIn = useSelector(state => !state.authentication.token);
    const showSurvey = useSelector(state => state.authentication.showSurvey);

    const getToken = () => {
        dispatch(AuthActions.loadTokenUser());
    }

    useEffect(() => {
        getToken();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <BrowserRouter>
            <Switch>
                <Route path="/feed/:tab">
                    <DashBoard/>
                </Route>
                <Route path="/" exact render={
                        showSurvey || needSignIn
                        ?   () => <LandingPage showSurvey={showSurvey}/>
                        :   () => <DashBoard/>
                    }
                />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
