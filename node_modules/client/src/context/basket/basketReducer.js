import {
  DELETE_BASKET_ITEM,
  GET_BASKET,
  PROCESS_BASKET_PAYMENT,
  ADD_TO_BASKET,
  GET_BASKET_TOTAL,
  BASKET_PAYMENT_ERROR,
  CHANGE_QUANTITY,
  CLEAR_BASKET_STATE,
  CLEAR_CHECKOUT_ERRORS,
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
        cardError: null,
      };
    case GET_BASKET_TOTAL:
      return {
        ...state,
        total: state.basket.reduce(
          (acc, value) => acc + value.price * value.purchaseQuantity,
          0
        ),
      };
    case BASKET_PAYMENT_ERROR:
      return {
        ...state,
        loading: true,
        cardError: action.payload,
      };
    case CLEAR_CHECKOUT_ERRORS:
      return { ...state, loading: true, cardError: null };
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
