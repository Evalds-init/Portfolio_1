import React, { useContext, useEffect } from 'react';
import AuthContext from '../../../context/auth/authContext';
import ProductContext from '../../../context/products/productContext';
import BasketContext from '../../../context/basket/basketContext';
import CheckOut from './CheckOut';

function Basket() {
  const productContext = useContext(ProductContext);
  const basketContext = useContext(BasketContext);
  const { getBasketItems, basket, total } = basketContext;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  useEffect(() => {
    getBasketItems();
  }, []);

  return (
    <div className="z-depth-1 checkout">
      <div className="row">
        <div className="col s12 m12 l12">
          <CheckOut basket={basket} total={total} />
        </div>
      </div>
    </div>
  );
}

export default Basket;
