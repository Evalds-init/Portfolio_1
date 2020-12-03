import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/auth/authContext';
import BasketContext from '../../../context/basket/basketContext';
import CheckOut from './CheckOut';
import Checkout from '../payment/Checkout';
function Basket() {
  const basketContext = useContext(BasketContext);
  const { basket } = basketContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const [display, setDisplay] = useState({
    showForm: false,
    style: {},
  });
  const { showForm, style } = display;

  const onClick = (e) => {
    e.preventDefault();
    setDisplay({
      showForm: true,
      style: { filter: 'blur(2px)' },
    });
  };
  const toBasket = () => {
    setDisplay({
      showForm: false,
      style: {},
    });
  };
  return (
    <div className="z-depth-1 checkout">
      <div className="row">
        <div className="col s12 m12 l12" style={style}>
          <CheckOut basket={basket} onClick={onClick} />
        </div>
      </div>
      <div className="checkout-form">
        {showForm && <Checkout toBasket={toBasket} />}
      </div>
    </div>
  );
}

export default Basket;
