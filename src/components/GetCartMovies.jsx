import React, { useEffect, useState } from "react";



const GetCartMovies = ({ token }) => {
  const [cartMovies, setCartMovies] = useState([]);
  useEffect(() => {
    const fetchCartMovies = async () => {
      try {
        if (!token) {
          console.log("LOGIN TO GET YOUR CART.");
          return;
        }
        const response = await fetch(`/api/cart`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const result = await response.json();
        setCartMovies(result)
      } catch (error) {
        console.log(`ERROR GETTING YOUR CART!`, error);
      }
    }
    fetchCartMovies();
  }, []);
  
  return (
    <>
      {cartMovies.map(movie =>  (
     <div key={movie.id}>
     <h2>{movie.title}</h2>
     <h3 >{movie.genre}</h3>
     <p>{movie.description}</p>
     </div> 
    ))}
    </>
  )
}



export default GetCartMovies;