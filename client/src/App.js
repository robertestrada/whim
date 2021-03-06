import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as AuthActions from './actions/authentication';
import { baseUrl } from './config';
import LandingPage from './components/landingPage/LandingPage';
import DashBoard from './components/dashboard/DashBoard';
import './styles/main.css';


const App = () => {
    const dispatch = useDispatch();
    const needSignIn = useSelector(state => !state.authentication.token);
    const showSurvey = useSelector(state => state.authentication.showSurvey);

    
    const [rcSiteKey, setRCSiteKey] = useState('');
    const [googleCreds, setGoogleCreds] = useState('');

    const handleGetSecretKeys = async () => {
        const secretsFetch = await fetch(`${baseUrl}/backend-keys`);
        const secretsJSON = await secretsFetch.json();
        setGoogleCreds({ 'client_id': secretsJSON.client_id, 'api_key': secretsJSON.api_key });
        setRCSiteKey(secretsJSON.rcSiteKey);
    };

    useEffect(() => {
        handleGetSecretKeys();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);




    useEffect(() => {
        const getToken = () => {
            dispatch(AuthActions.loadToken());
            dispatch(AuthActions.loadUser());
        }
        getToken();
    }, [dispatch]);




    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={
                        needSignIn || showSurvey
                        ?   () => <LandingPage
                                googleCreds={googleCreds}
                                rcSiteKey={rcSiteKey}
                                showSurvey={showSurvey}
                            />
                        :   () => <DashBoard/>
                    }
                />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
