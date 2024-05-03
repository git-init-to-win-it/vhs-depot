import React, { useState } from "react"

const CreateMovie = () => {
  const [title, setTitle] = useState("")
  const [genre, setGenre] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = event => {
    event.preventDefault()
    const movieData = { title, genre, description }
    fetch("/api/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movieData),
    })
      .then(response => response.json())
      .then(data => console.log("Movie created:", data))
      .catch(error => console.error("Error creating movie:", error))
  }

  return (
    <div>
      <h1>Create Movie</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        <input
          placeholder="Genre"
          value={genre}
          onChange={event => setGenre(event.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />
        <button>Create</button>
      </form>
    </div>
  )
}

export default CreateMovie
