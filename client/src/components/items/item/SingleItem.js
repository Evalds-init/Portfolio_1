import React, { Fragment, useEffect, useContext } from 'react';
import Search from '../../selector/Search';
import ProductContext from '../../../context/products/productContext';
import M from 'materialize-css';
import ItemCard from './ItemCard';
import { useHistory } from 'react-router-dom';
import Preloader from '../../preloader/Preloader';
function SingleItem({ match }) {
  let history = useHistory();
  const productContext = useContext(ProductContext);
  const { product, loading, removeProduct } = productContext;
  let url = '#one!';
  useEffect(() => {
    const options = { numVisible: 5 };
    var elems = document.querySelectorAll('.carousel');
    M.Carousel.init(elems, options);
  }, []);
  useEffect(() => {
    if (product.length === 0) {
      history.push('/');
    }
  }, []);
  useEffect(() => {
    return () => {
      removeProduct();
    };
  }, []);

  return (
    <Fragment>
      {' '}
      {loading ? (
        <Preloader />
      ) : (
        <div className="container">
          <Search />
          <div className="row">
            <div className="col m12 s12 l12">
              <div className="carousel">
                {product?.photo?.[0] ? (
                  product.photo.map((item, index) => (
                    <a
                      className="carousel-item"
                      href={url}
                      onClick={(e) => e.preventDefault}
                      key={index}
                    >
                      <img src={item} />
                    </a>
                  ))
                ) : (
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
      )}
      <ItemCard product={product} />
    </Fragment>
  );
}

export default SingleItem;
