import React, { useEffect, useContext, Fragment } from 'react';
import MainPageItemList from './MainPageItemList';
import Options from '../selector/Options';
import Pagination from '../utils/Pagination';
import AuthContext from '../../context/auth/authContext';
import BasketContext from '../../context/basket/basketContext';
import ProductContext from '../../context/products/productContext';
import Search from '../selector/Search';
import Preloader from '../preloader/Preloader';
import AdminContext from '../../context/admin/adminContext';
function MainPageItems({}) {
  const adminContext = useContext(AdminContext);
  const { adminError, createdProduct } = adminContext;
  const authContext = useContext(AuthContext);
  const basketContext = useContext(BasketContext);
  const productContext = useContext(ProductContext);
  const { isAuthenticated } = authContext;
  const { getBasketItems } = basketContext;
  const {
    products,
    categoryFilter,
    getProducts,
    searchResults,
    loading,
  } = productContext;
  useEffect(() => {
    getProducts();
    if (isAuthenticated) {
      getBasketItems();
    }
  }, []);
  useEffect(() => {
    if (!adminError && createdProduct) {
      getProducts();
    }
  }, [createdProduct]);

  return (
    <div className="z-depth-1 main-page-items">
      <Search />
      <div className="row">
        <Options />
        <div className="col s12 m7 offset-m1 l8">
          {loading ? (
            <Preloader style={{ marginTop: '100px', marginBottom: '15rem' }} />
          ) : searchResults.length !== 0 ? (
            searchResults.map((item, index) => (
              <MainPageItemList item={item} key={index} />
            ))
          ) : categoryFilter.length !== 0 ? (
            categoryFilter.map((item, index) => (
              <MainPageItemList item={item} key={index} />
            ))
          ) : (
            products.length !== 0 &&
            products.map((item, index) => (
              <MainPageItemList item={item} key={index} />
            ))
          )}
        </div>

        <Pagination />
      </div>
    </div>
  );
}

export default MainPageItems;
