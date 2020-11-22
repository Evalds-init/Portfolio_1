import React from 'react';
import { FaStar } from 'react-icons/fa';
const Star = ({ selected = false, size, onSelect = (f) => f }) => (
  <FaStar
    color={selected ? 'brown' : 'grey'}
    onClick={onSelect}
    fontSize={size ? size : 15}
  />
);

export default Star;
