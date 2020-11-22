import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import M from 'materialize-css';
const Register = (props) => {
  const authContext = useContext(AuthContext);

  const { register, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
  }, [isAuthenticated, props.history]);

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
      M.toast({ html: 'Please enter all required fields', classes: 'failure' });
    } else if (password !== password2) {
      M.toast({ html: 'Passwords do not match', classes: 'failure' });
    } else {
      register({ name, email, password });
      M.toast({
        html: 'You have successfully registered and account',
        classes: 'success',
      });
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
                id="password 2"
                type="password"
                className="validate"
                name="password2"
                value={password2}
                onChange={onChange}
              />
              <label htmlFor="password">Password</label>
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
