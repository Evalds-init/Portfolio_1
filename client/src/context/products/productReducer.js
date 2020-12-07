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

export default (state, action) => {
  switch (action.type) {
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////// Products
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    case GET_PRODUCTS:
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: state.products.filter(
          (product) => product._id === action.payload
        )[0],
        loading: false,
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        product: [],
      };
    case PRODUCTS_ERROR:
      return { ...state, productError: action.payload };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////// Filters
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    case FILTER_BY_CATEGORY:
      return {
        ...state,
        searchResults: [],
        ratingFilter: [],
        categoryFilter: state.products.filter(
          (item) => item.category === action.payload
        ),
      };
    case FILTER_BY_RATING:
      return {
        ...state,
        searchResults: [],
        categoryFilter: [],
        ratingFilter: state.products.filter(
          (item) => item.averageRating >= action.payload
        ),
      };
    case SEARCH_PRODUCTS:
      return {
        ...state,
        categoryFilter: [],
        ratingFilter: [],
        searchResults: state.products.filter((product) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return product.name.match(regex);
        }),
      };
    case CLEAR_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: [],
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        categoryFilter: [],
        ratingFilter: [],
        searchResults: [],
      };
    case RATE_PRODUCT:
      return {
        ...state,
      };
    default:
      return state;
  }
};
