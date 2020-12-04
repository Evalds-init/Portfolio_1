import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  UPDATE_DETAILS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  USER_ERROR,
  UPDATE_ADDRESS,
  ADD_ADDRESS,
  DELETE_ADDRESS,
} from '../types';

import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
axios.defaults.withCredentials = true;

const AuthState = (props) => {
  const initialState = {
    isAuthenticated: null,
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

  //Logout

  //Clear errors
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
    }
  };
  //delete address
  const deleteAddress = async (id) => {
    try {
      await axios.delete(`/api/v1/users/${id}/deleteaddress`);

      dispatch({ type: DELETE_ADDRESS, payload: id });
    } catch (error) {
      dispatch({ type: USER_ERROR, payload: error.response.data });
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        persistUser,
        //////////////////////////////////////////////
        ///// User Details
        /////////////////////////////////////////////
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
