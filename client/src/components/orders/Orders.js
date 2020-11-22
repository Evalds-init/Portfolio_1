import React from 'react';
import SingleOrder from './SingleOrder';
function Orders() {
  const items = [
    {
      name: 'Washing Machine',
      description: 'cool item',
      quantity: '12',
    },
    {
      name: 'Bike',
      description: 'Low Miles',
      quantity: '11',
    },
  ];
  return (
    <div className="container">
      <div className="row">
        <div className="col m12 s12 l12">
          <table className="highlight centered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Item Name</th>
                <th>Delivery</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <SingleOrder item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Orders;
