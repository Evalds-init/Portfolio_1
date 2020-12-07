import {
  /// Products
  GET_PRODUCTS,
  PRODUCTS_ERROR,
  GET_PRODUCT,
  REMOVE_PRODUCT,
  /// Filtering
  FILTER_BY_CATEGORY,
  CLEAR_FILTERS,
  FILTER_BY_RATING,
  RATE_PRODUCT,
  SEARCH_PRODUCTS,
  CLEAR_SEARCH_RESULTS,
} from '../types';
import React, { useReducer } from 'react';
import ProductContext from './productContext';
import productReducer from './productReducer';
import axios from 'axios';

const ProductState = (props) => {
  const initialState = {
    products: [],
    searchResults: [],
    ratingFilter: [],
    categoryFilter: [],
    product: [],
    loading: true,
    productError: null,
  };

  const [state, dispatch] = useReducer(productReducer, initialState);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////// Products
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  /// Get products
  const getProducts = async () => {
    try {
      const res = await axios.get('/api/v1/products');
      dispatch({ type: GET_PRODUCTS, payload: res.data.data });
    } catch (error) {
      dispatch({ type: PRODUCTS_ERROR, payload: error.response });
    }
  };
  //Get single product
  const getProduct = (id) => {
    dispatch({ type: GET_PRODUCT, payload: id });
  };
  //Remove product from state
  const removeProduct = () => {
    dispatch({ type: REMOVE_PRODUCT });
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////// Product filter
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //Filter by category (Options menu)
  const filterByCategory = (category) => {
    dispatch({ type: FILTER_BY_CATEGORY, payload: category });
  };
  //Clear categories
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };
  //Filter by ratings (Options menu)
  const filterByRatings = (rating) => {
    dispatch({ type: FILTER_BY_RATING, payload: rating });
  };
  //Search by product name (Search input)
  const searchProducts = (text) => {
    dispatch({ type: SEARCH_PRODUCTS, payload: text });
  };
  //Clear search state (Search input)
  const clearSearchResults = () => {
    dispatch({ type: CLEAR_SEARCH_RESULTS });
  };

  //rate product
  const rateProduct = (rating) => {
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
        productError: state.productError,
        clearSearchResults,
        getProducts,
        getProduct,
        removeProduct,
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
