import React from 'react';

function Preloader({ ...props }) {
  return (
    <div className="progress" {...props}>
      <div className="indeterminate"></div>
    </div>
  );
}

export default Preloader;
