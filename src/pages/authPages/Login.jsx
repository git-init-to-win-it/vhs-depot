import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/authpages.css"

const Login = ({ setToken, setIsAdmin }) => {
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
      //console.log(result);
      const json = await result.json();

      //step 1
      if(json.token){
        localStorage.setItem('token', json.token);
        setToken(json.token);
        if (json.isAdmin === true) {
          setIsAdmin(true);
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    }catch(error){
      console.log("ERROR CAUGHT WHEN FETCHING API");
    }
  } 

  return (
    <>
    <section className="login">
      <h3>LOGIN</h3>
      <form onSubmit={submitHandler}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => { setUsername(e.target.value) }} />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            className="inputPassword" />
        </label>
        <br />
        <button className="loginButton">
        <input type="submit" value="Log in" />
        </button>
      </form>
      <label>
        Don't have an account?
        <button className="registerButton">
        <Link to="/register">Sign up</Link>
        </button>
      </label>
      </section>
    </>
  )
}

export default Login
