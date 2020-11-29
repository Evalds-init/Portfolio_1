import React, { useEffect, useState, useContext } from 'react';
import M from 'materialize-css';
import AlertContext from '../../../context/alert/alertContext';
import BasketContext from '../../../context/basket/basketContext';
function QuantitySelector({
  quantity,
  decreaseQuantity = (f) => f,
  increaseQuantity = (f) => f,
}) {
  const basketContext = useContext(BasketContext);
  const {} = basketContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  useEffect(() => {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }, []);

  return (
    <div className="basket-increment">
      <button
        className="basket-decrement_button"
        name="decrease"
        onClick={decreaseQuantity}
      >
        -
      </button>{' '}
      <input type="text" value={quantity} readOnly />
      <button
        className="basket-increment_button"
        name="increase"
        onClick={increaseQuantity}
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
