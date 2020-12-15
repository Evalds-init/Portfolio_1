import React, { useState, useReducer, useEffect, useContext } from 'react';
import NoticeBoardPartition from './NoticeBoardPartition';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

function Login(props) {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { login, isAuthenticated, persistUser, authError } = authContext;
  const [user, setUser] = useState({ email: '', password: '' });
  const { email, password } = user;
  const [remember, toggleRemember] = useReducer((remember) => !remember, false);
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
  }, [isAuthenticated, props.history]);
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (authError) {
      setAlert(
        `${authError.error}`,
        'red',
        'col s6 offset-s6 m6 offset-m6 l6 offset-l6'
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authError]);
  const onSubmit = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setAlert(
        'Please fill in all required fields',
        'red',
        'col s6 offset-s6 m6 offset-m6 l6 offset-l6'
      );
    } else {
      if (remember) {
        persistUser(user);
      } else {
        login(user);
      }
    }
  };
  return (
    <div className="mt-5 mr-2 ml-2">
      <div className="row">
        <NoticeBoardPartition />
        <form className="col s10 offset-s1 m6 l6">
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
            <div className="row">
              <div className="col s12 m12 l12">
                <div className="row">
                  <div className="col l12 m12 s12">
                    {' '}
                    <div style={{ marginLeft: '0.6rem' }}>
                      {' '}
                      <p>
                        <label htmlFor="remember_me">
                          <input
                            type="checkbox"
                            id="remember_me"
                            onClick={toggleRemember}
                          />
                          <span>Remember Me</span>
                        </label>
                      </p>{' '}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col s6 offset-s2 m6 offset-m2 l6 offset-l2 right">
                    <div>
                      {' '}
                      <button
                        className="btn waves-effect waves-light blue accent-2"
                        type="submit"
                        onClick={onSubmit}
                      >
                        Login
                        <i className="large material-icons right ">login</i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
