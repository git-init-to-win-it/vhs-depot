import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Register = ({setToken}) => {
  const [username, setUsernameInput] = useState("");
  const [password, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false)
  const navigate = useNavigate();

  const signUpHandler = async(e) =>{
    e.preventDefault();
    try{
      const result = await fetch("/auth/register", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      console.log(result);
      const json = await result.json();
      console.log(json);
      if(json.token){
        localStorage.setItem("token", json.token);
        setToken(json.token);
        navigate("/");
      }
    } catch(error){
      console.log("ERROR caught when signing up user.");
      setError(true);
    }
  }

  
  return (
    <>
    <h1>Create an account or {<Link to="/login">log in</Link>}</h1>
    <form onSubmit={signUpHandler}> 
      <label>
        Username:
        <input required 
        type="text" 
        value={username}
        onChange={(e) => setUsernameInput(e.target.value)}/>
      </label>

      <label>
        Password:
        <input required 
        type={showPassword ? "text" : "password" }
        value={password}
        onChange={(e) => setPasswordInput(e.target.value)}/>
      </label>
      <label>Show Password</label>
        <input 
          id="check"
          type="checkbox"
          value={showPassword}
          onChange={() => {
            setShowPassword((prev) => !prev)
          }}
        />
        {error && <div>Username exists, please try again or {<Link to="/login">log in</Link>}.</div>}
      <button>Sign Up!</button>
    </form>
    </>
  )
}

export default Register
