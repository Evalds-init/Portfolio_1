import React, { Fragment, useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Search from '../../selector/Search';
import ProductContext from '../../../context/products/productContext';
import M from 'materialize-css';
import ItemCard from './ItemCard';
function SingleItem({ match }) {
  const productContext = useContext(ProductContext);
  const { getProduct, product, removeProduct } = productContext;
  let url = '#one!';
  useEffect(() => {
    const options = { numVisible: 5 };
    var elems = document.querySelectorAll('.carousel');
    M.Carousel.init(elems, options);
  }, []);
  useEffect(() => {
    getProduct(match.params.id);
    return () => {
      removeProduct();
    };
  }, []);


  return (
    <Fragment>
      {' '}
      <div className="container">
        <Search />
        <div className="row">
          <div className="col m12 s12 l12">
            <div className="carousel">
              <a
                className="carousel-item"
                href={url}
                onClick={(e) => e.preventDefault}
              >
                <img src={product?.photo[0]} />
              </a>
              <a
                className="carousel-item"
                href={url}
                onClick={(e) => e.preventDefault}
              >
                <img src={product?.photo[1]} />
              </a>
              <a
                className="carousel-item"
                href={url}
                onClick={(e) => e.preventDefault}
              >
                <img src={product?.photo[2]} />
              </a>

              {!product?.photo && (
                <a className="carousel-item" href={url}>
                  <img
                    src="https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png"
                    alt="Product"
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      <ItemCard itemId={match.params.id} />
    </Fragment>
  );
}

export default SingleItem;
