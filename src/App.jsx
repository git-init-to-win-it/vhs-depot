import './App.css'
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
    <Routes>
        <Route path="/" element={<h1>HOME</h1>}/>
        <Route path="/:id" element={<h1>DETAILS PAGE</h1>}/>
        <Route path="/auth/login" element={<h1>LOGIN PAGE</h1>}/>
        <Route path="/auth/register" element={<h1>REGISTER PAGE</h1>}/>
        <Route path="/me" element={<h1>ACCOUNT PAGE/CART</h1>}/>
    </Routes>
    </>
  )
}

export default App
