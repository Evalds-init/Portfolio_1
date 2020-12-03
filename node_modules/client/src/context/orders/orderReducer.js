import { GET_ORDERS } from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return { ...state, loading: false, orders: action.payload };
    default:
      return state;
  }
};
