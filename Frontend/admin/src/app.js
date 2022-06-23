import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect, useHistory } from "react-router-dom";

import { Provider } from 'react-redux';
import setAuthToken from './helpers/authToken';
import store from './redux/store';
import { loadUser } from './redux/auth/authActions';

import { ToastContainer } from 'react-toastify';
import OneSignal from "react-onesignal";

import AdminRoute from 'routes/AdminRoute';
import SuperRoute from 'routes/SuperAdminRoute';

import Admin from 'views/AdminIndex';
import SuperAdmin from 'views/SuperAdminIndex';
//import Profile from 'views/UserDetails';
import Login from 'views/Login';
import Register from 'views/Register';
import usersList from 'views/users/usersList';
import categoriesList from 'views/categories/categoriesList';
import offreList from 'views/offres/offreList';
import offreListdems from 'views/offres/offreListdems';

function App() {

  let history = useHistory()
  if (localStorage.accessToken) {
    setAuthToken(localStorage.accessToken);
  }else{
    <Redirect to="/login" />
  }

  useEffect(() => {
    console.log('app')
    //store.dispatch(loadUser()) 
  }, [])


  useEffect(() => {
    OneSignal.init({
      appId: "ce9b6483-0272-4f13-8560-e6c628f65776",
    });
  }, []);


  return (
    <Provider store={store}>
          <BrowserRouter>
          <ToastContainer position="bottom-right" />
            <Switch>

            <Route exact path="/" component={Login} />           
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

            <AdminRoute exact path="/admin" component={Admin} />
            <SuperRoute exact path="/super-admin" component={SuperAdmin} />

            <Route exact path="/userslist" component={usersList} />
            <Route exact path="/offreslist" component={offreList} />
            <AdminRoute exact path="/demandes" component={offreListdems} />
            <Route exact path="/categorieslist" component={categoriesList} />
            <Redirect from="/" to="/login" />
            
            </Switch>
        </BrowserRouter>
    </Provider>
  );
}

export default App;