import React, { useContext, useEffect } from 'react';
import AuthContext from '../../../context/auth/authContext';
import BasketContext from '../../../context/basket/basketContext';
import CheckOut from './CheckOut';

function Basket() {
  const basketContext = useContext(BasketContext);
  const { basket } = basketContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  return (
    <div className="z-depth-1 checkout">
      <div className="row">
        <div className="col s12 m12 l12">
          <CheckOut basket={basket} />
        </div>
      </div>
    </div>
  );
}

export default Basket;
