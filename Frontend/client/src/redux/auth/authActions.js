import {UsermsURL} from '../../helpers/urls'
import setAuthToken from 'helpers/authToken';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom'

import { 
    USER_LOADED,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_ERROR,
    LOGOUT,
    SET_LOADING,
    ERROR,
    REFTOKEN_ERROR,
    REFTOKEN_IS_SET,
 } from './authTypes'



export const loadUser = () => async (dispatch) => {

    if (localStorage.accessToken) {
        setAuthToken(localStorage.accessToken)
    }

    try {

        const res = await axios.get(`${UsermsURL}/api/access/getuser`);
        localStorage.setItem('user', JSON.stringify(res.data));
        
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: ERROR
        })
    }
}

export const register = ({
    nom,
    prenom,
    email,
    password,
    role
}) => async (dispatch) => {
    // Config header for axios
    const config = { headers: { 'Content-Type': 'application/json', },};
    // Set body
    const body = JSON.stringify({
        nom,
        prenom,
        email,
        password,
        role
    });
    
    dispatch({ type: SET_LOADING })

    try {
        // Response 
        const res = await axios.post(`${UsermsURL}/api/access/register`, body, config)
  
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            dispatch(loadUser())
            toast.success("Inscription avec succès")
            toast.info("Vérifiez votre email pour activer votre compte")
    } catch (err) {

        toast.error("Inscription: Quelque chose s'est mal passé !");
        console.log(err)
        dispatch({ type: REGISTER_FAIL })
    }
};

export const login = ({
    email,
    password
}) => async (dispatch) => {
    // Config header for axios
    const config = { headers: { 'Content-Type': 'application/json', }, };

    if(!email){
        toast.warn("Verifier votre e-mail")
    }
    if(!password){
        toast.warn("Verifier votre mot de passe")
    }

    // Set body
    const body = JSON.stringify({
        email,
        password
    });
    dispatch({ type: SET_LOADING  })
    
    try {

        const res = await axios.post(`${UsermsURL}/api/access/loginuser`, body, config)
        if(!res){
            toast.error("Login: Quelque chose s'est mal passé !");
        }else{
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            dispatch(loadUser())
            toast.success('Connecté avec succès');   
        }
        
    } catch (err) {
        console.log(err)
        toast.error("Accès refusé: Vérifiez si votre compte est actif !")
        dispatch({
            type: LOGIN_FAIL
        })
    }
};


export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}

export const refreshJwt = ({
    refreshToken
}) => async (dispatch) => {
    // Config header for axios
    const config = { headers: { 'Content-Type': 'application/json', },};
    // Set body
    const body = JSON.stringify({ refreshToken });
    
    dispatch({ type: SET_LOADING })

    try {
        // Response 
        const res =  axios.post(`${UsermsURL}/api/access/refresh-token`, body, config)  
       
            dispatch({
                type: REFTOKEN_IS_SET,
                payload: res.data
            })

            dispatch(loadUser())
           
    } catch (err) {
        
        console.log(err)
        dispatch({ type: REFTOKEN_ERROR })
    }
};

