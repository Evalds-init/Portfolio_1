import React, { useEffect, useContext, Fragment } from 'react';
import MainPageItemList from './MainPageItemList';
import Options from '../selector/Options';
import Pagination from '../utils/Pagination';
import AuthContext from '../../context/auth/authContext';
import ProductContext from '../../context/products/productContext';
import Search from '../selector/Search';
function MainPageItems({}) {
  const authContext = useContext(AuthContext);
  const productContext = useContext(ProductContext);
  const { persistUser, isAuthenticated } = authContext;
  const { products, filtered, getProducts, searchResults, ratingFilter } = productContext;
  useEffect(() => {
    if (!isAuthenticated) {
      persistUser();
    }
  }, []);
  useEffect(() => {
    if (products?.length === 0) {
      getProducts();
    }
  }, [products]);

  return (
    <div className="z-depth-1 main-page-items">
      <Search />
      <div className="row">
        <Options />
        <div className="col s12  m10 l10">
          {searchResults.length !== 0
            ? searchResults.map((item) => (
                <MainPageItemList item={item} key={item._id} />
              ))
            : ratingFilter.length !== 0
            ? ratingFilter.map((item) => (
                <MainPageItemList item={item} key={item._id} />
              ))
            : products.length !== 0 &&
              products.map((item) => (
                <MainPageItemList item={item} key={item._id} />
              ))}
        </div>

        <Pagination />
      </div>
    </div>
  );
}

export default MainPageItems;
