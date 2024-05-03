import { Link } from 'react-router-dom'
import CartButton from './CartButton';

const NavBar = ({token, setToken}) => {
  //created ternary for logged in and non-logged in users. They can be identified by token.
  //users are redirected to homepage once logged out.
  return (
    <>
      <Link to="/">Home</Link>
      {token ? (
        <> 
        <Link to="/cart"><CartButton /></Link>
        <Link onClick={(e) => {
          setToken("");
          localStorage.setItem("token", "");
        }}
        to="/"
        >
          Logout
        </Link>
      </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </>
  );
};

export default NavBar;