import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const MoreMovieInfo = () => {
  const navigate = useNavigate();
  const [movieToDisplay, setMovieToDisplay] = useState({});
  const params = useParams();
  const movieId = parseInt(params.id)
  useEffect(() => {
    const fetchSingleMovie = async () => {
      try{
        const response = await fetch(`/api/movie/${movieId}`)
        const result = await response.json();
        setMovieToDisplay(result)
      } catch (error) {
        console.error("COULDN'T GET YOUR MOVIE:", error);
      }
    }
    fetchSingleMovie()
  }, []);
  return (
    <>
      {movieToDisplay.cartid ? (
          <h2>{movieToDisplay.title} is not available. The {movieToDisplay.genre} is living in another cart</h2>
        ) : (
        <>
        <h1>{movieToDisplay.title}</h1>
        <ul>
          <li>Genre: {movieToDisplay.genre}</li>
          <li>Description: {movieToDisplay.description}</li>
        </ul>
    </>
    )}
    <button onClick={() => navigate("/")}>Back to all VHS tapes</button>
  </>
  
  );
}

export default MoreMovieInfo;