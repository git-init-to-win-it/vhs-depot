import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddToCart from "./AddToCart";
import "../styles/moremovieinfo.css"

const MoreMovieInfo = () => {
  const token = localStorage.getItem(`token`);
  const navigate = useNavigate();
  const [movieToDisplay, setMovieToDisplay] = useState({});
  const params = useParams();
  const movieId = parseInt(params.id)
  useEffect(() => {
    const fetchSingleMovie = async () => {
      try {
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
    <div className="poetsen-one-regular">
      {movieToDisplay.cartid ? (
        <>
        <h2 className="unavailableMessage">{movieToDisplay.title} is not available. The {movieToDisplay.genre} is living in another cart
        <div className="imgParent">
        <img className='vhsGif'src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWJoc3kxMjhydG9nbTB4bG9yd3VvenN3Z2txZDJ1YWZ1OHpnNnQ3eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l44QvKoQuUD3xPZKg/giphy.gif"></img>
        </div>
        </h2>
        </>
     
      ) : (
        <div className="moreInfoCard">
          <h1>{movieToDisplay.title}</h1>
          
            <p className="moreInfoP">Genre: {movieToDisplay.genre}</p>
            <p className="moreInfoP">Description: {movieToDisplay.description}</p>
            <div className="imgParent">
        <img className='vhsGif'src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWJoc3kxMjhydG9nbTB4bG9yd3VvenN3Z2txZDJ1YWZ1OHpnNnQ3eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l44QvKoQuUD3xPZKg/giphy.gif"></img>
        </div>
        {token ? (<AddToCart />) : <div class="loginMessageParent"><p className="loginMessageCard">login to add VHS to cart</p></div>}
        <div className="buttonParent">
          <button className='backToVhsButton' onClick={() => navigate("/")}>Back to all VHS tapes</button>
        </div>
        </div>
      )}
    <button onClick={() => navigate("/")}>Back to all VHS tapes</button>
  </div>
  );
}

export default MoreMovieInfo;