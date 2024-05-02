import React from "react"
import { Link } from "react-router-dom"

const Home = () => {
  return <>
    <h1>HOME</h1>
    
    <Link to ="/login"> LOGIN </Link>
    <Link to ="/register"> REGISTER </Link>
    
    
    </>
}

export default Home
