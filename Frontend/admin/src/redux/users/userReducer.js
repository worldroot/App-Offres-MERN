import {
    GET_ALL_USERS,
    GET_FAIL,
    USER_UP,
    USER_DEL,
    USER_ERR,
    USER_REQ,
    USER_BAN,
    USER_BAN_FAIL,
} from './userTypes'

// Intial State
const intialState = {
    uslist: [],
    user: null
};

// Reducers
export default function (state = intialState, action) {
    const { type, payload } = action;

    switch (type) {

                case GET_ALL_USERS: 
                    return{...state, uslist:[...action.payload]}
                case USER_UP:
                    return {...state, user: action.payload };
                case USER_BAN:
                    return {...state, user: action.payload };
                case USER_DEL:
                    return{...state,
                        uslist: state.uslist.filter(u => u._id !== action.payload)}
                case USER_ERR:
                case USER_BAN_FAIL:
                case USER_REQ:
                case GET_FAIL:
                default:
                    return state;
    }
}