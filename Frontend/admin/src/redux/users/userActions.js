import {UsermsURL} from '../../helpers/urls'
import axios from 'axios';
import { toast } from 'react-toastify';

import {
    GET_ALL_USERS,
    GET_FAIL,
    USER_UP,
    USER_DEL,
    USER_ERR,
    
} from './userTypes'


//URLS
export const ALL = () => axios.get(`${UsermsURL}/api/user`);
export const UP = (id, updated) => axios.put(`${UsermsURL}/api/user/` + id, updated);
//export const DELU = (id) => axios.delete(`${UsermsURL}/api/users/` + id);

export const updateUser = (id, data) => (dispatch) => {
    UP(id,data)
    .then((res) => {
        console.log(res);
        dispatch({
            type: USER_UP,
            payload: res.data,
        });
    }).catch((err) => 
        console.log(err),
        UPDATE_ERROR
    );
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
