import React, { useEffect, useContext, useState } from 'react';
import BasketContext from '../../../context/basket/basketContext';
import AlertContext from '../../../context/alert/alertContext';
import AuthContext from '../../../context/auth/authContext';

function Total({ onClick = (f) => f }) {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const basketContext = useContext(BasketContext);
  const {
    createCheckoutSession,
    sessionId,
    total,
    basket,
    clearBasketState,
  } = basketContext;

  return (
    <div className="card-action basket">
      <div>
        <h5 className="white-text">Basket Total: {total}</h5>
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
