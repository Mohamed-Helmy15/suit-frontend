import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiConfig } from "../utils/apiConfig";

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
            axios
              .delete(`${apiConfig.baseUrl}/logout`, {
                headers: {
                  Authorization: `Bearer ${window.localStorage.getItem(
                    "token"
                  )}`,
                },
              })
              .then((res) => res)
              .catch((err) => err);
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
