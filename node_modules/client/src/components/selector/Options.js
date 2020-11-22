import React, { useContext, useEffect, useMemo } from 'react';
import Stars from './starRating/Stars';
import ProductContext from '../../context/products/productContext';
function Options() {
  const productContext = useContext(ProductContext);
  const {
    filterByCategory,
    clearFilters,
    ratingFilter,
    filterByRatings,
    searchResults,
  } = productContext;

  useEffect(() => {}, [searchResults]);
  const onChange = (e) => {
    if (e.target.value !== 'showall') {
      filterByCategory(e.target.value);
    } else {
      clearFilters();
    }
  };

  return (
    <div className="col m2 s3 l2 mt-3 hide-on-small-and-down">
      <div className="ml-5">
        <form action="#" className="mt-2">
          <p className="mb-1">
            <label>
              <input
                id="reset"
                value="showall"
                className="with-gap"
                name="group1"
                type="radio"
                onChange={onChange}
              />{' '}
              <span>Show All</span>
            </label>
          </p>
          <p>
            <label>
              <input
                className="with-gap"
                name="group1"
                value="cosmetics"
                type="radio"
                onChange={onChange}
              />
              <span>Cosmetics</span>
            </label>
          </p>
          <p>
            <label>
              <input
                value="haircare"
                className="with-gap"
                name="group1"
                type="radio"
                onChange={onChange}
              />
              <span>Haircare</span>
            </label>
          </p>
          <p>
            <label>
              <input
                value="skincare"
                className="with-gap"
                name="group1"
                type="radio"
                onChange={onChange}
              />
              <span>Skincare</span>
            </label>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Options;
