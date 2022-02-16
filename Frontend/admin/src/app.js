import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { Provider } from 'react-redux';
import setAuthToken from './helpers/authToken';
import store from './redux/store';
import { loadUser } from './redux/auth/authActions';

import { ToastContainer } from 'react-toastify';
import AuthLayout from "./views/Auth";

import Adminroute from 'routes/AdminRoute';
import SuperAdminRoute from 'routes/SuperAdminRoute';

import AdminIndex from 'views/AdminIndex';
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
            <Route path="/admin" component={AdminIndex} />
            <Route path="/super-admin" component={SuperAdmin} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            </Switch>
        </BrowserRouter>,
    </Provider>
  );
}

export default App;