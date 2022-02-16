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


 // Intial State
const intialState = {
    accessToken: localStorage.getItem('accesstoken'),
    isAuthenticated: null,
    loading: true,
    user: null,
};

// Reducers
export default function (state = intialState, action) {
    const { type, payload } = action;

    switch (type) {

                case USER_LOADED:
                    return {
                            ...state,
                            user: payload,
                            isAuthenticated: true,
                            loading: false,
                    };
                case REGISTER_SUCCESS:
                case LOGIN_SUCCESS:
                        // Set Token in localstorage
                        localStorage.setItem('accessToken', payload.accessToken);
                        return {
                            ...state,
                            ...payload,
                            isAuthenticated: true,
                            loading: false,
                        };
                case SET_LOADING:
                    return {
                        ...state,
                        loading: true
                    };
                case REGISTER_FAIL:
                case LOGIN_FAIL:
                case AUTH_ERROR:
                case ERROR:
                case LOGOUT:
                    // Remove Token in localstorage
                    localStorage.removeItem('accessToken');
                    return {
                        ...state,
                        accessToken: null,
                        isAuthenticated: false,
                        loading: false,
                        user: null
                    };
                default:
                    return state;
    }
}