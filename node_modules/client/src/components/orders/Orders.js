import React, { useContext, useEffect } from 'react';
import SingleOrder from './SingleOrder';
import OrderContext from '../../context/orders/orderContext';
import Preloader from '../preloader/Preloader';
function Orders() {
  const orderContext = useContext(OrderContext);
  const { getOrders, orders, loading, error } = orderContext;

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col m12 s12 l12">
          {loading ? <Preloader/> : orders.length === 0 && !loading ? (
            <p>It looks you have not placed any orders yet</p>
          ) : (
            <table className="highlight centered">
              <thead>
                <tr>
                  <th>Order Number</th>

                  <th>Delivery</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (
                  <SingleOrder item={order} key={index} />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
