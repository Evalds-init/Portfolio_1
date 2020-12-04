import React, { useState, useContext } from 'react';
import AuthContext from '../../../context/auth/authContext';
import AlertContext from '../../../context/alert/alertContext';

function EditDetails() {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { updateDetails, isAuthenticated, user } = authContext;

  const [updatedDetails, setUpdatedDetails] = useState({
    name: user.name || '',
    lastName: user.lastName || '',
    email: user.email || '',
    tel: user.tel || '',
  });
  const { name, lastName, email, tel } = updatedDetails;
  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || lastName === '') {
      setAlert(
        'Please enter your details',
        'red',
        'col s8 offset-s2 m8 offset-m2 l8 offset-l2'
      );
    } else {
      updateDetails({ name, lastName, email, tel });
    }
  };
  const onChange = (e) => {
    setUpdatedDetails({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">account_circle</i>
            <input
              id="first_name"
              type="text"
              className="validate"
              onChange={onChange}
              value={name}
              name="name"
            />
            <label htmlFor="first_name" className="active">
              First Name
            </label>
          </div>
          <div className="input-field col s6">
            <i className="material-icons prefix">account_circle</i>
            <input
              id="last_name"
              type="text"
              className="validate"
              onChange={onChange}
              value={lastName}
              name="lastName"
            />
            <label htmlFor="last_name" className="active">
              Last Name
            </label>
          </div>
          <div className="input-field col s6">
            <i className="material-icons prefix">email</i>
            <input
              id="email"
              type="email"
              className="validate"
              onChange={onChange}
              value={email}
              name="email"
            />
            <label htmlFor="email" className="active">
              email
            </label>
          </div>
          <div className="input-field col s6">
            <i className="material-icons prefix">phone</i>
            <input
              id="icon_telephone"
              type="tel"
              className="validate"
              onChange={onChange}
              value={tel}
              name="tel"
            />
            <label htmlFor="icon_telephone" className="active">
              Telephone
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
    </div>
  );
}

export default EditDetails;
