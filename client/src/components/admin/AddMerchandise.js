import React, { useEffect, useState, useContext } from 'react';
import M from 'materialize-css';
import AlertContext from '../../context/alert/alertContext';
import ProductContext from '../../context/products/productContext';
import { useHistory } from 'react-router-dom';

function AddMerchandise() {
  let history = useHistory();
  const alertContext = useContext(AlertContext);
  const productContext = useContext(ProductContext);
  const { createProduct, product, loading } = productContext;
  const { setAlert } = alertContext;
  useEffect(() => {
    const elem = document.getElementById('textarea2');
    M.CharacterCounter.init(elem);

    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }, []);
  useEffect(() => {
    if (product) {
      history.push(`/item/${product._id}`);
    }
  }, [product]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    description: '',
  });
  const [category, setCategory] = useState('');
  const { name, price, quantity, description } = newProduct;

  const onChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  const onCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const parsedPrice = parseInt(price, 10);
    const parsedQuantity = parseInt(quantity, 10);
    if (
      name === '' ||
      price === '' ||
      quantity === '' ||
      category === '' ||
      description === ''
    ) {
      setAlert(
        'All fields are required',
        'red',
        'col s10 offset-s1 m10 offset-m1 l10 offset-l1'
      );
    } else {
      setAlert(
        'Product successfully added',
        'green',
        'col s10 offset-s1 m10 offset-m1 l10 offset-l1'
      );
      createProduct({
        name,
        price: parsedPrice,
        quantity: parsedQuantity,
        category,
        description,
      });
    }
  };
  return (
    <div className="row">
      <form className="col s12 m12 l12 mt-4">
        <div className="input-field col s4 m4 l4 offset-s1 offset-m1 offset-l1">
          <input
            id="first_name"
            type="text"
            className="validate"
            name="name"
            value={name}
            onChange={onChange}
          />
          <label htmlFor="first_name">Name</label>
        </div>
        <div className="input-field col s4 m4 l4 offset-s2 offset-m2 offset-l2">
          <input
            id="price"
            type="text"
            className="validate"
            name="price"
            value={price}
            onChange={onChange}
          />
          <label htmlFor="price">Price in GPB</label>
        </div>
        <div className="input-field col s4 m4 l4 offset-s1 offset-m1 offset-l1">
          <input
            id="quantity"
            type="text"
            className="validate"
            name="quantity"
            value={quantity}
            onChange={onChange}
          />
          <label htmlFor="quantity">Quantity</label>
        </div>
        <div className="input-field col s4 m4 l4 offset-s2 offset-m2 offset-l2">
          <select value={category} onChange={onCategoryChange}>
            <option>Choose Category</option>
            <option value="cosmetics">Cosmetics</option>
            <option value="skincare">Skincare</option>
            <option value="haircare">Haircare</option>
          </select>
          <label>Merhcandise Category</label>
        </div>
        <div className="row">
          <div className="input-field col s4 m4 l4 offset-s1 offset-m1 offset-l1">
            <textarea
              id="textarea2"
              className="materialize-textarea"
              data-length="1000"
              name="description"
              value={description}
              onChange={onChange}
            ></textarea>
            <label htmlFor="textarea2">Description</label>
          </div>
        </div>{' '}
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
  );
}

export default AddMerchandise;
