import { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import GetAllMovies from './components/getAllMovies';
const API_URL = "postgres://vhsdepot_user:S6IJK67rtCIGZ5hSNilHGcWcxOkzPms2@dpg-cop777acn0vc73dnnrm0-a.oregon-postgres.render.com/vhsdepot"


function App() {
  const [token, setToken] = useState("")

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  return (
    <>
      <NavBar token={token} setToken={setToken}/>
      <Routes>
        <Route path="/" element={<h1>HOME</h1>} />
        <Route path="/movies/:id" element={<h1>DETAILS PAGE</h1>} />
        <Route path="/login" element={<h1>LOGIN PAGE</h1>} />
        <Route path="/register" element={<h1>REGISTER PAGE</h1>} />
        <Route path="/cart" element={<h1>CART</h1>} />
      </Routes>
    </>
  )
}

export default App
