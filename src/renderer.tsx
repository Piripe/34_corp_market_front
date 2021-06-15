import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/app';
import Market from '@/market/market';
import Error from '@/error/error';
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/">
                <App />
            </Route>
            <Router path="/market">
                <Market />
            </Router>
            <Router path="*">
                <Error />
            </Router>
        </Switch>
    </Router>, document.getElementById('root'));