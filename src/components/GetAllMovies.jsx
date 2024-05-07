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
      <ul>
        {movies.map(movie => (
          <>
            <li key={movie.id}>{movie.title} 
              <button onClick={() => handleClick(movie.id)}>More Info</button>
            </li>
          </>
        ))}
      </ul>
    </div>
  )
}

export default GetAllMovies
