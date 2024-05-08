import React, { useEffect, useState } from "react";
import RemoveCartItem from "./RemoveCartItem";

const GetCartMovies = ({ token, success, setSuccess, remove, setRemove }) => {
  const [cartMovies, setCartMovies] = useState([]);
  token = localStorage.getItem(`token`);
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
  }, [success, remove]);
  
  return (
    <>
      {cartMovies.map(movie =>  (
     <div key={movie.id} className="cartMovieCard">
     <h2>{movie.title}</h2>
     <h3 >{movie.genre}</h3>
     <p>{movie.description}</p>
     <RemoveCartItem remove={remove} setRemove={setRemove} movieid={movie.id}/>
     </div> 
    ))}
    </>
  )
}

export default GetCartMovies;