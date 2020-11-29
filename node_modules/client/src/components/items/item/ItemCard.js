import React, { Fragment, useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../../context/auth/authContext';
import ProductContext from '../../../context/products/productContext';
import AlertContext from '../../../context/alert/alertContext';
import BasketContext from '../../../context/basket/basketContext';
import AddImages from '../../admin/AddImages';
import Stars from './starRating/Stars';
import M from 'materialize-css';
function ItemCard({ product: { _id } }) {
  const alertContext = useContext(AlertContext);
  const basketContext = useContext(BasketContext);
  const { basket, addToBasket } = basketContext;
  const { setAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const productContext = useContext(ProductContext);
  const { user, isAuthenticated } = authContext;
  const { product, addImages } = productContext;

  let url = '#one!';

  const [image, setImage] = useState(false);

  useEffect(() => {
    setImage(false);
  }, [addImages]);
  const showImageInput = () => {
    setImage(true);
  };
  useEffect(() => {
    var elems = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(elems, {
      direction: 'left',
      hoverEnabled: false,
    });
  }, []);
  const toBasket = (e) => {
    e.preventDefault();
    if (basket) {
      let currentBasket = basket.map(function (item) {
        return item._id;
      });
      if (currentBasket.includes(_id)) {
        setAlert(
          'The item is already in your basket',
          'red',
          'col s8 offset-s2 m8 offset-m2 l8 offset-l2'
        );
      } else {
        setAlert(
          'Item succesfully added to basket',
          'green',
          'col s8 offset-s2 m8 offset-m2 l8 offset-l2'
        );
        addToBasket(product, 1);
      }
    } else {
      setAlert(
        'Item succesfully added to basket',
        'green',
        'col s8 offset-s2 m8 offset-m2 l8 offset-l2'
      );
      addToBasket(product, 1);
    }
  };

  return (
    <Fragment>
      {image && <AddImages id={_id} />}

      <div className="row">
        <div className="col m12 s12 l12">
          <h2 className="header center">{product && product.name}</h2>
          <div className="card horizontal">
            <div className="card-stacked">
              <div>
                <div className="row">
                  <div className="col m6 s6 l6">
                    <div className="card-content center">
                      <p className="">{product && product.description}</p>
                    </div>
                  </div>
                  <div className="col m6  mt-1 s6">
                    <div className="item-view-stars center">
                      <div>
                        <span>Avarge rating:</span>
                      </div>
                      <Stars size="18" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col m4 l4 s4">
                    <div className="card-action">
                      <a href="#one!" onClick={toBasket}>
                        Add to basket
                      </a>
                    </div>
                  </div>
                  <div className="col m4 l4 s4">
                    <div className="card-action">
                      <a href={url}>Add to wish list</a>
                    </div>
                  </div>
                  <div className="col m4 l4 s4">
                    <div className="card-action">
                      <a href={url}>Ask the seller</a>
                    </div>
                  </div>
                  {user?.role === 'admin' && isAuthenticated && (
                    <div class="fixed-action-btn admin">
                      <a class="btn-floating btn-large red">
                        <i class="large material-icons">edit</i>
                      </a>
                      <ul>
                        <li>
                          <a class="btn-floating yellow darken-1">
                            <i class="material-icons">mode_edit</i>
                          </a>
                        </li>

                        <li>
                          <a class="btn-floating blue" onClick={showImageInput}>
                            <i class="material-icons">attach_file</i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ItemCard;
