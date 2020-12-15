import React, { useContext, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import M from 'materialize-css';
function Navbar() {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logout, loadUser } = authContext;

  useEffect(() => {
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
  }, []);
  useEffect(() => {
    let cookies = document.cookie
      .split(',')
      .includes('cookieCheck=cookieExists');
    if (cookies) {
      loadUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let url = ' ';
  const authLinks = (
    <Fragment>
      <li>
        <Link to="/account" className="sidenav-close">
          Account
        </Link>
      </li>
      <li>
        <Link to="/orders" className="sidenav-close">
          Orders
        </Link>
      </li>
      <li>
        <Link to="/basket" className="sidenav-close">
          Basket
        </Link>
      </li>{' '}
      <li>
        <Link to="/" onClick={() => logout()} className="sidenav-close">
          Logout
        </Link>
      </li>
      <li>
        <Link to="/about" className="sidenav-close">
          About
        </Link>
      </li>
    </Fragment>
  );
  const adminLinks = (
    <Fragment>
      <li>
        <Link to="/admin/addmerchandise">Add Product</Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/orders" className="sidenav-close">
          Orders
        </Link>
      </li>
      <li>
        <Link to="/basket" className="sidenav-close">
          Basket
        </Link>
      </li>{' '}
      <li>
        <Link to="/register" className="sidenav-close">
          Register
        </Link>
      </li>
      <li>
        <Link to="/login" className="sidenav-close">
          Login
        </Link>
      </li>
      <li>
        <Link to="/about" className="sidenav-close">
          About
        </Link>
      </li>
    </Fragment>
  );

  return (
    <Fragment>
      <nav className="navigation">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            React<i className="fas fa-box-open hide-on-small-and-down ml-1"></i>
            Pantry
          </Link>

          <a href={url} data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>

          <ul className="right hide-on-med-and-down">
            {user?.role === 'admin' && adminLinks}
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </nav>
      <ul className="sidenav" id="mobile-demo">
        <li>
          <Link to="/account">
            <i className="material-icons  hello-user ">account_circle</i>
            <p
              className="hello-user-name center"
              style={{ fontSize: '1.8rem' }}
            >
              Hello, {user ? user.name : 'Guest'}
            </p>
          </Link>
        </li>
        <li>
          <div className="divider"></div>
        </li>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </Fragment>
  );
}

export default Navbar;
