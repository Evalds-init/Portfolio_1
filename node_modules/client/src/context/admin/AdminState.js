import { ADMIN_ERROR, CREATE_PRODUCT, CLEAR_ADMIN_ERRORS } from '../types';
import React, { useReducer } from 'react';
import AdminContext from './adminContext';
import adminReducer from './adminReducer';
import axios from 'axios';
axios.defaults.withCredentials = true;
const AdminState = (props) => {
  const initialState = {
    adminError: null,
    createdProduct: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(adminReducer, initialState);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////// Admin
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //Create product
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
    } catch (error) {
      dispatch({ type: ADMIN_ERROR, payload: error.response.data });
      clearErrors();
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
      dispatch({ type: ADMIN_ERROR, payload: error.response.data });
      clearErrors();
    }
  };

  const clearErrors = () => {
    setTimeout(() => dispatch({ type: CLEAR_ADMIN_ERRORS }), 5000);
  };
  return (
    <AdminContext.Provider
      value={{
        adminError: state.adminError,
        loading: state.loading,
        createdProduct: state.createdProduct,
        createProduct,
        addImages,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
