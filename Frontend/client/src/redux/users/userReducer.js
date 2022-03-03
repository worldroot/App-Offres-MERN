import {
    GET_FAIL,
    USER_UP,
    USER_DEL,
    USER_ERR,
    USER_REQ,
    UP_PASS_DONE,
    UP_PASS_FAIL,
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

                case USER_UP:
                    return {...state, user: action.payload };
                case USER_DEL:
                    return{...state,
                        uslist: state.uslist.filter(u => u._id !== action.payload)}
                case UP_PASS_DONE:
                    return {...state, user: action.payload };
                case UP_PASS_FAIL:
                case USER_ERR:
                case USER_REQ:
                case GET_FAIL:
                default:
                    return state;
    }
}