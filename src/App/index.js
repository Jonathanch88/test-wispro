import React from 'react';
import {  Router , Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions/alertActions';
import { PrivateRoute } from '../_components/PrivateRoute';


import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';

const App = (state) => {
       
    history.listen((location, action) => {
    state.clearAlerts();
    });
       
    return (
        <div className='container'>
            <div >
                <div >
                    {state.alert.message &&
                        <div className={`alert ${state.alert.type}`}>{state.alert.message}</div>
                    }
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    );
}

const mapState = (state) => {
    const { alert } = state;
    return { alert };
}
const actionCreators = {
    clearAlerts: alertActions.clear
};
const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };