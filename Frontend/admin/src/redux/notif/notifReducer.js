import {
  GET_NOTIF_F,
  GET_NOTIF_S,
  LOADIN_NOTIF,
  NOTIF_DEL,
  NOTIF_ERROR,
  NOTIF_SEEN,
  NOTIF_SEEN_F,
} from "./notifTypes";

const intialState = {
  notifications: [],
  loading: false,
  error: null,
  codeMsg: null,
};

export default function (state = intialState, action) {
  switch (action.type) {
    case LOADIN_NOTIF:
      return { ...state, notifications: [], loading: true, codeMsg: null };
    case GET_NOTIF_S:
      return { ...state, notifications: [...action.payload], loading: false };
    case GET_NOTIF_F:

    case NOTIF_SEEN:
      return {
        ...state,
        notifications: state.notifications.map((c) =>
          c._id === action.payload._id ? action.payload : c
        ),
        codeMsg: 1,
        loading: false
      };
    case NOTIF_SEEN_F:
        return {
          ...state,
          codeMsg: 0,
          loading: false
        };

    case NOTIF_DEL:
      return {
        ...state,
        notifications: state.notifications.filter((c) => c._id !== action.payload),
      };

    case NOTIF_ERROR:

    default:
      return state;
  }
}
