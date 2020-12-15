import React from 'react';
import BasketItem from '../item/BasketItem';
import Total from './Total';

const BasketBackground = ({ basket, onClick = (f) => f }) => {
  return (
    <div className="card inner-checkout">
      <div className="card-content white-text">
        <span className="card-title center section">Basket Overview</span>
        <p className="center mt-4 grey-text light">
          Order are usually dispatched the next working day
        </p>{' '}
        <div className="section mt-4">
          {' '}
          {basket?.[0] &&
            basket.map((basket, index) => (
              <BasketItem basket={basket} key={index} />
            ))}
        </div>
      </div>
      <Total onClick={onClick} />
    </div>
  );
};

export default BasketBackground;
