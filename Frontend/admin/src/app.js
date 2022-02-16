import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { Provider } from 'react-redux';
import setAuthToken from './helpers/authToken';
import store from './redux/store';
import { loadUser } from './redux/auth/authActions';

import { ToastContainer } from 'react-toastify';

import AdminRoute from 'routes/AdminRoute';
import SuperAdminRoute from 'routes/SuperAdminRoute';

import Admin from 'views/AdminIndex';
import SuperAdmin from 'views/SuperAdminIndex';
import Profile from 'views/UserDetails';
import Login from 'views/Login';
import Register from 'views/Register';

function App({ history }) {

  if (localStorage.accessToken) {
    setAuthToken(localStorage.accessToken);
  }

  useEffect(() => {
    console.log('app')
    store.dispatch(loadUser()) 
  }, [])

  return (
    <Provider store={store}>
          <BrowserRouter>
          <ToastContainer />
            <Switch>

            <Route exact path="/" component={Login} />           
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

            <AdminRoute exact path="/admin" component={Admin} />
            <SuperAdminRoute exact path="/super-admin" component={SuperAdmin} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile" component={Profile} />

            </Switch>
        </BrowserRouter>,
    </Provider>
  );
}

export default App;