import React, { useState } from "react"

const MovieCreator = () => {
  const [title, setTitle] = useState("")
  const [genre, setGenres] = useState("")
  const [description, setDescription] = useState("")
  return (
    <div>
      <h1>Create Movie</h1>
      <form>
        <input placeholder="Title" />
        <input placeholder="Genre" />
        <input placeholder="Description" />
        <button>Create</button>
      </form>
    </div>
  )
}

export default MovieCreator
