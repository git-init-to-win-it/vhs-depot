import React, { useState, useEffect, useContext } from "react"
import { MovieContext } from "../../MovieContext"

const EditndDelete = () => {
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const { movies, setMovies } = useContext(MovieContext)

  const handleEdit = movieId => {
    setEditing(movieId)
  }

  const handleUpdate = (movieId, updatedMovieData) => {
    fetch(`${API_URL}/${movieId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovieData),
    })
      .then(response => response.json())
      .then(updatedMovie => {
        setMovies(
          movies.map(movie => (movie._id === movieId ? updatedMovie : movie))
        )
      })
      .catch(error => console.error(error))
  }

  const handleDelete = movieId => {
    fetch(`${API_URL}/${movieId}`, {
      method: "DELETE",
    })
      .then(response => response.json())
      .then(() => {
        setMovies(movies.filter(movie => movie._id !== movieId))
      })
      .catch(error => console.error(error))
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
            <h2>{movie.title}</h2>
            <h4>{movie.description}</h4>
            <p>{movie.genre}</p>
            <button onClick={() => handleEdit(movie._id)}>Edit</button>
            <button onClick={() => handleDelete(movie._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EditndDelete
