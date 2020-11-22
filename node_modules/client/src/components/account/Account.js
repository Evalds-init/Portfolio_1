import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import PersonalDetails from './personalDetails/PersonalDetails';
import PaymentCards from './PaymentCards';
import DeliveryAddress from './DeliveryAddress';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
function Account() {
    let history = useHistory();
    const authContext = useContext(AuthContext);
    const { user, isAuthenticated } = authContext;
    useEffect(() => {
      if (!isAuthenticated) {
        history.push('/');
      }
    }, [isAuthenticated]);
  useEffect(() => {
    var el = document.querySelector('.tabs');
    M.Tabs.init(el);
  }, []);
  const [tab, setTab] = useState('');

  let url = ' ';
  const onClick = (e) => {
    setTab('');
    setTab(e.target.name);
    
  };
  return (
    <div className="z-depth-1 grey lighten-3">
      <div className="row">
        <div className="col s12 m12 l12">
          <div className="card">
            <div className="card-content">
              <p>
                Please note that payment cards need to be verified before first
                use.
              </p>
            </div>
            <div className="card-tabs">
              <ul className="tabs tabs-fixed-width">
                <li className="tab">
                  <Link to="" onClick={onClick} name="personaldetails">
                    Personal Details
                  </Link>
                </li>
                <li className="tab">
                  <Link to="" onClick={onClick} name="paymentcards">
                    Payment Cards
                  </Link>
                </li>
                <li className="tab">
                  <Link to="" onClick={onClick} name="deliveryaddress">
                    Delivery Addresses
                  </Link>
                </li>
              </ul>
            </div>
            <div className="card-content grey lighten-4">
              {tab === 'deliveryaddress' ? (
                <DeliveryAddress />
              ) : tab === 'paymentcards' ? (
                <PaymentCards />
              ) : (
                <PersonalDetails  />
              )}

       
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
