import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.js'
import DashBoard from './components/DashBoard.js'

import { PrivateRoute } from './utilities/authUtils'


function App() {
    const needSignIn = useSelector(state => !state.authentication.token);

    return (
        <BrowserRouter>
            <Switch>
                { needSignIn 
                    ? <Route path="/" exact component={LandingPage} />
                    : <PrivateRoute path="/" exact component={DashBoard} />
                }
            </Switch>
        </BrowserRouter>
    );
}

export default App;
