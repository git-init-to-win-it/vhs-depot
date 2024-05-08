import React from 'react';
import { Link } from 'react-router-dom';

  const CartButton = () => {
    return (
    <button className='cartButton'
      onClick={() => {<Link to="/cart"></Link>}}
    >
      Cart
    </button>
  );
};

export default CartButton;
