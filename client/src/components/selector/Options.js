import React, { useContext, useEffect, useState } from 'react';
import ProductContext from '../../context/products/productContext';
function Options() {
  const productContext = useContext(ProductContext);
  const { filterByCategory, clearFilters, searchResults } = productContext;
  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (searchResults.length !== 0) {
      setCheck(true);
    }
  }, [searchResults]);

  const onChange = (e) => {
    if (e.target.value !== 'showall') {
      filterByCategory(e.target.value);
      setCheck(false);
    } else {
      clearFilters();
      setCheck(true);
    }
  };

  return (
    <div className="col m2 offset-m1 l2 offset-l1 hide-on-small-only">
      <div className="options-menu">
        <form action="#" className="mt-2">
          <p className="mb-1">
            <label>
              <input
                id="reset"
                value="showall"
                className="with-gap"
                name="group1"
                type="radio"
                checked={check}
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
