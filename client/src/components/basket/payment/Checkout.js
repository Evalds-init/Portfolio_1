import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Form from './Form';
const stripePromise = loadStripe(
  'pk_test_51HpavkGL4I6BvuCEaNrjHcdxFkYUmmrPkPhfBoKXCx1ZqxlLEkcVB6nfbGfsZUazA6Ku5xw8nT6s44cH0kudf8kP004RmMfL7G'
);

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <Form />
    </Elements>
  );
};

export default Checkout;
