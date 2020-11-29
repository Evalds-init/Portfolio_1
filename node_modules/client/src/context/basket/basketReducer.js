import {
  DELETE_BASKET_ITEM,
  GET_BASKET,
  CREATE_CHECKOUT_SESSION,
  ADD_TO_BASKET,
  GET_BASKET_TOTAL,
  CHANGE_QUANTITY,
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
    case CREATE_CHECKOUT_SESSION:
      return { ...state, sessionId: action.payload };
    case GET_BASKET_TOTAL:
      return {
        ...state,
        total: state.basket.reduce(
          (acc, value) => acc + value.price * value.purchaseQuantity,
          0
        ),
      };
    case CHANGE_QUANTITY:
      return {
        ...state,
        basket: state.basket.map((item) =>
          item._id === action.payload.id
            ? { ...item, purchaseQuantity: action.payload.quantity }
            : { ...item }
        ),
      };
    default:
      return state;
  }
};
