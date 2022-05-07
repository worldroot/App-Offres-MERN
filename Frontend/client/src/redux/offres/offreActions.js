import {
  GET_OFFRE_S,
  GET_OFFRE_F,
  GET_DEMANDE_S,
  GET_ONE,
  GET_OFFDEMS
} from "./offreTypes";

import axios from "axios";
import { OffremsURL } from "helpers/urls";
import setAuthToken from '../../helpers/authToken';


//Actions
export const Fetch = () => axios.get(`${OffremsURL}/api/offre/allpublished`);
export const allOffres = () => (dispatch) => {
  Fetch()
    .then((res) => {
      dispatch({
        type: GET_OFFRE_S,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err), GET_OFFRE_F);
};

export const FetchOfDe = () => axios.get(`${OffremsURL}/api/offre/alldemandes`);
export const allOffDems = () => (dispatch) => {
  FetchOfDe()
    .then((res) => {
      dispatch({
        type: GET_OFFDEMS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err), GET_OFFRE_F);
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
  setAuthToken(localStorage.accessToken)
  FetchDem()
    .then((res) => {
      dispatch({
        type: GET_DEMANDE_S,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err), GET_OFFRE_F);
};

export const DL = (id) => axios.delete(`${OffremsURL}/api/demande/` + id);
export const deleteOffre = async (id, dispatch) => {
  DL(id)
    .then((res) => {
      dispatch({
        type: OFFRE_DELETED,
        payload: id,
      });
    })
    .catch(function(error) {
      OFFRE_ERROR,
      console.log(error),
      toast.warn(error.response.data.msg) 
    })
};





