import { UsermsURL } from "../../helpers/urls";
import setAuthToken from "helpers/authToken";
import axios from "axios";
import { toast } from "react-toastify";
import { Redirect, useHistory } from "react-router-dom";
import decode from "jwt-decode";

import {
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT,
  SET_LOADING,
  ERROR,
  REFTOKEN_ERROR,
  REFTOKEN_IS_SET,
} from "./authTypes";

export const loadUser = () => async (dispatch) => {
  if (localStorage.accessToken) {
    setAuthToken(localStorage.accessToken);
  }

  try {
    const res = await axios.get(`${UsermsURL}/api/access/getuser`);
    localStorage.setItem("user", JSON.stringify(res.data));

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR,
    });
  }
};

export const register =
  ({ nom, prenom, email, password, role }) =>
  async (dispatch) => {
    // Config header for axios
    const config = { headers: { "Content-Type": "application/json" } };
    // Set body
    const body = JSON.stringify({
      nom,
      prenom,
      email,
      password,
      role,
    });

    dispatch({ type: SET_LOADING });

    try {
      // Response
      const res = await axios.post(
        `${UsermsURL}/api/access/register`,
        body,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
      toast.success("Inscription avec succès");
    } catch (err) {
      toast.error("Error !");
      localStorage.clear();
      console.log(err);
      dispatch({ type: REGISTER_FAIL });
    }
  };

export const login =
  ({ email, password, OneSignalID }) =>
  async (dispatch) => {
    // Config header for axios
    const config = { headers: { "Content-Type": "application/json" } };

    if (!email) {
      toast.warn("Verifier votre e-mail");
    }
    if (!password) {
      toast.warn("Verifier votre mot de passe");
    }

    // Set body
    const body = JSON.stringify({
      email,
      password,
      OneSignalID
    });
    dispatch({ type: SET_LOADING });
    try {
      const res = await axios
        .post(`${UsermsURL}/api/access/login`, body, config)
        .catch(function (error) {
          //console.log(error.response.data.msg);
          toast.error(error.response.data.msg);
        });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
      toast.success("Connecté avec succès");
    } catch (err) {
      console.log(err);
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

export const logout = (OneSignalID) => async (dispatch) => {
  try {
    setAuthToken(localStorage.accessToken);
    await axios
      .put(`${UsermsURL}/api/user/osid`, { OneSignalID: OneSignalID })
      .then((res) => {
        dispatch({ type: LOGOUT })
        localStorage.clear(); 
      })
      .catch((err) => console.log(err), ERROR, localStorage.clear());
  } catch (error) {
    console.log(error);
    dispatch({
      type: ERROR,
    });
  }
};

export const refreshJwt =
  ({ refreshToken }) =>
  async (dispatch) => {
    // Config header for axios
    const config = { headers: { "Content-Type": "application/json" } };
    // Set body
    const body = JSON.stringify({ refreshToken });

    dispatch({ type: SET_LOADING });

    try {
      // Response
      const res = axios.post(
        `${UsermsURL}/api/access/refresh-token`,
        body,
        config
      );
      const { data } = await res;
      //console.log(data)

      dispatch({
        type: REFTOKEN_IS_SET,
        payload: data,
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: REFTOKEN_ERROR });
    }
  };

/**
 *
       
        if(localStorage.expiresIn * 1000 < new Date().getTime()){
            //refresh-token
            const res = await axios.post(`${UsermsURL}/api/access/refresh-token`, localStorage.accessToken)
            console.log(localStorage.expiresIn* 1000)
            dispatch({
                type: REFTOKEN_IS_SET,
                payload: res.data,
            })
        }else{
            dispatch({
                type: REFTOKEN_ERROR
            })
        }
 */
