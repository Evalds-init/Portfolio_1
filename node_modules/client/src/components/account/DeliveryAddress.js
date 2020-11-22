import React from 'react';

function DeliveryAddress() {
  return (
    <div id="test6">
      <div className="row">
        <div className="col s6 m6">
          <div className="card-panel grey lighten-3">
            <span className="black-text">
              <table>
                <thead>
                  <tr>
                    <th>Default</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Flat 1, Newcastle, NE55BJ</td>
                  </tr>
                </tbody>
              </table>
            </span>
          </div>
        </div>
        <div className="col s6 m6">
          <div className="card-panel grey lighten-4">
            <span className="black-text">
              <table>
                <thead>
                  <tr>
                    <th>Secondary</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>Flat 77, Aberdeen, AB77CE</td>
                  </tr>
                </tbody>
              </table>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryAddress;
