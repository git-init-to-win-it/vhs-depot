import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  const submitHandler = async(e) => {
    e.preventDefault();
    try{
      const result = await fetch("/auth/login", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          username,
          password
        })
      });
      console.log(result);
      const json = await result.json();
      //console.log(json);

      if(json.token){
        localStorage.setItem('token', json.token);
        setToken(json.token);
        navigate("/");
      }
    }catch(error){
      console.log("ERROR CAUGHT WHEN FETCHING API");
    }
  } 

  return (
    <>
      <h3>LOGIN</h3>
      <form onSubmit={submitHandler}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => { setUsername(e.target.value) }} />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }} />
        </label>
        <input type="submit" value="Log in" />
      </form>
      <label>
        Don't have an account?
        <Link to="/register">Sign up</Link>
      </label>

    </>
  )
}

export default Login
