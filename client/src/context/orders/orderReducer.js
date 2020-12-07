import { CLEAR_ORDER_ERROR, GET_ORDERS, GET_ORDERS_ERROR } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return { ...state, loading: false, orders: action.payload };
    case GET_ORDERS_ERROR:
      return { ...state, loading: false, orderError: action.payload };
    case CLEAR_ORDER_ERROR:
      return { ...state, orderError: null };
    default:
      return state;
  }
};
