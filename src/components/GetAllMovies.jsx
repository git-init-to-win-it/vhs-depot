import { useEffect, useState } from "react"

const GetAllMovies = () => {
  const API_URL = "https://vhs-depot.onrender.com/api/movie"

  const [movies, setMovies] = useState([])

  const getMovies = async () => {
    try {
      const response = await fetch(API_URL)
      const moviesObject = await response.json()
      setMovies(moviesObject)
    } catch (error) {
      console.error("Error fetching movies:", error)
    }
  }

  useEffect(() => {
    getMovies()
  }, [])
  return (
    <div>
      <h2>All Movies</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default GetAllMovies
