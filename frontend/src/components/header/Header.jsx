import PropTypes from "prop-types";
import "./Header.css";
import { Link } from "react-router-dom";
const Header = ({isAuth}) => {
  return (
    <header>
      <div className="logo">
        LearnLynx
      </div>
      <div className="searchBar">
        <input type="text" placeholder="Search courses"/>
        <span><i className="fa-solid fa-magnifying-glass"></i></span>
      </div>
      <div className="link">
         <Link to={"/"}>Home</Link>
         <Link to={"/about"}>About</Link>
         <Link to={"/courses"}>Courses</Link>
         {
           isAuth? (
             <Link to={"/account"}>Account</Link>
           ) : (
             <Link to={"/login"} className="btn-login">Login</Link>
           )
         }
      </div>
    </header>
  )
}
Header.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

export default Header
