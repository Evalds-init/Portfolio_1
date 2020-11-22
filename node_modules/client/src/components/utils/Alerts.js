import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
function Alerts() {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;
  console.log(alerts);
  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div className="row">
        {' '}
        <div className={alert.location}>
          <div key={alert.id} className={`alert ${alert.color}`}>
            <i className="fas fe-info-circle">{alert.msg}</i>
          </div>
        </div>
      </div>
    ))
  );
}

export default Alerts;
