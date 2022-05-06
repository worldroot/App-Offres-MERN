import {
  GET_OFFRE_S,
  GET_OFFRE_F,
} from "./offreTypes";

import { OffremsURL } from "helpers/urls";
import axios from "axios";

//Actions
export const Fetch = () => axios.get(`${OffremsURL}/api/offre/all`);
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





