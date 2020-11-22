import React from 'react';

function Pagination() {
  let url = '';
  return (
    <div className="container">
      <div className="row">
        <div className="col m6 push-m6">
          <ul className="pagination">
            <li className="waves-effect">
              <a href={url}>
                <i className="material-icons">chevron_left</i>
              </a>
            </li>
            <li className=" active waves-orange">
              <a href={url}>1</a>
            </li>
            <li className="waves-effect waves-orange">
              <a href={url}>2</a>
            </li>
            <li className="waves-effect waves-orange">
              <a href={url}>3</a>
            </li>
            <li className="waves-effect waves-orange">
              <a href={url}>4</a>
            </li>
            <li className="waves-effect waves-orange">
              <a href={url}>5</a>
            </li>
            <li className="waves-effect waves-orange">
              <a href={url}>
                <i className="material-icons">chevron_right</i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
