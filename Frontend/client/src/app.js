import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { Provider } from "react-redux";
import setAuthToken from "./helpers/authToken";
import store from "./redux/store";

import { ToastContainer } from "react-toastify";
import OneSignal from "react-onesignal";

import Login from "views/Login";
import Register from "views/Register";
import Home from "views/Home";
import page404 from "components/Loading/PageNotFound";
import VerifMail from "views/Verifmail";
import UserDetails from "views/UserDetails";
import ForgotPass from "views/ForgotPass";
import ResetPass from "views/ResetPass";
import UserRoute from "routes/UserRoute";

import { refreshJwt } from "redux/auth/authActions";
import decode from "jwt-decode";
import offresListPub from "views/offres/offresList-pub";

function App() {
  const userExist = localStorage.getItem("user");
  const [userLocal] = useState(() => {
    const saved = localStorage.getItem("user");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  if (localStorage.accessToken) {
    setAuthToken(localStorage.accessToken);
  }

  useEffect(() => {
    console.log("app");
    //store.dispatch(loadUser())
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const refreshToken = localStorage.getItem("refreshToken");
      const decodedToken = decode(accessToken);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        store.dispatch(refreshJwt({ refreshToken }));
        window.location.reload();
      }
    }
  }, []);

  useEffect(() => {
    if (userExist) {
      if (userLocal.OneSignalID.length === 0) {
        OneSignal.init({
          appId: "10d0d189-e8bd-413a-b51b-becc098b1617",
        });
        OneSignal.getUserId((userId) => {
          console.log(userId);
        });
        console.log("OneSignal On");
      } else {
        console.log("OneSignal userId Exist");
      }
    } else {
      console.log("OneSignal Off");
    }
    /* 
    OneSignal.getUserId((userId) => {
      console.log(userId);
    }); */
  }, [userExist]);

  //DARK-RED: #C11923
  //RED: #ED1A24

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ToastContainer position="bottom-right" />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/404" component={page404} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot-pass" component={ForgotPass} />
          <Route exact path="/reset-pass/:token" component={ResetPass} />
          <Route path="/api/access/verify/:token" component={VerifMail} />
          <Route exact path="/published-offres" component={offresListPub} />

          <UserRoute exact path="/profile" component={UserDetails} />
          <Redirect from="/" to="/404" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
