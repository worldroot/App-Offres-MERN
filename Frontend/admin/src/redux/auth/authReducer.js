import {
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT,
  SET_LOADING,
  ERROR,
  REFTOKEN_ERROR,
  REFTOKEN_IS_SET,
  UPDATE_ERROR,
  UPDATE_USER,
} from "./authTypes";

// Intial State
const intialState = {
  accessToken: localStorage.getItem("accesstoken"),
  expiresIn: localStorage.getItem("expiresIn"),
  refreshToken: localStorage.getItem("refreshToken"),
  isAuthenticated: null,
  loading: true,
  user: [],
};

// Reducers
export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem("accessToken", payload.accessToken);
      localStorage.setItem("expiresIn", payload.expiresIn);
      localStorage.setItem("refreshToken", payload.refreshToken);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("accessToken", payload.accessToken);
      localStorage.setItem("expiresIn", payload.expiresIn);
      localStorage.setItem("refreshToken", payload.refreshToken);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case REFTOKEN_IS_SET:
      localStorage.setItem("accessToken", payload.accessToken);
      localStorage.setItem("expiresIn", payload.expiresIn);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case REFTOKEN_ERROR:

    case ERROR:
      return {
        ...state,
        accessToken: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case LOGOUT:
      //Remove Token in localstorage
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    default:
      return state;
  }
}
