import {    
    GET_CAT_F,
    GET_CAT_S,
    ADD_CAT,
    UP_CAT,
    DELETE_CAT,
    CAT_ERR,
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

