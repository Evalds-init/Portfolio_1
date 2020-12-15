import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BasketContext from '../../../context/basket/basketContext';
import QuantitySelector from './QuantitySelector';
import AlertContext from '../../../context/alert/alertContext';
import ProductContext from '../../../context/products/productContext';
function BasketItem({ basket }) {
  const productContext = useContext(ProductContext);
  const alertContext = useContext(AlertContext);
  const basketContext = useContext(BasketContext);
  const { deleteBasketItem, changeItemQuantity } = basketContext;
  const { setAlert } = alertContext;
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (quantity === 0) {
      setQuantity(1);
      setAlert(
        'Quantity can not be set to 0',
        'blue darken-2',
        'col s10 offset-s1 m10 offset-m1 l10 offset-l1'
      );
    }
    changeItemQuantity(basket._id, quantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  const decreaseQuantity = () => {
    setQuantity(quantity - 1);
  };
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const deleteItem = (e) => {
    e.preventDefault();
    deleteBasketItem(basket._id);
  };
  const onClick = () => {
    productContext.getProduct(basket._id);
  };
  return (
    <div className="row">
      <div className="col m10 l8 s10 offset-l2 offset-m1 offset-s1">
        <div className="card horizontal-custom-item-card">
          <div className="card-image-item-card">
            <img
              src={basket.photo?.[0]}
              className="img-custom-item-card basket"
              alt="product"
            />
          </div>{' '}
          <div className="custom-item-card-container basket">
            {' '}
            <div className="row">
              <div className="col m12 s12 l12">
                <div className="basket-header">
                  <h6 className="basket-header_text center-align">
                    {basket.name}
                  </h6>{' '}
                  <p className="custom-item-card-ellipsis basket">
                    {basket.description}
                  </p>{' '}
                  <div className="basket-total-price hide-on-small-only">
                    Item total: £ {basket.price * quantity}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col m12 s12 l12">
                <div className="card-action">
                  <div>
                    {' '}
                    <Link to={`/item/${basket._id}`} onClick={onClick}>
                      Item Details
                    </Link>
                  </div>{' '}
                  <div>
                    {' '}
                    <Link to={'/basket'} onClick={deleteItem}>
                      Delete
                    </Link>{' '}
                  </div>
                  <div>
                    {' '}
                    <QuantitySelector
                      price={basket.price * quantity}
                      increaseQuantity={increaseQuantity}
                      decreaseQuantity={decreaseQuantity}
                      quantity={quantity}
                    />
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

export default BasketItem;
