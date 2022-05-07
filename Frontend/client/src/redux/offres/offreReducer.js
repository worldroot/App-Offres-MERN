import {
  GET_OFFRE_S,
  GET_OFFRE_F,
  GET_DEMANDE_S,
  GET_DEMANDE_F,
  DEMANDE_ERROR,
  DEL_DEMANDE,
  GET_OFFDEMS,
  OFFRE_ERROR,
  GET_ONE,
} from "./offreTypes";

const intialState = {
  offdems: [],
  offres: [],
  demandes: [],
  error: null,
};

export default function (state = intialState, action) {
  switch (action.type) {
    case GET_OFFRE_S:
      return { ...state, offres: [...action.payload] };
    case GET_OFFDEMS:
      return { ...state, offdems: [...action.payload] };
    case GET_DEMANDE_S:
      return { ...state, demandes: [...action.payload] };
    case DEL_DEMANDE:
      return {
        ...state,
        offres: state.demandes.filter((c) => c._id !== action.payload),
      };
    case GET_ONE:
      return { ...state, one: [...action.payload] };
    case DEMANDE_ERROR:
    case OFFRE_ERROR:
    case GET_OFFRE_F:
    case GET_DEMANDE_F:

    default:
      return state;
  }
}
