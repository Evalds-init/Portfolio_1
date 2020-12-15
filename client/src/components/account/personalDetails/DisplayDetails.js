import React, { useContext } from 'react';
import AuthContext from '../../../context/auth/authContext';

function DisplayDetails() {
  const authContext = useContext(AuthContext);
  const { user} = authContext;

  return (
    <div className="row">
      <div className="col s12 m12">
        <div className="card-panel">
          <span className="black-text">
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>{user ? user.name : ''}</td>
                  <td>{user? user.lastName : ''}</td>
                  <td>{user ? user.email: ''}</td>
                  <td>{user? user.tel : ''}</td>
                </tr>
              </tbody>
            </table>
          </span>
        </div>
      </div>
    </div>
  );
}

export default DisplayDetails;
