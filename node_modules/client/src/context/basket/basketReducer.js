import {
  GET_BASKET,
  DELETE_BASKET_ITEM,
  PROCESS_BASKET_PAYMENT,
  BASKET_ERROR,
  ADD_TO_BASKET,
  GET_BASKET_TOTAL,
  CHANGE_QUANTITY,
  CLEAR_BASKET_STATE,
  PAYMENT_ERROR,
  CLEAR_BASKET_ERRORS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_BASKET:
      return {
        ...state,
        basket: action.payload,
      };

    case ADD_TO_BASKET:
      return {
        ...state,
        basket: [...state.basket, action.payload],
      };
    case DELETE_BASKET_ITEM:
      return {
        ...state,
        basket: state.basket.filter((item) => item._id !== action.payload),
      };
    case PROCESS_BASKET_PAYMENT:
      return {
        ...state,
        loading: false,
        total: 0,
        basket: null,
      };
    case GET_BASKET_TOTAL:
      return {
        ...state,
        total: state.basket.reduce(
          (acc, value) => acc + value.price * value.purchaseQuantity,
          0
        ),
      };
    //// Errors
    case PAYMENT_ERROR:
      return {
        ...state,
        loading: false,
        checkoutError: action.payload,
      };
    case BASKET_ERROR:
      return { ...state, loading: false, basketError: action.payload };
    case CLEAR_BASKET_ERRORS:
      return { ...state, checkoutError: null, basketError: null };
    case CHANGE_QUANTITY:
      return {
        ...state,
        basket: state.basket.map((item) =>
          item._id === action.payload.id
            ? { ...item, purchaseQuantity: action.payload.quantity }
            : { ...item }
        ),
      };
    case CLEAR_BASKET_STATE:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
