import {
    GET_ALL_USERS,
    GET_FAIL,
    USER_UP,
    USER_DEL,
    USER_ERR,

} from './userTypes'

// Intial State
const intialState = {
    uslist: [],
};

// Reducers
export default function (state = intialState, action) {
    const { type } = action;

    switch (type) {

                case GET_ALL_USERS: 
                    return{...state, uslist:[...action.payload]}
                case USER_UP:
                    return{...state, 
                        uslist: state.uslist.map(u => u._id === action.payload._id ? action.payload : u)};
                case USER_DEL:
                    return{...state,
                        uslist: state.uslist.filter(u => u._id !== action.payload)}
                case USER_ERR:
                case GET_FAIL:
                default:
                    return state;
    }
}