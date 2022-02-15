import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { Provider } from 'react-redux';
import setAuthToken from './helpers/authToken';
import store from './redux/store';
import { loadUser } from './redux/auth/authActions';

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

function App({ history }) {

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  useEffect(() => {
    console.log('app')
    store.dispatch(loadUser()) 
  }, [])

  return (
    <Provider store={store}>
          <BrowserRouter>
            <Switch>
            <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
            <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
            <Redirect from="/" to="/admin/index" />
            </Switch>
        </BrowserRouter>,
    </Provider>
  );
}

export default App;