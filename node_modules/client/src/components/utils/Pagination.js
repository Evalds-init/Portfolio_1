import React from 'react';

function Pagination() {
  let url = '';
  return (
   
        <div className="col m5 offset-m6 s12 l5 offset-l5">
          <ul className="pagination pagination_custom">
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
 
  );
}

export default Pagination;
