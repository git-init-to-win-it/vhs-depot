import React, { useState } from 'react';
import { useParams } from 'react-router';

const AddToCart = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
 
  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      setError('Please try logging in, not sure how you got this button');
      return;
    }
    try {
      setError(null);
      const response = await fetch(`/api/movie/add/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to add to cart');
      }
      setSuccess(true);
    } catch (error) {
      setError(error.message || 'An error occurred while adding to the cart.');
    }
  };

  return (
    <>
      {error && <p>Error: {error}</p>}
      {success && <p>Item added to cart!</p>}
      <button onClick={handleAddToCart}>
        Add To Cart
      </button>
    </>
  );
};

export default AddToCart;