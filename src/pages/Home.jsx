import React from "react"
import { Link } from "react-router-dom"

import GetAllMovies from "../components/GetAllMovies"

const Home = ({ isAdmin }) => {
  return (
    <>
      {isAdmin ? (
        <>
        <Link to="/admin">Admin View</Link>
        <div><GetAllMovies /></div>
        </>
        ) : (
        <div><GetAllMovies /></div>)
      }
    </>
  )
}

export default Home
