import React, { useState, useEffect, useContext } from "react"
import { MovieContext } from "../../MovieContext"

const EditndDelete = () => {
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [movieUpdateData, setMovieUpdateData] = useState({
    title: "",
    description: "",
    genre: "",
  })
  const { movies, setMovies } = useContext(MovieContext)

  const handleEdit = movieId => {
    // If the clicked movie is already being edited, revert to null
    if (editing === movieId) {
      setMovieUpdateData({
        title: "",
        description: "",
        genre: "",
      })
      setEditing(null)
    } else {
      // Find the movie being edited
      const editedMovie = movies.find(movie => movie.id === movieId)
      // Set the initial state of movieUpdateData with the values from the edited movie
      setMovieUpdateData({
        title: editedMovie.title,
        description: editedMovie.description,
        genre: editedMovie.genre,
      })
      // Set editing state
      setEditing(movieId)
    }
  }

  const handleUpdate = async (movieId, updatedMovieData) => {
    console.log("movie Id:", movieId, "updatedMovieData", updatedMovieData)

    try {
      const response = await fetch(`api/movie/${movieId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMovieData),
      })
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
      setEditing(null) // Reset editing state after update
    }
  }

  const handleDelete = async movieId => {
    console.log("movieId to be deleted", movieId)
    try {
      const response = await fetch(`/api/movie/${movieId}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Failed to delete movie.")
      }

      // Filter out the deleted movie from the movies array
      setMovies(movies.filter(movie => movie.id !== movieId))
    } catch (error) {
      console.error(error)
    }
  }

  if (!movies) {
    return <h2>Loading..</h2>
  }

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
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
                <button onClick={() => handleUpdate(movie.id, movieUpdateData)}>
                  Save Changes
                </button>
              </div>
            ) : (
              <div>
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
  )
}

export default EditndDelete
