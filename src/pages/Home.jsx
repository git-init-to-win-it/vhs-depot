import React from "react"
import { Link } from "react-router-dom"
import "../styles/home.css"
import GetAllMovies from "../components/GetAllMovies"

const Home = ({ isAdmin }) => {
  return (
    <>
    <div className="imgDiv">
    <img className="logoImg" src="src/assets/mainlogo.png" alt="main logo"></img>

    </div>
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
