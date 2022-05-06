import {
  GET_OFFRE_S,
  GET_OFFRE_F,
  GET_DEMANDE_S,
  GET_DEMANDE_F,
  DEMANDE_ERROR
} from "./offreTypes";

import { OffremsURL } from "helpers/urls";
import setAuthToken from '../../helpers/authToken';
import axios from "axios";

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

export const One = (id) => axios.get(`${OffremsURL}/api/offre/` + id);
export const getByID = () => (dispatch) => {
  One(id)
    .then((res) => {
      dispatch({
        type: GET_OFFRE_S,
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





