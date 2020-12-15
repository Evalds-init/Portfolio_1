import React from 'react'

function PaymentCards() {
    return (
      <div id="test6">
        {' '}
        <div className="row">
          <div className="col s12 m12">
            <div className="card-panel black-text">
              <span className="black-text">
                <table>
                  <thead>
                    <tr>
                      <th>Card Type</th>
                      <th>Card Number</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Visa</td>
                      <td>5645641324874891</td>
                      <td>Confirmed</td>
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

export default PaymentCards
