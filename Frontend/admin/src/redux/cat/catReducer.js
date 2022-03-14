import {    
    GET_CAT_F,
    GET_CAT_S,
    ADD_CAT,
    UP_CAT,
    DELETE_CAT,
    CAT_ERR,
} from './catTypes'

// Intial State
const intialState = {
    categories: [],
    error: null,
  };

//Reducers
export default function (state = intialState, action){
    switch(action.type){

        case GET_CAT_S: return{...state, categories:[...action.payload]}
        case GET_CAT_F:
        case ADD_CAT: return{...state, categories:[...state.categories, action.payload ]}

        case UP_CAT: return {...state,
            categories: state.categories.map(c => c._id === action.payload._id ? action.payload : c)}

        case DELETE_CAT: return{...state,
            categories: state.categories.filter(c => c._id !== action.payload )}
        case CAT_ERR:
        default:
            return state;
    }
}