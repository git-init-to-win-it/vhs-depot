import { useContext, useEffect, useState } from "react"
import { MovieContext } from "../MovieContext"
import { useNavigate } from "react-router-dom"
import "../App.css"

const GetAllMovies = () => {
  const navigate = useNavigate()
  const { movies, setMovies } = useContext(MovieContext)
  const handleClick = (movieId) => {
    navigate(`/movies/${movieId}`)
  }
  if (!movies) {
    return <h2>Loading..</h2>
  }
  return (
    <div className="poetsen-one-regular">
      <h2 className="movieListTitle">Movie List</h2>
      <ul className="movieListFlex">
        {movies.map(movie => (
          <div className="homeMovieCard" key={movie.id} >
            <p className ='movieList'>{movie.title}  </p>
            <button className="moreInfoButton" onClick={() => handleClick(movie.id)}>more info</button>
          </div>

          // <section className="homeMovieCard">
          //       <div>
          //         <ul className="movieList">
          //           <li >{movie.title}  </li>
          //           <button onClick={() => handleClick(movie.id)}>More Info</button>
          //         </ul>
          //       </div>
          // </section>
        ))}
      </ul>
    </div>
  )
}

export default GetAllMovies
