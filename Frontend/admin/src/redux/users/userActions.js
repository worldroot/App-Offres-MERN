import {UsermsURL} from '../../helpers/urls'
import axios from 'axios';
import { toast } from 'react-toastify';
import setAuthToken from '../../helpers/authToken';
import {
    GET_ALL_USERS,
    GET_FAIL,
    USER_UP,
    USER_DEL,
    USER_BAN,
    USER_BAN_FAIL,
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
    //localStorage.removeItem('user')

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
                            
                                //localStorage.setItem('user', JSON.stringify(res.data));
                                //localStorage.setItem('user', res.data);
                                toast.info("Mise a jour profil avec succès")                            
        
    } catch (error) {

        console.log(error)
        dispatch({
            type: USER_ERR,
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

export const BanMe = (id, updated) => axios.put(`${UsermsURL}/api/user/ban/` + id, updated);
export const banUser = (id, data) => (dispatch) => {
    setAuthToken(localStorage.accessToken)
    BanMe(id,data)
    .then((res) => {
        
        dispatch({
            type: USER_BAN,
            payload: res.data,
        });
        toast.success('Mis à jour avec succés');
        console.log(id, data.banned)
        
    }).catch((err) => 
        console.log(err),
        //toast.error('Erreur '),
        USER_BAN_FAIL
    );
};
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
