import { ADMIN_ERROR, CLEAR_ADMIN_ERRORS, CREATE_PRODUCT } from '../types';

export default (state, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return {
        ...state,
        createdProduct: action.payload,
        loading: false,
      };
    case ADMIN_ERROR:
      return {
        ...state,
        adminError: action.payload,
        loading: true,
      };
    case CLEAR_ADMIN_ERRORS:
      return {
        ...state,
        adminError: null,
      };
    default:
      return state;
  }
};
