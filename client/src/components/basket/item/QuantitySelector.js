import React, { useEffect, useState, useContext } from 'react';
import M from 'materialize-css';
import AlertContext from '../../../context/alert/alertContext';
import BasketContext from '../../../context/basket/basketContext';
function QuantitySelector() {
  const basketContext = useContext(BasketContext);
  const {  } = basketContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  useEffect(() => {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }, []);
  const [quantity, setQuantity] = useState(1);

  const changeQuantity = (e) => {
    e.preventDefault();
    if (e.target.name === 'increase') {
      setQuantity(quantity + 1);
    } else if (quantity === 1) {
      setAlert(
        'Quantity can not be set to 0',
        'blue darken-2',
        'col s10 offset-s1 m10 offset-m1 l10 offset-l1'
      );
    } else if (e.target.name === 'decrease') {
      setQuantity(quantity - 1);
    }
    if (quantity === 15) {
      setAlert(
        'Please contact us to get a wholesale quote',
        'blue blue darken-2',
        'col s10 offset-s1 m10 offset-m1 l10 offset-l1'
      );
      setQuantity(quantity);
    }
  };

  return (
    <div className="basket-increment">
      <button
        className="basket-decrement_button"
        name="decrease"
        onClick={changeQuantity}
      >
        -
      </button>{' '}
      <input type="text" value={quantity} readOnly />
      <button
        className="basket-increment_button"
        name="increase"
        onClick={changeQuantity}
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;
