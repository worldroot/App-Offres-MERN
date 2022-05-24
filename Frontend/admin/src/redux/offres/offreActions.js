import {
  GET_OFFRE_S,
  GET_OFFRE_F,
  OFFRE_ADDED,
  OFFRE_ARCHIVED,
  OFFRE_UPDATED,
  OFFRE_DELETED,
  OFFRE_ERROR,
  GET_OFFRE,
  GET_OFFDEMS,
  GET_OFFDEMS_S,
  GET_OFFDEMS_F,
  DECRYPTING,
  DECRYPTING_S,
  DECRYPTING_F,
  OFFRE_ADD_FAILED,
  LOADING_OFFRE,
} from "./offreTypes";

import { OffremsURL } from "helpers/urls";
import setAuthToken from "helpers/authToken";
import { toast } from "react-toastify";
import axios from "axios";

//Actions
export const Fetch = () => axios.get(`${OffremsURL}/api/offre/all`);
export const allOffres = () => (dispatch) => {
  dispatch({ type: GET_OFFRE });

  Fetch()
    .then((res) => {
      dispatch({
        type: GET_OFFRE_S,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err), GET_OFFRE_F);
};

export const addOffre = (offre) => {
  const data = {
    titre: offre.titre,
    description: offre.description,
    image: offre.image,
    dateDebut: offre.dateDebut,
    dateFin: offre.dateFin,
    prixdebut: offre.prixdebut,
    souscategory: offre.souscategory,
  };

  if (
    !data.titre ||
    !data.description ||
    !data.image ||
    !data.dateDebut ||
    !data.dateFin ||
    !data.souscategory
  ) {
    toast.warn("Verifier vos champs !");
  } else {
    return (dispatch) => {
      dispatch({ type: LOADING_OFFRE });
      setAuthToken(localStorage.accessToken);
      return axios
        .post(`${OffremsURL}/api/offre/`, data)
        .then((res) => {
          dispatch({
            type: OFFRE_ADDED,
            payload: res.data,
          });
        })
        .catch((err) => dispatch({ type: OFFRE_ADD_FAILED }));
    };
  }
};

export const UPO = (id, updated) =>
  axios.put(`${OffremsURL}/api/offre/` + id, updated);
export const updateOffre = (id, data) => (dispatch) => {
  setAuthToken(localStorage.accessToken);
  UPO(id, data)
    .then((res) => {
      dispatch({
        type: OFFRE_UPDATED,
        payload: res.data,
      });
      toast.success("Mis à jour avec succés");
    })
    .catch((err) => toast.error(err.response.data.msg), OFFRE_ERROR);
};

export const DL = (id) => axios.delete(`${OffremsURL}/api/offre/` + id);
export const deleteOffre = async (id, dispatch) => {
  DL(id)
    .then((res) => {
      dispatch({
        type: OFFRE_DELETED,
        payload: id,
      });
    })
    .catch(function (error) {
      OFFRE_ERROR, console.log(error), toast.warn(error.response.data.msg);
    });
};

export const FetchOffDems = () =>
  axios.get(`${OffremsURL}/api/offre/alldemandes`);
export const allOffresDems = () => (dispatch) => {
  dispatch({ type: GET_OFFDEMS });
  setTimeout(() => {
    FetchOffDems()
      .then((res) => {
        dispatch({
          type: GET_OFFDEMS_S,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err), GET_OFFDEMS_F),
      1000;
  });
};

export const DecDems = (id, updated) => axios.put(`${OffremsURL}/api/demande/` + id, updated);
export const decryptDemande = (id, data) => (dispatch) => {
  dispatch({ type: DECRYPTING });
  setAuthToken(localStorage.accessToken);
  DecDems(id, data)
    .then((res) => {
      dispatch({
        type: DECRYPTING_S,
        payload: res.data,
      });
      toast.success("Demande décryptée avec succés");
    })
    .catch((err) => toast.error(err.response.data.msg), DECRYPTING_F);
};
