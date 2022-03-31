import {
    GET_OFFRE_S,
    GET_OFFRE_F,
    OFFRE_ADDED,
    OFFRE_ARCHIVED,
    OFFRE_UPDATED,
    OFFRE_DELETED,
    OFFRE_ERROR
} from "./offreTypes"

const intialState = {
    offres: [],
    error: null,
  };

  export default function (state = intialState, action){
    switch(action.type){

        case GET_OFFRE_S: 
            return{...state, offres:[...action.payload]}
        case OFFRE_ADDED: 
            return{...state, offres:[...state.offres, action.payload ]}
        case OFFRE_UPDATED: 
            return {...state, offres: state.offres.map(c => c._id === action.payload._id ? action.payload : c)}
        case OFFRE_ARCHIVED: 
            return {...state, offres: state.offres.map(c => c._id === action.payload._id ? action.payload : c)}
        case OFFRE_DELETED: 
            return{...state, offres: state.offres.filter(c => c._id !== action.payload )}
        case OFFRE_ERROR:
        case GET_OFFRE_F:
            
        default:
            return state;
    }
}