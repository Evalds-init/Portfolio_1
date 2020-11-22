import React from 'react';

function SingleOrder({ item }) {
  let url = '';
  return (
    <tr>
      <td>Jonathan</td>
      <td>Lollipop</td>
      <td>
        {' '}
        <a href={url} className="waves-effect waves-light btn green">
          Track
        </a>
      </td>
      <td>
        <a href={url} className="waves-effect waves-light btn blue">
          Submitted
        </a>
      </td>
    </tr>
  );
}

export default SingleOrder;
