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
      <h2>Movie List</h2>
      <ul>
        {movies.map(movie => (
            <div key={movie.id}>
              <ul >
                <li>{movie.title}  </li>
                <button onClick={() => handleClick(movie.id)}>More Info</button>
              </ul>
            </div>
        ))}
      </ul>
    </div>
  )
}

export default GetAllMovies
