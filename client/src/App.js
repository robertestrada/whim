import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { loadCart } from './actions/cart'
import Main from './components/Main.js'


function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCart())
    }, [dispatch])

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Main}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
