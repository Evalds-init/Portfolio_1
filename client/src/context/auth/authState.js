import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_DETAILS,
  UPDATE_DETAILS_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  ADD_TO_BASKET,
} from '../types';

import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
axios.defaults.withCredentials = true;

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: null,
    role: null,
    loading: true,
    error: null,
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  //Load user

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
      console.log(error);
      dispatch({ type: REGISTER_FAIL, payload: error.response.data });
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
      console.log(error);
      dispatch({ type: LOGIN_FAIL, payload: error.response.data });
    }
  };
  //Persistuser
  const persistUser = async () => {
    try {
      const res = await axios.get('/api/v1/auth/persistuser');

      dispatch({ type: LOGIN_SUCCESS, payload: res.data.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: LOGIN_FAIL, payload: error.response.data });
    }
  };
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
      console.log(error);
      dispatch({ type: UPDATE_DETAILS_FAIL, payload: error.response.data });
    }
  };

  //Logout

  //Clear errors


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        updateDetails,
        persistUser,
        role: state.role,
        
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
