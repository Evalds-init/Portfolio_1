import React, { useRef, useEffect, useContext } from 'react';
import ProductContext from '../../context/products/productContext';
function Search() {
  const productContext = useContext(ProductContext);
  const {
    searchProducts,
    searchResults,
    clearSearchResults,
    categoryFilter,
  } = productContext;
  const text = useRef('');
  useEffect(() => {
    if (searchResults.length === 0) {
      text.current.value = '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (categoryFilter.length !== 0) {
      text.current.value = '';
    }
  }, [categoryFilter]);

  const onChange = (e) => {
    if (text.current.value !== '') {
      searchProducts(e.target.value);
    } else {
      clearSearchResults();
    }
  };
  return (
    <div className="container pt-1">
      <div className="row">
        <div className="col s10 offset-s1 m10   offset-m1 l10  offset-l1">
          <form>
            <div className="row">
              <div className="input-field">
                <i className="material-icons prefix">search</i>
                <input
                  id="icon_prefix"
                  type="text"
                  className="validate"
                  ref={text}
                  onChange={onChange}
                />
                <label htmlFor="icon_prefix">Search for...</label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Search;
