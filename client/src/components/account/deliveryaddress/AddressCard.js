import React, { useReducer, Fragment, useContext } from 'react';
import EditDeliveryAddress from './EditDeliveryAddress';
import AuthContext from '../../../context/auth/authContext';
export default function AddressCard({ address }) {
  const authContext = useContext(AuthContext);
  const { deleteAddress } = authContext;
  const [form, toggleForm] = useReducer((form) => !form, false);
  const deleteItem = () => {
    deleteAddress(address._id);
  };
  return (
    <Fragment>
      {form ? (
        <EditDeliveryAddress address={address} toggleForm={toggleForm} />
      ) : (
        <div className="col s8 offset-s2 m6 l6">
          <div className="card-panel grey lighten-2 z-depth-2">
            <span className="black-text">
              <table>
                <thead>
                  <tr>
                    <th>{address.name}</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      <p>{address.line1}</p>
                      <p>{address.line2}</p>
                      <p>{address.city}</p>
                      <p>{address.postcode}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </span>{' '}
            <div
              className="address-card"
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              {' '}
              <button
                className="btn waves-effect waves-light light-blue mt-3"
                onClick={toggleForm}
              >
                Edit
                <i className="material-icons right">edit</i>
              </button>
              <button
                className="btn waves-effect waves-light red darken-2 mt-3"
                onClick={deleteItem}
              >
                Delete
                <i className="material-icons right">delete</i>
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
