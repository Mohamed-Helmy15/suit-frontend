import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading/Loading";
import { Button } from "@mui/material";
import PopUp from "./PopUp";
import SuitCard from "./SuitCard";
import { apiConfig } from "../utils/apiConfig";
const Home = () => {
  const [suits, setSuits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [targetSuit, setTargetSuit] = useState("");

  const handleOpen = () => setOpen(true);

  useEffect(() => {
    axios
      .get(`${apiConfig.baseUrl}/suits`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setSuits(res.data.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [render]);
  return (
    <div>
      <Navbar page="suits" />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <Button
          size="small"
          variant="contained"
          color="info"
          onClick={() => navigate("/suits/new")}
        >
          Create a new suit
        </Button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="pageWrapper">
          {suits.map((suit) => {
            return (
              <SuitCard
                key={suit.id}
                suit={suit}
                setTargetSuit={setTargetSuit}
                setLoading={setLoading}
                setRender={setRender}
                render={render}
                handleOpen={handleOpen}
              />
            );
          })}
        </div>
      )}
      <PopUp
        targetSuit={targetSuit}
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        render={render}
        setRender={setRender}
        setLoading={setLoading}
      />
    </div>
  );
};

export default Home;
