import React, { useState } from 'react';
import { useParams } from 'react-router';

const RemoveCartItem = ({remove, setRemove, movieid}) => {
  const [error, setError] = useState(null);
 
  const handleRemoveFromCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please try logging in, not sure how you got this button');
      return;
    }
    try {
      setError(null);
      const response = await fetch(`/api/movie/remove/${movieid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to remove from cart');
      }
      setRemove(true);
    } catch (error) {
      setError(error.message || 'An error occurred while removing this from the cart.');
    }
  };

  return (
    <>
      {error && <p>Error: {error}</p>}
      {remove && <p>Item removed from cart!</p>}
      <button onClick={handleRemoveFromCart}>
        Remove Item
      </button>
    </>
  );
};

export default RemoveCartItem;