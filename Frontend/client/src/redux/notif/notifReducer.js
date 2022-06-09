import {
  GET_NOTIF_F,
  GET_NOTIF_S,
  LOADIN_NOTIF,
  NOTIF_DEL,
  NOTIF_ERROR,
  NOTIF_SEEN,
} from "./notifTypes";

const intialState = {
  notifications: [],
  loading: false,
  error: null,
};

export default function (state = intialState, action) {
  switch (action.type) {
    
    case LOADIN_NOTIF:
      return { ...state, notifications: [], loading: true };
    case GET_NOTIF_S:
      return { ...state, notifications: [...action.payload], loading: false };
    case GET_NOTIF_F:

    case NOTIF_SEEN:
      return {
        ...state,
        offres: state.notifications.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
      };

    case NOTIF_DEL:
      return {
        ...state,
        offres: state.notifications.filter((c) => c._id !== action.payload),
      };

    case NOTIF_ERROR:

    default:
      return state;
  }
}
