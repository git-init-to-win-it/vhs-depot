import { createContext, useState, useEffect } from "react"

const MovieContext = createContext()

const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch("/api/movie")
        const moviesObject = await response.json()
        setMovies(moviesObject)
      } catch (error) {
        console.error("Error fetching movies:", error)
      }
    }
    getMovies()
  }, [setMovies])

  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      {children}
    </MovieContext.Provider>
  )
}

export { MovieContext, MovieProvider }
