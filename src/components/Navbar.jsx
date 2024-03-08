import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ page }) => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="left">
        <Link className={page === "suits" ? "active" : ""} to="/suits">
          Suits
        </Link>
        <Link className={page === "types" ? "active" : ""} to="/types">
          Types
        </Link>
      </div>

      <div className="right">
        <p
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
          }}
        >
          User Name: {JSON.parse(localStorage.getItem("currentUser")).name}
        </p>
        <button
          style={{
            cursor: "pointer",
            width: "96px",
            margin: "6px",
          }}
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
