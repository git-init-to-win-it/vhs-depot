import React, { useState, useEffect, useContext } from "react"
import { MovieContext } from "../../MovieContext"
import "../../styles/editanddelete.css"

const EditndDelete = ({ token }) => {
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [movieUpdateData, setMovieUpdateData] = useState({
    title: "",
    description: "",
    genre: "",
  })
  const { movies, setMovies } = useContext(MovieContext)

  const handleEdit = movieId => {
    if (editing === movieId) {
      setMovieUpdateData({
        title: "",
        genre: "",
        description: "",
      })
      setEditing(null)
    } else {
      const editedMovie = movies.find(movie => movie.id === movieId)
      setMovieUpdateData({
        title: editedMovie.title,
        description: editedMovie.description,
        genre: editedMovie.genre,
      })
      setEditing(movieId)
    }
  }

  const handleUpdate = async (movieId, updatedMovieData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/movie/${movieId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedMovieData),
        }
      )
      if (!response.ok) {
        throw new Error("Failed to update movie.")
      }
      const updatedMovie = await response.json()
      setMovies(
        movies.map(movie => (movie.id === movieId ? updatedMovie : movie))
      )
    } catch (error) {
      console.error(error)
    } finally {
      setEditing(null)
    }
  }

  const handleDelete = async movieId => {
    console.log("movieId to be deleted", movieId)
    try {
      const response = await fetch(
        `http://localhost:3000/api/movie/${movieId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (!response.ok) {
        throw new Error("Failed to delete movie.")
      }

      setMovies(movies.filter(movie => movie.id !== movieId))
    } catch (error) {
      console.error(error)
    }
  }

  if (!movies) {
    return <h2>Loading..</h2>
  }

  return (
    <div className="movie-list-container">
      <div className="movie-list-wrapper">
        <div>
          <h1>Movie List</h1>
        </div>
        <ul>
          {movies.map(movie => (
            <li key={movie.id} className="movie-card">
              {editing === movie.id ? (
                <div>
                  <input
                    type="text"
                    value={movieUpdateData.title}
                    onChange={e =>
                      setMovieUpdateData(prevState => ({
                        ...prevState,
                        title: e.target.value,
                      }))
                    }
                  />
                  <input
                    type="text"
                    value={movieUpdateData.description}
                    onChange={e =>
                      setMovieUpdateData(prevState => ({
                        ...prevState,
                        description: e.target.value,
                      }))
                    }
                  />
                  <input
                    type="text"
                    value={movieUpdateData.genre}
                    onChange={e =>
                      setMovieUpdateData(prevState => ({
                        ...prevState,
                        genre: e.target.value,
                      }))
                    }
                  />
                  <button onClick={() => handleEdit(movie.id)}>Close</button>
                  <button
                    onClick={() => handleUpdate(movie.id, movieUpdateData)}
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="movie-card">
                  <h2>{movie.title}</h2>
                  <h4>{movie.description}</h4>
                  <p>{movie.genre}</p>
                  <button onClick={() => handleEdit(movie.id)}>Edit</button>
                  <button onClick={() => handleDelete(movie.id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default EditndDelete
