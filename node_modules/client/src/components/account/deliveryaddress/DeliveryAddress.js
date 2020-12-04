import React, { useReducer } from 'react';
import AdressCard from './AddressCard';
import EditDeliveryAddress from './EditDeliveryAddress';
function DeliveryAddress({ address }) {
  const [add, toggleAdd] = useReducer((add) => !add, false);

  return (
    <div id="test6">
      <div className="row">
        {add ? (
          <EditDeliveryAddress toggleAdd={toggleAdd} newEntry={add} />
        ) : (
          address.map((item, index) => (
            <AdressCard address={item} key={index} />
          ))
        )}
      </div>
      <button
        className="btn waves-effect waves-light light-green mt-3"
        onClick={toggleAdd}
      >
        Add
        <i className="material-icons right">add</i>
      </button>
    </div>
  );
}

export default DeliveryAddress;
