import {
  GET_OFFRE_S,
  GET_OFFRE_F,
  GET_DEMANDE_S,
  GET_ONE,
  GET_OFFDEMS,
  OFFRE_ERROR,
  DEL_DEMANDE,
  ADD_DEMANDE,
  GET_OFFRE,
  GET_OFFDEMS_S,
  GET_OFFDEMS_F,
  GET_DEMANDE,
  GET_DEMANDE_F,
} from "./offreTypes";

import axios from "axios";
import { OffremsURL } from "helpers/urls";
import setAuthToken from "../../helpers/authToken";
import { toast } from "react-toastify";

//Actions
//export const Fetch = () => axios.get(`${OffremsURL}/api/demande/filter/ofdem`);
export const allOffres = () => (dispatch) => {
  setAuthToken(localStorage.accessToken);
  dispatch({ type: GET_OFFDEMS });
  setTimeout(() => {
    return axios
      .get(`${OffremsURL}/api/demande/filter/ofdem`)
      .then((res) => {
        dispatch({
          type: GET_OFFDEMS_S,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err), GET_OFFDEMS_F);
  }, 500);
};

export const allPub = () => (dispatch) => {
  dispatch({ type: GET_OFFRE });
  setTimeout(() => {
    return axios
      .get(`${OffremsURL}/api/offre/allpublished`)
      .then((res) => {
        dispatch({
          type: GET_OFFRE_S,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err), GET_OFFRE_F);
  }, 500);
};

export const FetchOfDe = () => axios.get(`${OffremsURL}/api/offre/alldemandes`);
export const allOffDems = () => (dispatch) => {
  dispatch({ type: GET_DEMANDE });
  FetchOfDe()
    .then((res) => {
      dispatch({
        type: GET_DEMANDE_S,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err), GET_DEMANDE_F);
};

export const One = (id) => axios.get(`${OffremsURL}/api/offre/` + id);
export const getById = (id) => (dispatch) => {
  One(id)
    .then((res) => {
      dispatch({
        type: GET_ONE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err), GET_OFFRE_F);
};

export const FetchDem = () => axios.get(`${OffremsURL}/api/demande/byuser`);
export const Demandesuser = () => (dispatch) => {
  setAuthToken(localStorage.accessToken);
  FetchDem()
    .then((res) => {
      dispatch({
        type: GET_DEMANDE_S,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err), GET_OFFRE_F);
};

export const createSuccess = (data) => {
  return {
    type: ADD_DEMANDE,
    payload: data,
  };
};

export const AddDem = (demande) => {
  const data = { prix: demande.prix, offre: demande.offre };
  if (!data.prix || !data.offre) {
    toast.warn("Verifier vos champs !");
  } else {
    return (dispatch) => {
      setAuthToken(localStorage.accessToken);
      axios
        .post(`${OffremsURL}/api/demande/`, data)
        .then((res) => {
          dispatch(createSuccess(res.data));
          toast.success("Ajouté avec succès");
          /* setTimeout(() => {
            window.location.reload();
          }, 1500); */
        })
        .catch(function (error) {
          OFFRE_ERROR, console.log(error), toast.error(error.response.data.msg);
        });
    };
  }
};

export const DL = (id) => axios.delete(`${OffremsURL}/api/demande/` + id);
export const deleteDem = async (id, dispatch) => {
  DL(id)
    .then((res) => {
      dispatch({
        type: DEL_DEMANDE,
        payload: id,
      });
    })
    .catch(function (error) {
      OFFRE_ERROR, console.log(error), toast.warn(error.response.data.msg);
    });
};
