import {
  CREATE_PRODUCT,
  GET_PRODUCTS,
  PRODUCTS_FAIL,
  GET_PRODUCT,
  REMOVE_PRODUCT,
  FILTER_BY_CATEGORY,
  CLEAR_CURRENT_FILTER,
  FILTER_BY_RATING,
  RATE_PRODUCT,
  SEARCH_PRODUCTS,
  CLEAR_SEARCH_RESULTS,
} from '../types';

import React, { useReducer } from 'react';
import ProductContext from './productContext';
import productReducer from './productReducer';
import axios from 'axios';
axios.defaults.withCredentials = true;

const ProductState = (props) => {
  const initialState = {
    products: [],
    searchResults: [],
    ratingFilter: [],
    categoryFilter: [],
    product: [],
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  //Create products
  const createProduct = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        '/api/v1/admin/products/create',
        formData,
        config
      );

      dispatch({ type: CREATE_PRODUCT, payload: res.data.data });
      console.log(res.data);
    } catch (error) {
      console.log(error);
      // dispatch({ type: UPDATE_DETAILS_FAIL, payload: error.response.data });
    }
  };
  //Add Product Images
  const addImages = async (formData, id) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const res = await axios.post(
        `/api/v1/admin/products/${id}/addimages`,
        formData,
        config
      );

      dispatch({ type: CREATE_PRODUCT, payload: res.data.data });
    } catch (error) {
      console.log(error);
      // dispatch({ type: UPDATE_DETAILS_FAIL, payload: error.response.data });
    }
  };
  //Create products
  const getProducts = async () => {
    try {
      const res = await axios.get('/api/v1/products');

      dispatch({ type: GET_PRODUCTS, payload: res.data.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: PRODUCTS_FAIL, payload: error.response });
    }
  };

  //Filter by category (Options menu)
  const filterByCategory = async (category) => {
    try {
      dispatch({ type: FILTER_BY_CATEGORY, payload: category });
    } catch (error) {
      console.log(error);
    }
  };
  //Clear categories
  const clearFilters = async () => {
    try {
      dispatch({ type: CLEAR_CURRENT_FILTER });
    } catch (error) {
      console.log(error);
    }
  };
  //Filter by ratings (Options menu)
  const filterByRatings = async (rating) => {
    try {
      dispatch({ type: FILTER_BY_RATING, payload: rating });
    } catch (error) {
      console.log(error);
    }
  };
  //Search by product name (Search input)
  const searchProducts = async (text) => {
    try {
      dispatch({ type: SEARCH_PRODUCTS, payload: text });
    } catch (error) {
      console.log(error);
    }
  };
  //Clear search state (Search input)
  const clearSearchResults = async () => {
    try {
      dispatch({ type: CLEAR_SEARCH_RESULTS });
    } catch (error) {
      console.log(error);
    }
  };

  //Get single product
  const getProduct = async (id) => {
    console.log(id);
    dispatch({ type: GET_PRODUCT, payload: id });
  };
  //Remove product from state
  const removeProduct = async () => {
    dispatch({ type: REMOVE_PRODUCT });
  };
  //rate product
  const rateProduct = async (rating) => {
    dispatch({ type: RATE_PRODUCT, payload: rating });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        loading: state.loading,
        product: state.product,
        categoryFilter: state.categoryFilter,
        ratingFilter: state.ratingFilter,
        searchResults: state.searchResults,
        error: state.error,
        clearSearchResults,
        createProduct,
        getProducts,
        getProduct,
        removeProduct,
        addImages,
        filterByCategory,
        clearFilters,
        filterByRatings,
        rateProduct,
        searchProducts,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
