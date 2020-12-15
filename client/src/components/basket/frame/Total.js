import React, { useEffect, useContext } from 'react';
import BasketContext from '../../../context/basket/basketContext';
function Total({ onClick = (f) => f }) {


  const basketContext = useContext(BasketContext);
  const { total, basket, getBasketTotal } = basketContext;
  useEffect(() => {}, [total]);
  useEffect(() => {
    getBasketTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basket]);

  return (
    <div className="card-action basket">
      <div>
        <h5 className="indigo-text">Basket Total: {total}</h5>
      </div>
      <button
        type="link"
        className="waves-effect waves-light green darken-3 btn"
        onClick={onClick}
      >
        Checkout
      </button>
    </div>
  );
}

export default Total;
