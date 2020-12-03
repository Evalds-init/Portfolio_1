import React from 'react';
import { Link } from 'react-router-dom';
function SingleOrder({ item }) {
  return (
    <tr>
      <td>{item.transaction_id}</td>

      <td>
        {' '}
        <Link to="/orders" className="waves-effect  btn green lighten-2">
          Track
        </Link>
      </td>
      <td>
        {item.status === 'Not processed' ? (
          <button className="waves-effect btn yellow darken-3">
            {item.status}
          </button>
        ) : (
          <button className="waves-effect btn blue lighten-2">
            {item.status}
          </button>
        )}
      </td>
    </tr>
  );
}

export default SingleOrder;
