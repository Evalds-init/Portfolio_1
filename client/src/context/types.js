////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Admin actions
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_DETAILS = 'UPDATE_DETAILS';
export const UPDATE_DETAILS_FAIL = 'UPDATE_DETAILS_FAIL';
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//User actions
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const USER_LOADED = 'USER_LOADED ';
export const AUTH_ERROR = 'AUTH_ERROR';
export const USER_ERROR = 'USER_ERROR';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const ADD_ADDRESS = 'ADD_ADDRESS';
export const DELETE_ADDRESS = 'DELETE_ADDRESS';
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Product actions
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const PRODUCTS_FAIL = 'PRODUCTS_FAIL';
export const GET_PRODUCT = 'GET_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const FILTER_BY_CATEGORY = 'FILTER_BY_CATEGORY';
export const CLEAR_CURRENT_FILTER = 'CLEAR_CURRENT_FILTER';
export const FILTER_BY_RATING = 'FILTER_BY_RATING';
export const RATE_PRODUCT = 'RATE_PRODUCT';
export const SEARCH_PRODUCTS = 'SEARCH_PRODUCTS';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';
export const GET_PRODUCTS = 'GET_PRODUCTS';
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Basket actions
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const ADD_TO_BASKET = 'ADD_TO_BASKET';
export const GET_BASKET = 'GET_BASKET';
export const CLEAR_CHECKOUT_ERRORS = 'CLEAR_CHECKOUT_ERRORS';
export const DELETE_BASKET_ITEM = 'DELETE_BASKET_ITEM';
export const BASKET_PAYMENT_ERROR = 'BASKET_PAYMENT_ERROR';
export const PROCESS_BASKET_PAYMENT = 'PROCESS_BASKET_PAYMENT';
export const GET_BASKET_TOTAL = 'GET_BASKET_TOTAL';
export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';
export const CLEAR_BASKET_STATE = 'CLEAR_BASKET_STATE';
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Orders actions
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const GET_ORDERS = 'GET_ORDERS';
export const GET_ORDERS_ERROR = 'GET_ORDERS_ERROR';
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Utils actions
////////////////////////////////////////////////////////////////////////////////////////////////////////////
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const BASKET_ERROR = 'BASKET_ERROR';
