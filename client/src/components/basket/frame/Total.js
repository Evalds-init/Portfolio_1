import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import BasketContext from '../../../context/basket/basketContext';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

function Total({ total }) {
  const basketContext = useContext(BasketContext);
  const { createCheckoutSession, sessionId } = basketContext;
  useEffect(() => {}, [total]);

  const stripePromise = loadStripe(
    'pk_test_51HpavkGL4I6BvuCEaNrjHcdxFkYUmmrPkPhfBoKXCx1ZqxlLEkcVB6nfbGfsZUazA6Ku5xw8nT6s44cH0kudf8kP004RmMfL7G'
  );
  const createSession = async () => {
    const stripe = await stripePromise;
    createCheckoutSession();
    const result = await stripe.redirectToCheckout({
      sessionId,
    });
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };
  return (
    <div className="card-action basket">
      <div>
        <h5 className="white-text">Total: {total}</h5>
      </div>
      <button
        type="link"
        className="waves-effect waves-light green darken-3 btn"
        onClick={createSession}
      >
       Checkout
      </button>
    </div>
  );
}

export default Total;
