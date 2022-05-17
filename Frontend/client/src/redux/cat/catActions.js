import {    
    GET_CAT_F,
    GET_CAT_S,
    GET_SOUS_S,
    GET_SOUS_F,
    GET_CAT,
    GET_SOUS
} from './catTypes'

import { CatmsURL } from '../../helpers/urls'
import axios from 'axios';

export const Fetch = () => axios.get(`${CatmsURL}/api/categorie/all`);

//Actions
export const getAllCat = () => (dispatch) => {
    dispatch({type: GET_CAT})

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

//---SOUS-CATEGORIE
export const FetchSous = () => axios.get(`${CatmsURL}/api/sous-categorie/all`);
export const getAllSousCat = () => (dispatch) => {
    dispatch({type: GET_SOUS})

    FetchSous()
    .then((res) => {
        
        dispatch({
            type: GET_SOUS_S,
            payload: res.data,
        })
    })
    .catch(
        (err) =>
        console.log(err),
        GET_SOUS_F
    );
};


