import React, { useEffect } from 'react';
import BasketItem from '../item/BasketItem';
import Total from './Total';
import Checkout from '../payment/Checkout';
const CheckOut = ({ basket, total }) => {
  return (
    <div className="card inner-checkout">
      <div className="card-content white-text">
        <span className="card-title center mt-2">Basket Overview</span>
        <p className="center mt-2">
          I am a very simple card. I am good at containing small bits of
          information. I am convenient because I require little markup to use
          effectively.
        </p>{' '}
              {basket?.[0] &&
                basket.map((basket, index) => (
                  <BasketItem basket={basket} key={index} />
                ))}
        
      </div>
      <Total total={total} />
    </div>
  );
};

export default CheckOut;
