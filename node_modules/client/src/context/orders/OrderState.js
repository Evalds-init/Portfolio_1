import { GET_ORDERS, GET_ORDERS_ERROR } from '../types';
import React, { useReducer } from 'react';
import OrderContext from './orderContext';
import orderReducer from './orderReducer';
import axios from 'axios';
axios.defaults.withCredentials = true;

const OrderState = (props) => {
  const initialState = {
    orders: [],
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(orderReducer, initialState);

  const getOrders = async () => {
    try {
      const res = await axios.get(`/api/v1/orders/getorders`);
      dispatch({ type: GET_ORDERS, payload: res.data.data });
    } catch (error) {
      dispatch({ type: GET_ORDERS_ERROR, payload: error.response.data });
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        error: state.error,
        loading: state.loading,
        getOrders,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;
