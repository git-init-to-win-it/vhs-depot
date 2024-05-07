import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import MovieDetails from "./pages/MovieDetails"
import Login from "./pages/authPages/Login"
import Register from "./pages/authPages/Register"
import Cart from "./pages/Cart"
import AdminPage from "./pages/adminPages/AdminPage"
import "./App.css"

function App() {
  const [token, setToken] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedIsAdmin = localStorage.getItem("isAdmin")
    setToken(storedToken)
    setIsAdmin(storedIsAdmin === "true")
  }, [])

  return (
    <>
      <NavBar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route
          path="/login"
          element={<Login setToken={setToken} setIsAdmin={setIsAdmin} />}
        />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Footer token={token} setToken={setToken} />
    </>
  )
}

export default App
