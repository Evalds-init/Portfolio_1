import {
  /// Authorization
  REGISTER_SUCCESS,
  AUTH_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_AUTH_ERRORS,
  /// User actions
  USER_ERROR,
  UPDATE_ADDRESS,
  ADD_ADDRESS,
  DELETE_ADDRESS,
  UPDATE_DETAILS,
  CLEAR_USER_ERRORS,
} from '../types';

import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
axios.defaults.withCredentials = true;

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: null,
    authError: null,
    userError: null,
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////// Authorization
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //Register user
  const register = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/v1/auth/register', formData, config);

      dispatch({ type: REGISTER_SUCCESS, payload: res.data.data });
    } catch (error) {
      dispatch({ type: AUTH_FAIL, payload: error.response.data.error });
      clearAuthErrors();
    }
  };
  //Login user
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/v1/auth/login', formData, config);

      dispatch({ type: LOGIN_SUCCESS, payload: res.data.data });
    } catch (error) {
      dispatch({ type: AUTH_FAIL, payload: error.response.data });
      clearAuthErrors();
    }
  };
  //Persist user
  const persistUser = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        '/api/v1/auth/persistuser',
        formData,
        config
      );

      dispatch({ type: LOGIN_SUCCESS, payload: res.data.data });
    } catch (error) {
      dispatch({ type: AUTH_FAIL, payload: error.response.data.error });
      clearAuthErrors();
    }
  };

  //Logout
  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  //Clear errors
  const clearAuthErrors = () => {
    setTimeout(() => dispatch({ type: CLEAR_AUTH_ERRORS }), 5000);
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////// User detail update
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //Update user details
  const updateDetails = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        '/api/v1/users/updatedetails',
        formData,
        config
      );

      dispatch({ type: UPDATE_DETAILS, payload: res.data.data });
    } catch (error) {
      dispatch({ type: USER_ERROR, payload: error.response.data });
      clearUserErrors();
    }
  };
  //Update user details
  const updateUserAddress = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        '/api/v1/users/updateaddress',
        formData,
        config
      );

      dispatch({ type: UPDATE_ADDRESS, payload: formData });
    } catch (error) {
      dispatch({ type: USER_ERROR, payload: error.response.data });
      clearUserErrors();
    }
  };
  //Update user details
  const addUserAddress = async (formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        '/api/v1/users/addaddress',
        formData,
        config
      );

      dispatch({ type: ADD_ADDRESS, payload: res.data.data });
    } catch (error) {
      dispatch({ type: USER_ERROR, payload: error.response.data });
      clearUserErrors();
    }
  };
  //delete address
  const deleteAddress = async (id) => {
    try {
      await axios.delete(`/api/v1/users/${id}/deleteaddress`);

      dispatch({ type: DELETE_ADDRESS, payload: id });
    } catch (error) {
      dispatch({ type: USER_ERROR, payload: error.response.data });
      clearUserErrors();
    }
  };
  //Clear errors
  const clearUserErrors = () => {
    setTimeout(() => dispatch({ type: CLEAR_USER_ERRORS }), 5000);
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        authError: state.authError,
        register,
        login,
        persistUser,
        logout,
        //////////////////////////////////////////////
        ///// User Details
        /////////////////////////////////////////////
        userError: state.userError,
        updateDetails,
        updateUserAddress,
        addUserAddress,
        deleteAddress,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
