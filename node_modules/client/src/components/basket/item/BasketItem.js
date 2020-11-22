import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import BasketContext from '../../../context/basket/basketContext';
import ItemDropdown from './ItemDropdown';
function BasketItem({
  basket: { name, description, quantity, _id, sold, price, photo },
}) {
  let url = '';
  const basketContext = useContext(BasketContext);
  const { deleteBasketItem } = basketContext;
  const deleteItem = (e) => {
    e.preventDefault();
    deleteBasketItem(_id);
  };
  return (
    <div className="card horizontal-custom-item-card basket">
      <div className="card-image-item-card">
        <img src={photo?.[0]} className="img-custom-item-card basket" />
      </div>{' '}
      <div className="container custom-item-card-container basket">
        <div className="container">
          {' '}
          <div className="row">
            <div className="col m12 s12 l12 mt-1">
              <h5 className="header center-align">{name}</h5>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col m12 s12 l12">
              <div className="custom-item-card-link basket">
                <div>
                  {' '}
                  <Link to={`/item/${_id}`}>Item Details</Link>
                </div>{' '}
                <div>
                  {' '}
                  <Link to={'/basket'} onClick={deleteItem}>
                    Delete
                  </Link>{' '}
                </div>
                <div>
                  {' '}
                  <ItemDropdown />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasketItem;
