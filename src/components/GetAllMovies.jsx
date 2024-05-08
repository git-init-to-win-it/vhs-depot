import { useContext, useEffect, useState } from "react"
import { MovieContext } from "../MovieContext"
import { useNavigate } from "react-router-dom"


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
    <div>
      <h2>Movie List</h2>
      <ul className="movieListFlex">
        {movies.map(movie => (
      <section className="homeMovieCard">
            <div key={movie.id}>
              <ul className="movieList">
                <li>{movie.title}  </li>
                <button onClick={() => handleClick(movie.id)}>More Info</button>
              </ul>
            </div>
      </section>
        ))}
      </ul>
    </div>
  )
}

export default GetAllMovies
