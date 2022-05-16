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
  ADD_DEMANDE,
  GET_OFFRE,
  GET_OFFDEMS_S,
  GET_DEMANDE,
  GET_OFFDEMS_F,
} from "./offreTypes";

const intialState = {
  loading: false,
  offdems: [],
  offres: [],
  demandes: [],
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

    case GET_DEMANDE:
      return { ...state, demandes: [], loading: true  };
    case GET_DEMANDE_S:
      return { ...state, demandes: [...action.payload], loading: false  };
    case GET_DEMANDE_F:

    case ADD_DEMANDE:
      return { ...state, ...action.payload };
    case DEL_DEMANDE:
      return {
        ...state,
        demandes: state.demandes.filter((c) => c._id !== action.payload),
      };

    case DEMANDE_ERROR:
    case OFFRE_ERROR:

    default:
      return state;
  }
}
