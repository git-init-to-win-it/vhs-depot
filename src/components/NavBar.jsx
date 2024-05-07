import { Link } from "react-router-dom"
import CartButton from "./CartButton"
import "../styles/navbar.css"

const NavBar = ({ token, setToken }) => {
  //created ternary for logged in and non-logged in users. They can be identified by token.
  //users are redirected to homepage once logged out.
  return (
    <>
      <ul className="navbar-ul">
        <li>
          <button>
          <Link to="/">Home</Link>
        </button>
        </li>
        {token ? (
          <>
            <li>
              <Link to="/cart">
                <CartButton />
              </Link>
            </li>
            <li>
              <button>
              <Link
                onClick={() => {
                  setToken("")
                  localStorage.setItem("token", "")
                }}
                to="/"
              >
                Logout
              </Link>
              </button>
            </li>
          </>
        ) : (
          <li>
            <button>
            <Link to="/login">Login</Link>
            </button>
          </li>
        )}
      </ul>
    </>
  )
}

export default NavBar
