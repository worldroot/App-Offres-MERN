import {    
    GET_CAT_F,
    GET_CAT_S,
    ADD_CAT,
    UP_CAT,
    DELETE_CAT,
    CAT_ERR,
    GET_SOUS_S,
    GET_SOUS_F,
    ADD_SOUS,
    UP_SOUS,
    DEL_SOUS,
    ERR_SOUS,
    SOUS_BYID
} from './catTypes'

// Intial State
const intialState = {
    categories: [],
    souscategories: [],
    error: null,
  };

//Reducers
export default function (state = intialState, action){
    switch(action.type){

        case GET_CAT_S: return{...state, categories:[...action.payload]}
        case GET_CAT_F:
        case ADD_CAT: 
            return{...state, categories:[...state.categories, action.payload ]}
        case UP_CAT: 
            return {...state,
            categories: state.categories.map(c => c._id === action.payload._id ? action.payload : c)}   
        case DELETE_CAT: 
            return{...state,
            categories: state.categories.filter(c => c._id !== action.payload )}
        case CAT_ERR:

        case GET_SOUS_S: 
            return{...state, souscategories:[...action.payload]}
        case GET_SOUS_F:
        case ADD_SOUS: 
            return{...state, souscategories:[...state.souscategories, action.payload ]}
        case UP_SOUS: 
            return {...state,
            souscategories: state.souscategories.map(c => c._id === action.payload._id ? action.payload : c)}
        case DEL_SOUS: 
            return{...state,
            souscategories: state.souscategories.filter(c => c._id !== action.payload )}
        case SOUS_BYID: return {...state,
                souscategories: state.souscategories.map(c => c._id === action.payload._id ? action.payload : c)}   
        case ERR_SOUS:

        default:
            return state;
    }
}