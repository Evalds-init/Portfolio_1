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
    <div className="mt-3">
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
                    <Link to={'#reviews'} className="hide-on-small-only">
                      Reviews
                    </Link>
                  </div>{' '}
                  <div>
                    {' '}
                    <Link to={`/item/${_id}`} onClick={onClick}>
                      More
                    </Link>
                  </div>
                  <div>
                    <p className="main-item-price">Price: £{price}</p>
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
