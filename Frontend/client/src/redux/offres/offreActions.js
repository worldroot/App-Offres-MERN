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

export const FetchDem = () => axios.get(`${OffremsURL}/api/demande/byuser`);
export const DemandesByUser = () => (dispatch) => {
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





