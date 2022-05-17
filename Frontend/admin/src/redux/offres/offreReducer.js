import {
  GET_OFFRE_S,
  GET_OFFRE_F,
  OFFRE_ADDED,
  OFFRE_ARCHIVED,
  OFFRE_UPDATED,
  OFFRE_DELETED,
  OFFRE_ERROR,
  GET_OFFRE,
  GET_OFFDEMS,
  GET_OFFDEMS_S,
  GET_OFFDEMS_F,
  DECRYPTING_S,
  DECRYPTING,
  DECRYPTING_F,
} from "./offreTypes";

const intialState = {
  offdems: [],
  offres: [],
  loading: false,
  error: null,
};

export default function (state = intialState, action) {
  switch (action.type) {
    case GET_OFFRE:
      return { ...state, offres: [], loading: true };
    case GET_OFFRE_S:
      return { ...state, offres: [...action.payload], loading: false };
    case GET_OFFRE_F:

    case GET_OFFDEMS:
      return { ...state, offdems: [], loading: true };
    case GET_OFFDEMS_S:
      return { ...state, offdems: [...action.payload], loading: false };
    case GET_OFFDEMS_F:

    case OFFRE_ADDED:
      return { ...state, offres: [...state.offres, action.payload] };
    case OFFRE_UPDATED:
      return {
        ...state,
        offres: state.offres.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
      };
    case OFFRE_ARCHIVED:
      return {
        ...state,
        offres: state.offres.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
      };
    case OFFRE_DELETED:
      return {
        ...state,
        offres: state.offres.filter((c) => c._id !== action.payload),
      };
    case DECRYPTING:
      return { ...state, loading: true };
    case DECRYPTING_S:
      return {
        ...state,
        offres: state.offres.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
        loading: false,
      };
    case DECRYPTING_F:
    case OFFRE_ERROR:

    default:
      return state;
  }
}
