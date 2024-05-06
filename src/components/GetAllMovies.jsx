import { useContext, useEffect, useState } from "react"
import { MovieContext } from "../MovieContext"

const GetAllMovies = () => {
  const { movies, setMovies } = useContext(MovieContext)

  if (!movies) {
    return <h2>Loading..</h2>
  }

  return (
    <div>
      <h2>Movie List</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default GetAllMovies
