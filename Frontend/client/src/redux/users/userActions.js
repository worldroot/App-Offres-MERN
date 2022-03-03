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
    USER_REQ,
    UP_PASS_DONE,
    UP_PASS_FAIL
    
} from './userTypes'

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
            type: USER_ERR
        });
    }

};

export const updatePassword = (password, confirmpass) => (dispatch) =>{

        const config = { headers: { 'Content-Type': 'application/json', },};
        const body = JSON.stringify({ password, confirmpass });
    
        if(password !== confirmpass){
          toast.warn('Les mots de passe ne correspondent pas !')
        }else{
          try {
    
            const res = axios.put(`${UsermsURL}/api/user/updatepwd`, body, config)
            dispatch({
                type: UP_PASS_DONE,
                payload: res.data,
            });
            toast.success("Mot de pass modifié avec succès")
            
            } catch (error) {

                console.log(error)
                dispatch({
                    type: UP_PASS_FAIL
                });
                
                toast.error("Quelque chose s'est mal passé !")
            }
          } 

     }

