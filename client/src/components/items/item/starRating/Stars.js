import React, {  useContext } from 'react';
import Star from './Star';
import ProductContext from '../../../../context/products/productContext';
export default function Stars({
  totalStars = 5,

  style = {},
  size = 20,
  ...props
}) {
  const productContext = useContext(ProductContext);
  const { product } = productContext;
  const createArray = (length) => [...Array(length)];

  return (
    <div style={{ ...style }} {...props}>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={product?.averageRating ? product.averageRating > i : 0 > i}
          onSelect={(f) => f}
          size={size}
        />
      ))}
    </div>
  );
}
