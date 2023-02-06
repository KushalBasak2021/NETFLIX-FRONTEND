import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthAction";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
    });

    return () => {
      window.removeEventListener("scroll", () => {
        setIsScrolled(false);
      });
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    window.location.replace("/");
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <Link to="/" className="link">
            <span>Homepage</span>
          </Link>
          <Link to="/series" className="link">
            <span>Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span>Movies</span>
          </Link>
        </div>
        <div className="right">
          <SearchIcon className="icons" />
          <div className="profile">
            <ArrowDropDownIcon className="icons" />
            <div className="options">
              <span onClick={() => handleLogout()}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
