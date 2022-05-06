import {
    GET_OFFRE_S,
    GET_OFFRE_F,
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
        case OFFRE_ERROR:
        case GET_OFFRE_F:
            
        default:
            return state;
    }
}