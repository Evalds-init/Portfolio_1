import React from 'react';
import { Link } from 'react-router-dom';

function MainPageItemList({ item: { photo, name, _id, description } }) {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col s12 m12 l12">
          <div className="card horizontal-custom-item-card">
            <div className="card-image-item-card">
              <img src={photo[0]} className="img-custom-item-card" />
            </div>{' '}
            <div className="container custom-item-card-container">
              <div className="container">
                {' '}
                <div className="row">
                  <div className="col m12 s12 l12 mt-1">
                    <h5 className="header center-align">{name}</h5>
                    <p className="custom-item-card-ellipsis">{description}</p>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col m12 s12 l12">
                    <div className="custom-item-card-link">
                      <div>
                        {' '}
                        <Link to={'#reviews'} className='hide-on-small-only'>Reviews</Link>
                      </div>{' '}
                      <div>
                        {' '}
                        <Link to={`/item/${_id}`}>More</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPageItemList;
