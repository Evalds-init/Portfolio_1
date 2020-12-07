import {
  /// Authorization
  REGISTER_SUCCESS,
  AUTH_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_AUTH_ERRORS,
  /// User actions
  USER_ERROR,
  UPDATE_ADDRESS,
  ADD_ADDRESS,
  DELETE_ADDRESS,
  UPDATE_DETAILS,
  CLEAR_USER_ERRORS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////// User actions
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    case UPDATE_DETAILS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
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
        userError: action.payload,
      };
    case CLEAR_USER_ERRORS:
      return { ...state, userError: null };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////// Authorization
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case AUTH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        authError: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case CLEAR_AUTH_ERRORS:
      return { ...state, authError: null };

    default:
      return state;
  }
};
