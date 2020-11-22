import React, { useState, useEffect, useContext } from 'react';
import NoticeBoardPartition from './NoticeBoardPartition';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

function Login(props) {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { login, isAuthenticated } = authContext;
  const [user, setUser] = useState({ email: '', password: '' });
  const { email, password } = user;
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
  }, [isAuthenticated, props.history]);
  const onChange = (e) => {
    
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    
    // handle all cases
    if (email === '' || password === '') {
      setAlert(
        'Please enter your details',
        'red',
        'col s6 offset-s6 m6 offset-m6 l6 offset-l6'
      );
    } else {
      login({ email, password });
    }
  };
  return (
    <div className="container mt-5 ">
      <div className="row">
        <NoticeBoardPartition />
        <form className="col s6 m6 l6 ">
          <div className="row">
            <div className="input-field col s12">
              <input
                id="password"
                type="password"
                className="validate"
                value={password}
                name="password"
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
                value={email}
                name="email"
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
            Login
            <i className="large material-icons right ">login</i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
