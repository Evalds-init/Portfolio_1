import {
  ADD_TO_BASKET,
  GET_BASKET,
  DELETE_BASKET_ITEM,
  CREATE_CHECKOUT_SESSION,
} from '../types';
import React, { useReducer } from 'react';
import BasketContext from './basketContext';
import basketReducer from './basketReducer';
import axios from 'axios';
axios.defaults.withCredentials = true;

const BasketState = (props) => {
  const initialState = {
    basket: null,
    total: null,
    sessionId: null,
  };

  const [state, dispatch] = useReducer(basketReducer, initialState);
  //Add item to basket
  const addToBasket = async (id) => {
    try {
      const res = await axios.put(`/api/v1/basket/${id}/addtobasket`);

      dispatch({ type: ADD_TO_BASKET, payload: res.data.data.basket });
    } catch (error) {
      console.log(error);
    }
  };
  //Get basket items
  const getBasketItems = async () => {
    try {
      const res = await axios.get(`/api/v1/basket/getitems`);

      dispatch({ type: GET_BASKET, payload: res.data.data });
    } catch (error) {
      console.log(error);
    }
  };
  //Delete item from basket
  const deleteBasketItem = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/basket/deleteitem/${id}`);
      dispatch({ type: DELETE_BASKET_ITEM, payload: id });
    } catch (error) {
      console.log(error);
    }
  };
  //Create stripe checkout session
  const createCheckoutSession = async (id) => {
    try {
      const res = await axios.post('/api/v1/basket/create-checkout-session');
      dispatch({ type: CREATE_CHECKOUT_SESSION, payload: res.data.id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BasketContext.Provider
      value={{
        basket: state.basket,
        total: state.total,
        sessionId: state.sessionId,
        addToBasket,
        getBasketItems,
        deleteBasketItem,
        createCheckoutSession,
      }}
    >
      {props.children}
    </BasketContext.Provider>
  );
};

export default BasketState;
