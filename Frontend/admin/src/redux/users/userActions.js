import {UsermsURL} from '../../helpers/urls'
import axios from 'axios';
import { toast } from 'react-toastify';
import setAuthToken from '../../helpers/authToken';
import {
    GET_ALL_USERS,
    GET_FAIL,
    USER_UP,
    USER_DEL,
    USER_ERR,
    USER_REQ
    
} from './userTypes'


//URLS
export const ALL = () => axios.get(`${UsermsURL}/api/user`);
//export const DELU = (id) => axios.delete(`${UsermsURL}/api/users/` + id);

export const updateUser = (nom, prenom, email) => (dispatch) => {

    const config = { headers: { 'Content-Type': 'application/json', },};
    const body = JSON.stringify({ nom, prenom, email });
    dispatch({ type: USER_REQ })

    try {

        setAuthToken(localStorage.accessToken)
        const res = axios.put(`${UsermsURL}/api/user/`, body, config)
                         .catch(function (error) {
                                    if (error.response) {
                                        dispatch({
                                            type: USER_ERR,
                                            payload: res.data,
                                        });
                                        toast.error('Error !');
                                    }
                                })
                                
                                dispatch({
                                    type: USER_UP,
                                    payload: res.data,
                                });
                                toast.info("Mise a jour profil avec succès")                            
        
    } catch (error) {

        console.log(error)
        dispatch({
            type: USER_ERR,
            payload: res.data,
        });
    }

};

export const getAllUsers = () => (dispatch) => {
    ALL()
    .then((res) => {
        
        dispatch({
            type: GET_ALL_USERS,
            payload: res.data,
        });
    })
    .catch(
        (err) =>
        console.log(err),
        GET_FAIL
    )
}
/*
export const deleteUser = async(id, dispatch) =>{
    DELU(id)
    .then((res) => {
        console.log(res);
        dispatch({
            type: USER_DEL,
            payload: id,
        })
    }).catch((err) =>
    console.log(err),
    USER_ERR
    );
}
*/
