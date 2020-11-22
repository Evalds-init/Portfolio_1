import React, { useState, useContext, useEffect } from 'react';
import Star from './Star';
import ProductContext from '../../../context/products/productContext';
export default function Stars({
  totalStars = 5,
  style = {},
  size = 20,
  ...props
}) {
  const productContext = useContext(ProductContext);
  const { filterByRatings } = productContext;
  const [selectedStars, setSelectedStars] = useState(0);
  const createArray = (length) => [...Array(length)];
  useEffect(() => {
    filterByRatings(selectedStars);
  }, [selectedStars]);
  return (
    <div style={{ ...style }} {...props}>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => setSelectedStars(i + 1)}
          size={size}
        />
      ))}
    </div>
  );
}
