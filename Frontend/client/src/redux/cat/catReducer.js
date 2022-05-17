import {
  GET_CAT_F,
  GET_CAT_S,
  GET_SOUS_S,
  GET_SOUS_F,
  GET_CAT,
  GET_SOUS,
} from "./catTypes";

// Intial State
const intialState = {
  categories: [],
  souscategories: [],
  loading: false,
  error: null,
};

//Reducers
export default function (state = intialState, action) {
  switch (action.type) {
    case GET_CAT:
      return { ...state, categories: [], loading: true };
    case GET_CAT_S:
      return { ...state, categories: [...action.payload], loading: false };
    case GET_CAT_F:

    case GET_SOUS:
      return { ...state, souscategories: [], loading: true };
    case GET_SOUS_S:
      return { ...state, souscategories: [...action.payload], loading:false };
    case GET_SOUS_F:

    default:
      return state;
  }
}
