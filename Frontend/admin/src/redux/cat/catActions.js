import {    
    GET_CAT_F,
    GET_CAT_S,
    ADD_CAT,
    UP_CAT,
    DELETE_CAT,
    CAT_ERR,
    GET_SOUS_S,
    GET_SOUS_F,
    ADD_SOUS,
    UP_SOUS,
    DEL_SOUS,
    ERR_SOUS
} from './catTypes'

import { CatmsURL } from '../../helpers/urls'
import setAuthToken from '../../helpers/authToken';
import { toast } from 'react-toastify';
import axios from 'axios';

export const Fetch = () => axios.get(`${CatmsURL}/api/categorie/all`);
export const UPC = (id, updated) => axios.put(`${CatmsURL}/api/categorie/` + id, updated);
export const DLC = (id) => axios.delete(`${CatmsURL}/api/categorie/` + id);

//Actions
export const getAllCat = () => (dispatch) => {
    Fetch()
    .then((res) => {
        
        dispatch({
            type: GET_CAT_S,
            payload: res.data,
        })
    })
    .catch(
        (err) =>
        console.log(err),
        GET_CAT_F
    );
};

export const createSuccess = (data) => {
    return {
      type: ADD_CAT,
      payload: data,
    };
};

export const addCat = (category) => {
    const data ={ nomcat : category.nomcat }

    return(dispatch) => {
        setAuthToken(localStorage.accessToken)
        
        return axios
        .post(`${CatmsURL}/api/categorie/`, data)
        .then((res) => { res.data

            const ndata = { nomcat : data.nomcat, };
            dispatch(createSuccess(ndata));
            toast.success('Ajouté avec succès');
            
        }).catch((err) =>
            toast.error('ERR'),
            CAT_ERR
            );
    }
};

export const deleteCat = async(id, dispatch) => {
    DLC(id)
    .then((res) => {
        dispatch({
            type: DELETE_CAT,
            payload: id,
        });
        toast.error(`Supprimé avec succès !`);
    }).catch((err) => 
        console.log(err),
        CAT_ERR
    );
};

export const updateCat = (id, data) => (dispatch) => {
    setAuthToken(localStorage.accessToken)
    UPC(id,data)
    .then((res) => {
        
        dispatch({
            type: UP_CAT,
            payload: res.data,
        });
        toast.info('Mis à jour avec succés');
        console.log(id, data)
        
    }).catch((err) => 
        console.log(err),
        CAT_ERR
    );
};


//---SOUS-CATEGORIE
export const createSousSuccess = (data) => {
    return {
      type: ADD_SOUS,
      payload: data,
    };
};
export const addSousCat = (souscategory) => {
    const data ={ category: souscategory.category ,sousnomcat : souscategory.sousnomcat }

    return(dispatch) => {
        setAuthToken(localStorage.accessToken)
        
        return axios.post(`${CatmsURL}/api/sous-categorie/`, data)
                    .then((res) => { res.data

            const ndata = { category: data.category ,sousnomcat : data.sousnomcat, };
            dispatch(createSousSuccess(ndata));
            toast.success('Ajouté avec succès');
            
        }).catch((err) =>
            toast.error('ERR'),
            ERR_SOUS
            );
    }
};

export const DLSous = (id) => axios.delete(`${CatmsURL}/api/sous-categorie/` + id);
export const deleteSousCat = async(id, dispatch) => {
    DLSous(id)
    .then((res) => {
        dispatch({
            type: DEL_SOUS,
            payload: id,
        });
        toast.error(`Supprimé avec succès !`);
    }).catch((err) => 
        console.log(err),
        ERR_SOUS
    );
};

export const UPSous = (id, updated) => axios.put(`${CatmsURL}/api/sous-categorie/` + id, updated);
export const updateSousCat = (id, data) => (dispatch) => {
    setAuthToken(localStorage.accessToken)
    UPSous(id,data)
    .then((res) => {
        
        dispatch({
            type: UPSous,
            payload: res.data,
        });
        toast.info('Mis à jour avec succés');
        console.log(id, data)
        
    }).catch((err) => 
        console.log(err),
        ERR_SOUS
    );
};

