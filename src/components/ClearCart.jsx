import React, { useState } from 'react';

const ClearCart = ({success, setSuccess}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClearCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please try logging in, not sure how you got here');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/cart`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to clear cart.');
      }
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setError(error.message || 'An error occurred while clearing the cart.');
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {success && <p>Checkout Successful!</p>}
      <button onClick={handleClearCart} disabled={loading}>
        Checkout Cart!
      </button>
    </>
  );
};

export default ClearCart;
