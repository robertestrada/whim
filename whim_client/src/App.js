import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './components/Main.js'


function App() {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
