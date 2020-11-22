import {
  ADD_TO_BASKET,
  DELETE_BASKET_ITEM,
  GET_BASKET,
  CREATE_CHECKOUT_SESSION,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      return { basket: action.payload };
    case GET_BASKET:
      return {
        ...state,
        basket: action.payload,
        total:
          action.payload.length !== 0
            ? action.payload.reduce((acc, val) => {
                return acc + val.price;
              }, 0)
            : 0,
      };
    case DELETE_BASKET_ITEM:
      return {
        total:
          state.basket.length !== 0
            ? state.basket
                .filter((item) => item._id !== action.payload)
                .reduce((acc, val) => {
                  return acc + val.price;
                }, 0)
            : 0,
        basket: state.basket.filter((item) => item._id !== action.payload),
      };
    case CREATE_CHECKOUT_SESSION:
      return { ...state, sessionId: action.payload };
    default:
      return state;
  }
};
