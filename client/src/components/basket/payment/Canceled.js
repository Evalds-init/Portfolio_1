import React from 'react';
import { Link } from 'react-router-dom';

const Canceled = () => {
  return (
    <div className="row">
      <div className="col s8 m6 l4 offset-s2 offset-m3 offset-l4">
        <div className="failure-container hoverable z-depth-3">
          <div className="failure-container_header center">
            <h5>Payment has been canceled</h5>
          </div>
          <div className="failure-container_body">
            <div>
              <Link to="/orders" className="failure-container_link">
                Return to your basket
              </Link>
            </div>
            <div>
              {' '}
              <Link to="/" className="failure-container_link">
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canceled;
