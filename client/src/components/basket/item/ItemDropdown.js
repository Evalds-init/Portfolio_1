import React, { useEffect, useState } from 'react';
import M from 'materialize-css';
function ItemDropdown() {
  useEffect(() => {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  }, []);
  const [quantity, setQuantity] = useState(1);
  const onSelect = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <div
      className="input-field"
      style={{
        width: '35px',
        height: '30px',
        margin: '0px 10px',
        border: 'solid 1px white',
      }}
    >
      <select>
        <option value="1" onSelect={onSelect} defaultValue='1'>
          {' '}
          1 {'  '}
        </option>
        <option value="2" onSelect={onSelect}>
          {' '}
          2 {'  '}
        </option>
        <option value="3" onSelect={onSelect}>
          {' '}
          3 {'  '}
        </option>
        <option value="4" onSelect={onSelect}>
          {' '}
          4 {'  '}
        </option>
      </select>
      <label>Quantity</label>
    </div>
  );
}

export default ItemDropdown;
