import React, { useState, useEffect } from "react"
import { getMovies } from "../../utils"

const EditndDelete = () => {
  const [movies, setMovies] = useState([])
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   getMovies().then(moviesData => setMovies(moviesData))
  //   setLoading(false)
  // }, [])

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

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <button onClick={() => handleEdit(movie._id)}>Edit</button>
            <button onClick={() => handleDelete(movie._id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editing && (
        <div>
          <h2>Edit Movie</h2>
          <form>
            // Form fields to edit movie title and description
            <button
              onClick={() =>
                handleUpdate(editing, {
                  title: "New Title", // Update title
                  description: "New Description", // Update description
                })
              }
            >
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default EditndDelete
