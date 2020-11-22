import React from 'react';
import { Link } from 'react-router-dom';

const Canceled = () => {
  return (
    <div className="row">
      <div className="col s6 m6 l6 offset-s3 offset-m3 offset-l3">
        <header className="sr-header">
          <div className="sr-header__logo"></div>
        </header>
        <div className="sr-payment-summary completed-view">
          <h1>Your payment was canceled</h1>
          <Link to="/">Restart demo</Link>
        </div>
      </div>
      <div className="sr-content">
        <div className="pasha-image-stack">
          <img
            alt=""
            src="https://picsum.photos/280/320?random=1"
            width="140"
            height="160"
          />
          <img
            alt=""
            src="https://picsum.photos/280/320?random=2"
            width="140"
            height="160"
          />
          <img
            alt=""
            src="https://picsum.photos/280/320?random=3"
            width="140"
            height="160"
          />
          <img
            alt=""
            src="https://picsum.photos/280/320?random=4"
            width="140"
            height="160"
          />
        </div>
      </div>
    </div>
  );
};

export default Canceled;
