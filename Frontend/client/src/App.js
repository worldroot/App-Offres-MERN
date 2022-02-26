import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { Provider } from 'react-redux';
import setAuthToken from './helpers/authToken';
import store from './redux/store';

import { ToastContainer } from 'react-toastify';

import Login from 'views/Login';
import Register from 'views/Register';
import Home from 'views/Home'
import VerifMail from 'views/Verifmail';
import UserDetails from 'views/UserDetails';
import ForgotPass from 'views/ForgotPass';

function App() {

  if (localStorage.accessToken) {
    setAuthToken(localStorage.accessToken);
  }

  useEffect(() => {
    console.log('app')
    //store.dispatch(loadUser()) 
  }, [])

  //DARK-RED: #C11923
  //RED: #ED1A24

  return (
    <Provider store={store}>
          <BrowserRouter>
          <ToastContainer />
            <Switch>

            <Route exact path="/" component={Home}/> 
            <Route exact path="/home" component={Home}/>            
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/profile" component={UserDetails}/>
            <Route exact path="/forgot-pass/:token" component={ForgotPass}/>
            <Route path="/api/access/verify/:token" component={VerifMail}/>
            <Redirect from="/" to="/login"/>
            
            </Switch>
        </BrowserRouter>,
    </Provider>
  );
}

export default App;