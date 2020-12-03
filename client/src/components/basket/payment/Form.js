import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import BasketContext from '../../../context/basket/basketContext';
import AlertContext from '../../../context/alert/alertContext';
function Form({ toBasket = (f) => f }) {
  let history = useHistory();
  const basketContext = useContext(BasketContext);
  const {
    acceptPayment,
    total,
    basket,
    cardError,
    loading,
    clearBasketState,
  } = basketContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const stripe = useStripe();
  const elements = useElements();
  const onSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod;
      acceptPayment(id, total, basket);
    }
  };
  useEffect(() => {
    if (cardError) {
      setAlert(
        `${cardError}`,
        'red',
        'col s8 offset-s2 m8 offset-m2 l8 offset-l2'
      );
    }
  }, [cardError]);
  useEffect(() => {
    if (!loading && !cardError && !basket) {
      setTimeout(() => history.push('/orders'), 3000);
    }
  }, [loading]);
  useEffect(() => {
    return () => {
      clearBasketState();
    };
  }, []);

  return (
    <div className="container">
      <div className="row">
        {!loading && !cardError ? (
          <div className="custom-form">
            <div className="success-checkmark">
              <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
                <div className="icon-circle"></div>
                <div className="icon-fix"></div>
              </div>
            </div>
            <div className="center">
              <p className="blue-text">Your payment was successful.</p>
            </div>
          </div>
        ) : (
          <form
            className="col s8 offset-s2 m8 offset-m2 l8 offset-l2"
            onSubmit={onSubmit}
          >
            <div className="custom-form z-depth-3">
              {' '}
              <div className="return-button">
                <button
                  class="waves-effect waves-light btn white"
                  onClick={toBasket}
                  type="button"
                >
                  <i class="material-icons left">keyboard_return</i>Return
                </button>
              </div>
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#424770',
                      '::placeholder': {
                        color: '#aab7c4',
                      },
                    },
                    invalid: {
                      color: '#9e2146',
                    },
                  },
                }}
              />
              <div className="button center">
                {' '}
                <button
                  class="btn waves-effect waves-light"
                  type="submit"
                  name="action"
                  disabled={!stripe}
                >
                  Pay: ${total}
                </button>
              </div>{' '}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Form;
