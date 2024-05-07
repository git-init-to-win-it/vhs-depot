import { useState, useEffect } from "react"
import { Route, Routes, json } from "react-router-dom"
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

  //useEffect to check if a user is an Admin
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch("/auth/admin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localToken}`,
          },
        })
        const data = await response.json()
        setIsAdmin(data.isAdmin)
      } catch (error) {
        console.log("ERROR caught when fetching get request", error)
      }
    }
    const localToken = localStorage.getItem("token")
    if (localToken) {
      setToken(localToken)
      fetchRole()
    }
  }, [])

  return (
    <>
      <NavBar token={token} setToken={setToken} />
      <Routes>
        <Route path="/" element={<Home isAdmin={isAdmin}/>} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route
          path="/login"
          element={<Login setToken={setToken} setIsAdmin={setIsAdmin} />}
        />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/admin"
          element={<AdminPage token={token} isAdmin={isAdmin} />}
        />

      </Routes>
      <Footer token={token} setToken={setToken} />
    </>
  )
}

export default App
