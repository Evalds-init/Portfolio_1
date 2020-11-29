import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="row">
      <div className="col s8 m6 l4 offset-s2 offset-m3 offset-l4">
        <div className="success-container hoverable z-depth-3">
          <div className="success-container_header center">
            <h5>Your payment was successfull.</h5>
          </div>
          <div className="success-container_body">
            <div>
              <Link to="/orders" className="success-container_link">
                View your orders
              </Link>
            </div>
            <div>
              {' '}
              <Link to="/" className="success-container_link">
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
