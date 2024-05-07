import { Link } from "react-router-dom"
import CartButton from "./CartButton"
import "../styles/navbar.css"

const NavBar = ({ token, setToken, isAdmin, setIsAdmin }) => {
  //created ternary for logged in and non-logged in users. They can be identified by token.
  //users are redirected to homepage once logged out.
  return (
    <>
      <ul className="navbar-ul">
        <li>
          <Link to="/">Home</Link>
        </li>
        {token ? (
          <>
            <li>
              <Link to="/cart">
                <CartButton />
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  setToken("")
                  localStorage.setItem("token", "")
                  localStorage.removeItem("isAdmin", "")
                  setIsAdmin(false)
                }}
                to="/"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {isAdmin && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}
      </ul>
    </>
  )
}

export default NavBar
