import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    function setAuth() {
      if (localStorage.getItem("token")) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    }
    window.addEventListener("storage", setAuth);

    return () => {
      window.removeEventListener("storage", setAuth);
    };
  }, []);

  const LogoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  return (
    <div className="main">
      <div className="name">Polling System</div>
      <div className="navLinks">
        {isAuth ? (
          <>
            <Link
              className={`link ${
                location.pathname === "/" ? "activeLink" : "inactiveLink"
              }`}
              to="/"
            >
              Home
            </Link>
            <Link
              className={`link ${
                location.pathname === "/profile" ? "activeLink" : "inactiveLink"
              }`}
              to="/profile"
            >
              View Profile
            </Link>
            <button className="logout" onClick={LogoutHandler}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              className={`link ${
                location.pathname === "/login" ? "activeLink" : "inactiveLink"
              }`}
              to="/login"
            >
              Login
            </Link>
            <Link
              className={`link ${
                location.pathname === "/signup" ? "activeLink" : "inactiveLink"
              }`}
              to="/signup"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
