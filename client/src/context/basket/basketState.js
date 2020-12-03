import {
  GET_BASKET,
  DELETE_BASKET_ITEM,
  PROCESS_BASKET_PAYMENT,
  BASKET_ERROR,
  ADD_TO_BASKET,
  GET_BASKET_TOTAL,
  CHANGE_QUANTITY,
  CLEAR_BASKET_STATE,
  BASKET_PAYMENT_ERROR,
  CLEAR_CHECKOUT_ERRORS,
} from '../types';
import React, { useReducer } from 'react';
import BasketContext from './basketContext';
import basketReducer from './basketReducer';
import axios from 'axios';
axios.defaults.withCredentials = true;

const BasketState = (props) => {
  const initialState = {
    basket: null,
    total: 0,
    error: null,
    cardError: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(basketReducer, initialState);

  //Get basket items
  const getBasketItems = async () => {
    try {
      const res = await axios.get(`/api/v1/basket/getitems`);

      dispatch({ type: GET_BASKET, payload: res.data.data });
    } catch (error) {
      dispatch({ type: BASKET_ERROR, payload: error.response.data });
    }
  };
  //Get basket total
  const getBasketTotal = (id, quantity) => {
    const item = {
      id,
      quantity,
    };
    dispatch({ type: GET_BASKET_TOTAL, payload: item });
  };
  //Get basket total
  const changeItemQuantity = (id, quantity) => {
    const item = {
      id,
      quantity,
    };
    dispatch({ type: CHANGE_QUANTITY, payload: item });
  };

  //Delete item from basket
  const deleteBasketItem = async (id) => {
    try {
      await axios.delete(`/api/v1/basket/deleteitem/${id}`);
      dispatch({ type: DELETE_BASKET_ITEM, payload: id });
    } catch (error) {
      dispatch({ type: BASKET_ERROR, payload: error.response.data });
    }
  };
  //Create order record after successful transaction
  const clearBasketState = () => {
    dispatch({ type: CLEAR_BASKET_STATE });
  };
  //Create stripe checkout session
  const acceptPayment = async (id, total, basket) => {
    const data = {
      total,
      basket,
      id,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/v1/basket/checkout', data, config);
      dispatch({ type: PROCESS_BASKET_PAYMENT, payload: res.data.data });
    } catch (error) {
      dispatch({
        type: BASKET_PAYMENT_ERROR,
        payload: error.response.data.error,
      });
      setTimeout(() => dispatch({ type: CLEAR_CHECKOUT_ERRORS }), 6000);
    }
  };
  //Add item to users' basket
  const addToBasket = async (product, quantity) => {
    let item = {
      product: product._id,
      quantity,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      await axios.put(
        `/api/v1/basket/${product._id}/addtobasket`,
        item,
        config
      );

      dispatch({ type: ADD_TO_BASKET, payload: product });
    } catch (error) {
      dispatch({ type: BASKET_ERROR, payload: error.response.data });
    }
  };


  return (
    <BasketContext.Provider
      value={{
        basket: state.basket,
        error: state.error,
        loading: state.loading,
        total: state.total,
        cardError: state.cardError,
        getBasketItems,
        clearBasketState,
        deleteBasketItem,
        getBasketTotal,
        addToBasket,
        changeItemQuantity,
        acceptPayment,
 
      }}
    >
      {props.children}
    </BasketContext.Provider>
  );
};

export default BasketState;
