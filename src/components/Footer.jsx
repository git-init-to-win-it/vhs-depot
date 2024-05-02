import { Link } from 'react-router-dom'
import BackToTopButton from './BackToTopButton';

const Footer = ({token, setToken}) => {
  return (
    <>
      <Link to="/">Home</Link>
      {token ? (
        <> 
        <Link to="/cart">Cart</Link>
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
      <BackToTopButton />
    </>
  );
};

export default Footer;