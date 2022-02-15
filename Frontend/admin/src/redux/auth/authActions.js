
import {UsermsURL} from '../../helpers/urls'
import AuthToken from 'helpers/authToken'
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
    USER_LOADED,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_ERROR,
    LOGOUT,
    SET_LOADING
 } from './authTypes'


export const loadUser = () => async (dispatch) => {

    if (localStorage.token) {
        AuthToken(localStorage.token)
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
            type: AUTH_ERROR
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
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Set body
    const body = JSON.stringify({
        nom,
        prenom,
        email,
        password
    });

    dispatch({
        type: SET_LOADING
    })
    try {
        // Response 
        const res = await axios.post(`${UsermsURL}/api/access/register`, body, config)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error => toast.error(error.msg))
        }

        dispatch({
            type: REGISTER_FAIL
        })
    }
};

export const login = ({
    email,
    password
}) => async (dispatch) => {
    // Config header for axios
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

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

    dispatch({
        type: SET_LOADING
    })
    try {
        // Response 
        const res = await axios.post(`${UsermsURL}/api/access/login`, body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(error => toast.error(error.msg))
        }

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
