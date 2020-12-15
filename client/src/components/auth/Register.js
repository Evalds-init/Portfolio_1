import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
const Register = (props) => {
  const authContext = useContext(AuthContext);

  const { register, isAuthenticated, authError } = authContext;
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  useEffect(() => {
    if (isAuthenticated) {
      setAlert(
        'You have successfully registered an account',
        'green',
        'col s10 offset-s1 m8 offset-m2 l8 offset-l2'
      );
      props.history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  useEffect(() => {
    if (authError) {
      setAlert(
        `${authError}`,
        'red',
        'col s10 offset-s1 m8 offset-m2 l8 offset-l2'
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authError]);

  const [user, setUser] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2, lastName } = user;
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // handle all cases
    if (name === '' || email === '' || password === '') {
      setAlert(
        'All fields are required',
        'red',
        'col s10 offset-s1 m8 offset-m2 l8 offset-l2'
      );
    } else if (password !== password2) {
      setAlert(
        'Passwords do not match',
        'red',
        'col s10 offset-s1 m8 offset-m2 l8 offset-l2'
      );
    } else {
      register({ name, email, password, lastName });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <form className="col s10 offset-s1 m8 offset-m2 l8 offset-l2">
          <div className="row">
            <div className="input-field col s6">
              <input
                id="first_name"
                type="text"
                className="validate"
                name="name"
                value={name}
                onChange={onChange}
              />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="input-field col s6">
              <input
                id="last_name"
                type="text"
                className="validate"
                name="lastName"
                value={lastName}
                onChange={onChange}
              />
              <label htmlFor="last_name">Last Name</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="password"
                type="password"
                className="validate"
                name="password"
                value={password}
                onChange={onChange}
              />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="password2"
                type="password"
                className="validate"
                name="password2"
                value={password2}
                onChange={onChange}
              />
              <label htmlFor="password2">Password</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                id="email"
                type="email"
                className="validate"
                name="email"
                value={email}
                onChange={onChange}
              />
              <label htmlFor="email">Email</label>
            </div>
          </div>

          <button
            className="btn waves-effect waves-light blue accent-2"
            type="submit"
            onClick={onSubmit}
          >
            Register
            <i className="material-icons right ">send</i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
