import React from 'react';
import BasketItem from '../item/BasketItem';
import Total from './Total';

const CheckOut = ({ basket }) => {
  return (
    <div className="card inner-checkout">
      <div className="card-content white-text">
        <span className="card-title center section">Basket Overview</span>
        <p className="center mt-4">
          I am a very simple card. I am good at containing small bits of
          information. I am convenient because I require little markup to use
          effectively.
        </p>{' '}
        <div className="section mt-4">
          {' '}
          {basket?.[0] &&
            basket.map((basket, index) => (
              <BasketItem basket={basket} key={index} />
            ))}
        </div>
      </div>
      <Total />
    </div>
  );
};

export default CheckOut;
