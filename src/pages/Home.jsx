import React from "react"
import { Link } from "react-router-dom"
import "../styles/home.css"
import GetAllMovies from "../components/GetAllMovies"

const Home = ({ isAdmin }) => {
  return (
    <>
      {isAdmin ? (
        <> <section className="homePageCard">
          <button className="rampart-one-regular">
            <Link to="/admin">Admin View</Link>
          </button>
          <div><GetAllMovies /></div>
        </section>
        </>
      ) : (
        <section className="homePageCard">
          <div><GetAllMovies /></div>
        </section>)
      }
    </>
  )
}

export default Home
