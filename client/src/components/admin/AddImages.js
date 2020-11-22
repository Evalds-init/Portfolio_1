import React, { useState, useContext } from 'react';
import ProductContext from '../../context/products/productContext';
import AlertContext from '../../context/alert/alertContext';

const formData = new FormData();
function AddImages({ id }) {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const productContext = useContext(ProductContext);
  const { addImages } = productContext;
  const imageUpdate = (event) => {
    formData.append('images', event.target.files[0]);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    addImages(formData, id);
    setAlert(
      'Image successfully added',
      'green',
      'col s10 offset-s1 m10 offset-m1 l10 offset-l1'
    );
  };
  return (
    <div className="container">
      <div className="row">
        <form className="col s12 m12 l12 mt-4">
          <div className="file-field input-field col s4 m4 l4 offset-s2 offset-m2 offset-l2">
            <div className="btn">
              <span>Images</span>
              <input type="file" multiple onChange={imageUpdate} />
            </div>
            <div className="file-path-wrapper">
              <input
                className="file-path validate"
                type="text"
                placeholder="Upload one or more files"
                name="file"
              />
            </div>
          </div>
          <div className="row">
            <div className="input-field col s4 m4 l4 offset-s1 offset-m1 offset-l1">
              <button
                className="btn waves-effect waves-light blue lighten-1"
                type="submit"
                onClick={onSubmit}
              >
                Submit
                <i className="large material-icons right ">send</i>
              </button>
            </div>
          </div>{' '}
        </form>
      </div>
    </div>
  );
}

export default AddImages;
