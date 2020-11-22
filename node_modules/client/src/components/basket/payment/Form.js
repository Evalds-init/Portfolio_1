import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
function Form() {
  const stripe = useStripe();
  return (
    <form>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}

export default Form;
