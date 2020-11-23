import React, { useEffect, useContext, Fragment } from 'react';
import MainPageItemList from './MainPageItemList';
import Options from '../selector/Options';
import Pagination from '../utils/Pagination';
import AuthContext from '../../context/auth/authContext';
import ProductContext from '../../context/products/productContext';
import Search from '../selector/Search';
import Preloader from '../preloader/Preloader';
function MainPageItems({}) {
  const authContext = useContext(AuthContext);
  const productContext = useContext(ProductContext);
  const { persistUser, isAuthenticated } = authContext;
  const {
    products,
    categoryFilter,
    getProducts,
    searchResults,
    addImages,
    createProduct,
    loading,
  } = productContext;
  useEffect(() => {
    if (!isAuthenticated) {
      persistUser();
    }
    getProducts();
  }, []);
  useEffect(() => {}, [addImages, createProduct]);

  return (
    
      <div className="z-depth-1 main-page-items">
        <Search />
        <div className="row">
          <Options />
          <div className="col s12  m9 l10">
            {loading ? (
              <Preloader
                style={{ marginTop: '100px', marginBottom: '15rem' }}
              />
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
