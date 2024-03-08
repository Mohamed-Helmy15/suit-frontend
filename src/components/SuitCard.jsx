import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import swal from "sweetalert";
import { apiConfig } from "../utils/apiConfig";

const SuitCard = ({
  suit,
  setTargetSuit,
  setLoading,
  setRender,
  render,
  handleOpen,
}) => {
  return (
    <Card key={suit.id} sx={{ width: 300 }}>
      <CardMedia
        style={{
          backgroundSize: "contain",
        }}
        sx={{ height: 365 }}
        image={`http://127.0.0.1:8000/images/${suit.image}`}
        title={suit.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {suit.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {suit.type.type} type
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {suit.fabric_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {suit.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            setTargetSuit(suit.id);
            handleOpen();
          }}
        >
          Edit
        </Button>
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={() => {
            swal({
              title: "Are you sure?",
              text: "Once Deleted, you will not be able to recover your data!",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then((willCancel) => {
              if (willCancel) {
                axios
                  .delete(`${apiConfig.baseUrl}/suits/${suit.id}`, {
                    headers: {
                      Authorization: `Bearer ${window.localStorage.getItem(
                        "token"
                      )}`,
                    },
                  })
                  .then((res) => {
                    swal("The Suit has been deleted Successfully!").then(() => {
                      setLoading(true);
                      setRender(!render);
                    });
                  })

                  .catch((err) => {
                    swal("!OOPS! something Went Wrong!", {
                      icon: "error",
                    });
                  });
              } else {
                swal("Your Data is safe!");
              }
            });
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default SuitCard;
