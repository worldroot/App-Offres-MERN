
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
    ERROR
 } from './authTypes'



export const loadUser = () => async (dispatch) => {

    if (localStorage.accessToken) {
        setAuthToken(localStorage.accessToken)
    }

    try {
        const res = await axios.get(`${UsermsURL}/api/access/getuser`);
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        console.log(error.response)
        dispatch({
            type: ERROR
        })
    }
}

export const register = ({
    nom,
    prenom,
    email,
    password
}) => async (dispatch) => {
    // Config header for axios
    const config = { headers: { 'Content-Type': 'application/json', },};
    // Set body
    const body = JSON.stringify({
        nom,
        prenom,
        email,
        password
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

    } catch (err) {

        toast.error('Error !');
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
        
        const res = await axios.post(`${UsermsURL}/api/access/login`, body, config)
        if(!res){
            toast.error('Error !');
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
        toast.error("Quelque chose s'est mal passé !")
        dispatch({
            type: LOGIN_FAIL
        })
    }
};


export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
    return <Redirect to='/login'/>

}

