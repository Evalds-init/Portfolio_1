import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductContext from '../../context/products/productContext';
function MainPageItemList({ item: { photo, name, _id, description, price } }) {
  const productContext = useContext(ProductContext);
  const { getProduct } = productContext;
  const onClick = (e) => {
    getProduct(_id);
  };
  return (
    <div className="row">
      <div className="col s12 m12 l12 section">
        <div className="horizontal-custom-item-card  hoverable">
          <div className="card-image-item-card">
            <img src={photo[0]} className="img-custom-item-card" />
          </div>{' '}
          <div className="row">
            <div className="col m12 s12 l12">
              {' '}
              <div className="custom-item-card-container">
                <div className="row">
                  <div className="col m12 s12 l12">
                    <h5 className="item-header center-align">{name}</h5>
                    <p className="custom-item-card-ellipsis">{description}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col m12 s12 l12">
                    {' '}
                    <div className="card-action">
                      <div>
                        {' '}
                        <Link to={'#reviews'} className="hide-on-med-and-down">
                          Reviews
                        </Link>{' '}
                      </div>
                      <div>
                        {' '}
                        <Link to={`/item/${_id}`} onClick={onClick}>
                          More
                        </Link>
                      </div>
                      <div>
                        {' '}
                        <Link to={`/item/${_id}`} onClick={onClick} className='price'>
                          Price: £{price}
                        </Link>
                      </div>
                    </div>
                  </div>{' '}
                </div>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPageItemList;
