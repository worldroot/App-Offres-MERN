import { UsermsURL } from "../../helpers/urls";
import axios from "axios";
import { toast } from "react-toastify";
import setAuthToken from "../../helpers/authToken";
import {
  GET_ALL_USERS,
  GET_FAIL,
  USER_UP,
  USER_DEL,
  USER_ERR,
  USER_REQ,
  UP_PASS_DONE,
  UP_PASS_FAIL,
} from "./userTypes";

export const updateUser = (nom, prenom, email, telephone) => (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({ nom, prenom, email, telephone });
  dispatch({ type: USER_REQ });
  setAuthToken(localStorage.accessToken);
  const res = axios
    .put(`${UsermsURL}/api/user/`, body, config)
    .then((res) => {
      dispatch({
        type: USER_UP,
        payload: res.data,
      });
      toast.info("Mise a jour profil avec succès");
    })
    .catch(function (error) {
      if (error.response) {
        dispatch({
          type: USER_ERR,
          payload: res.data,
        });
        toast.error("Error !");
      }
    });
};

export const updatePassword = (password, confirmpass) => async (dispatch) => {
  if (!password || !confirmpass) {
    toast.warn("Verifier vos champs !");
  } else {
    try {
      const body = {
        password: password,
        confirmpass: confirmpass,
      };
      await axios
        .put(`${UsermsURL}/api/user/updatepwd`, body)
        .then((res) => {
          dispatch({
            type: UP_PASS_DONE,
            payload: res.data,
          });
          window.location.reload(false);
        })
        .catch(function (error) {
          //console.log(error.response.data.msg);
          toast.warn(error.response.data.msg);
        });
    } catch (error) {
      console.log(error);
      dispatch({
        type: UP_PASS_FAIL,
      });
      toast.error("Quelque chose s'est mal passé !");
    }
  }
};
