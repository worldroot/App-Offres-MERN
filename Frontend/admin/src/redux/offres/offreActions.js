import {
    GET_OFFRE_S,
    GET_OFFRE_F,
    OFFRE_ADDED,
    OFFRE_ARCHIVED,
    OFFRE_UPDATED,
    OFFRE_DELETED,
    OFFRE_ERROR
} from "./offreTypes"


import { OffremsURL } from 'helpers/urls'
import setAuthToken from 'helpers/authToken';
import { toast } from 'react-toastify';
import axios from 'axios';

//Actions
export const Fetch = () => axios.get(`${OffremsURL}/api/offre/all`);
export const allOffres = () => (dispatch) => {
    Fetch()
    .then((res) => {
        
        dispatch({
            type: GET_OFFRE_S,
            payload: res.data,
        })
    })
    .catch(
        (err) =>
        console.log(err),
        GET_OFFRE_F
    );
};

export const createSousSuccess = (data) => {
    return {
      type: OFFRE_ADDED,
      payload: data,
    };
};
export const addOffre = (offre) => {
    const data ={ titre: offre.titre,
                  description: offre.description,
                  image: offre.image, 
                  dateDebut: offre.dateDebut, 
                  dateFin: offre.dateFin, 
                  souscategory: offre.souscategory}

    if(!data.titre || !data.description || !data.image || !data.dateDebut || !data.dateFin || !data.souscategory ) {
            toast.warn('Verifier vos champs !');
      }

      else{
        return(dispatch) => {

            setAuthToken(localStorage.accessToken)
            return axios.post(`${OffremsURL}/api/offre/`, data)
                    .then((res) => { res.data

                    const ndata = { data };
                    dispatch(createSousSuccess(ndata));
                    toast.success('Ajouté avec succès');
            
                  }).catch((err) =>
                        toast.error('Erreur !'),
                        OFFRE_ERROR
                        );
      }
        
    }
};

export const UPO = (id, updated) => axios.put(`${OffremsURL}/api/offre/` + id, updated);
export const updateSousCat = (id, data) => (dispatch) => {
    setAuthToken(localStorage.accessToken)
    UPO(id,data)
    .then((res) => {
        
        dispatch({
            type: OFFRE_UPDATED,
            payload: res.data,
        });
        toast.info('Mis à jour avec succés');
        
    }).catch((err) => 
        toast.warn(err.response.data.msg),
        OFFRE_ERROR
    );
};