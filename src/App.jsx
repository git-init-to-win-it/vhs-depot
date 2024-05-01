import { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import './App.css'

function App() {
  const [token, setToken] = useState("")

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  return (
    <>
      <NavBar token={token} setToken={setToken}/>
    </>
  )
}

export default App
