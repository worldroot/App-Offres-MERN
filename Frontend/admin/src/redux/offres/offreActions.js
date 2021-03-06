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
  GET_OFFREPUB,
  GET_OFFREPUB_S,
  GET_OFFREPUB_F,
  GET_DEMS,
  GET_DEMS_S,
  GET_DEMS_F,
} from "./offreTypes";

import { OffremsURL } from "helpers/urls";
import setAuthToken from "helpers/authToken";
import { toast } from "react-toastify";
import axios from "axios";

//Actions
export const Fetch = () => axios.get(`${OffremsURL}/api/offre/all`);
export const allOffres = () => (dispatch) => {
  dispatch({ type: GET_OFFRE });
  setTimeout(() => {
    Fetch()
      .then((res) => {
        dispatch({
          type: GET_OFFRE_S,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err), GET_OFFRE_F);
  }, 2000);
};

export const allPub = () => (dispatch) => {
  dispatch({ type: GET_OFFREPUB });
  setTimeout(() => {
    return axios
      .get(`${OffremsURL}/api/offre/allpublished`)
      .then((res) => {
        dispatch({
          type: GET_OFFREPUB_S,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err), GET_OFFREPUB_F);
  }, 1000);
};

export const addOffre = (offre) => async (dispatch) => {
  const data = {
    titre: offre.titre,
    description: offre.description,
    image: offre.image,
    dateDebut: offre.dateDebut,
    dateFin: offre.dateFin,
    prixdebut: offre.prixdebut,
    souscategory: offre.souscategory,
    responsable: {
      email: offre.responsable.email,
      _id: offre.responsable._id,
      OneSignalID: offre.responsable.OneSignalID,
    },
  };

  if (
    !data.titre ||
    !data.description ||
    !data.image ||
    !data.dateDebut ||
    !data.dateFin ||
    !data.souscategory ||
    !data.responsable
  ) {
    toast.warn("Verifier vos champs !");
  } else {
    dispatch({ type: LOADING_OFFRE });
    setAuthToken(localStorage.accessToken);
    axios
      .post(`${OffremsURL}/api/offre/`, data)
      .then((res) => {
        //console.log(res);
        dispatch({
          type: OFFRE_ADDED,
          payload: res.data,
        });
      })
      .catch(() => {
        dispatch({ type: OFFRE_ADD_FAILED });
      });
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
      toast.success("Mis ?? jour avec succ??s");
    })
    .catch((err) => toast.error(err.response.data.msg), OFFRE_ERROR);
};

export const UPS = (id) =>
  axios.put(`${OffremsURL}/api/offre/changestatus`, { id: id });
export const updateStatus = (id) => (dispatch) => {
  setAuthToken(localStorage.accessToken);
  UPS(id)
    .then((res) => {
      dispatch({
        type: OFFRE_UPDATED,
        payload: res.data,
      });
      toast.info("Mis ?? jour de status avec succ??s");
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

export const FetchDems = () => axios.get(`${OffremsURL}/api/demande/all`);
export const allDems = () => (dispatch) => {
  dispatch({ type: GET_DEMS });
  setTimeout(() => {
    FetchDems()
      .then((res) => {
        dispatch({
          type: GET_DEMS_S,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err), GET_DEMS_F);
  }, 1000);
};

export const DecDems = (id, updated) =>
  axios.put(`${OffremsURL}/api/demande/` + id, updated);
export const decryptDemande = (id, data) => (dispatch) => {
  dispatch({ type: DECRYPTING });
  setAuthToken(localStorage.accessToken);
  DecDems(id, data)
    .then((res) => {
      dispatch({
        type: DECRYPTING_S,
        payload: res.data,
      });
      toast.success("Demande d??crypt??e avec succ??s");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    })
    .catch(
      (err) => toast.error(err.response.data.msg),
      dispatch({ type: DECRYPTING_F })
    );
};
