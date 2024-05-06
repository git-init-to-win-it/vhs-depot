import React from 'react';
import { Link } from 'react-router-dom';

  const CartButton = () => {
    return (
    <button
      className="cartButton"
      onClick={() => {<Link to="/cart"></Link>}}
      style={{ display: 'block' }}
    >
      Cart
    </button>
  );
};

export default CartButton;
