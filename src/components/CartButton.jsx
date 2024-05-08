import React from 'react';
import { Link } from 'react-router-dom';

  const CartButton = () => {
    return (
    <button
    onClick={() => {<Link to="/cart"></Link>}}
    style={{ color: "black" }}
  >
      Cart
    </button>
  );
};

export default CartButton;
