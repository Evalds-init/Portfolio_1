import React, { useContext, useState } from 'react';
import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';
export default function EditDeliveryAddress({ address = {}, ...props }) {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { updateUserAddress, addUserAddress } = authContext;
  const [updateAddress, setUpdateAddress] = useState({
    name: address.name,
    line1: address.line1 || '',
    line2: address.line2 || '',
    city: address.city || '',
    postcode: address.postcode || '',
  });
  const { name, line1, line2, city, postcode } = updateAddress;

  const onSubmit = (e) => {
    e.preventDefault();

    if ((name === '', line1 === '' || city === '' || postcode === '')) {
      setAlert(
        'Please provide all required details',
        'red',
        'col s8 offset-s2 m8 offset-m2 l8 offset-l2'
      );
    } else {
      if (props.newEntry) {
        props.toggleAdd();
        addUserAddress(updateAddress);
      } else {
        updateAddress._id = address._id;
        updateUserAddress(updateAddress);
        props.toggleForm();
      }
    }
  };
  const onChange = (e) => {
    setUpdateAddress({ ...updateAddress, [e.target.name]: e.target.value });
  };
  return (
    <form className="col s8 offset-s2 m6 l6">
      <div className="row">
        <div className="input-field col s12 m12 l12">
          <i className="material-icons prefix">card_membership</i>
          <input
            id="name"
            type="text"
            className="validate"
            onChange={onChange}
            value={name}
            name="name"
          />
          <label htmlFor="name" className="active">
            Name
          </label>
        </div>
        <div className="input-field col s12 m12 l12">
          <i className="material-icons prefix">home</i>
          <input
            id="first_name"
            type="text"
            className="validate"
            onChange={onChange}
            value={line1}
            name="line1"
          />
          <label htmlFor="first_name" className="active">
            Address line 1
          </label>
        </div>
        <div className="input-field col  s12 m12 l12">
          <i className="material-icons prefix">home</i>
          <input
            id="last_name"
            type="text"
            className="validate"
            onChange={onChange}
            value={line2}
            name="line2"
          />
          <label htmlFor="last_name" className="active">
            Address line 2 (optional)
          </label>
        </div>
        <div className="input-field col  s12 m12 l12">
          <i className="material-icons prefix">location_city</i>
          <input
            id="email"
            type="email"
            className="validate"
            onChange={onChange}
            value={city}
            name="city"
          />
          <label htmlFor="email" className="active">
            Town/City
          </label>
        </div>
        <div className="input-field col  s12 m12 l12">
          <i className="material-icons prefix">location_on</i>
          <input
            id="icon_telephone"
            type="tel"
            className="validate"
            onChange={onChange}
            value={postcode}
            name="postcode"
          />
          <label htmlFor="icon_telephone" className="active">
            Postcode
          </label>
        </div>
      </div>

      <button
        className="btn waves-effect waves-light blue lighten-1"
        type="submit"
        onClick={onSubmit}
      >
        Submit
        <i className="large material-icons right ">send</i>
      </button>
    </form>
  );
}
