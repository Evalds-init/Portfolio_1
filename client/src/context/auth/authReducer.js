import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_DETAILS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  USER_ERROR,
  ADD_ADDRESS,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case UPDATE_DETAILS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: null,
      };
    case UPDATE_ADDRESS:
      return {
        ...state,
        user: {
          ...state.user,
          address: state.user.address.map((address) =>
            address._id === action.payload._id ? action.payload : address
          ),
        },
      };
    case ADD_ADDRESS:
      return {
        ...state,
        user: { ...state.user, address: action.payload },
      };
    case DELETE_ADDRESS:
      return {
        ...state,
        user: {
          ...state.user,
          address: state.user.address.filter(
            (item) => item._id !== action.payload
          ),
        },
      };

    case USER_ERROR:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,

        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: null,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
