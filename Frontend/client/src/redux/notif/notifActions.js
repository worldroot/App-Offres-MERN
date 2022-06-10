import axios from "axios";
import { NotifmsURL } from "helpers/urls";
import setAuthToken from "../../helpers/authToken";
import {
  GET_NOTIF_F,
  GET_NOTIF_S,
  LOADIN_NOTIF,
  NOTIF_DEL,
  NOTIF_ERROR,
  NOTIF_SEEN,
} from "./notifTypes";

export const all = () => axios.get(`${NotifmsURL}/api/notif/user`);
export const getUserNotif = () => (dispatch) => {
  dispatch({ type: LOADIN_NOTIF });
  setAuthToken(localStorage.accessToken);
  all()
    .then((res) => {
      dispatch({
        type: GET_NOTIF_S,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err), GET_NOTIF_F);
};

export const upnotif = (id) =>
  axios.put(`${NotifmsURL}/api/notif/`, { id: id });
export const updateSeen = (id) => (dispatch) => {
  upnotif(id)
    .then((res) => {
      dispatch({
        type: NOTIF_SEEN,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err), NOTIF_ERROR);
};

export const deleteNotif = (id) => async (dispatch) => {
  await axios
    .delete(`${NotifmsURL}/api/notif/` + id)
    .then((res) => {
      dispatch({
        type: NOTIF_DEL,
        payload: { id: id },
      });
    })
    .catch((err) => console.log(err), NOTIF_ERROR);
};
