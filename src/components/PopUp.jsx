import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import * as yup from "yup";
import { apiConfig } from "../utils/apiConfig";
const PopUp = ({
  targetSuit,
  setLoading,
  render,
  setRender,
  open,
  setOpen,
}) => {
  const [types, setTypes] = useState([]);
  const [type, setType] = useState(null);
  const [image, setImage] = useState("");

  const handleClose = () => setOpen(false);
  const editSchema = yup.object().shape({
    name: yup.string(),
    description: yup.string(),
    fabric_name: yup.string(),
  });

  const initialValues = {
    name: "",
    description: "",
    fabric_name: "",
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    const formData = new FormData();
    if (type !== null) {
      formData.append("type_id", type.id);
    }
    if (image !== "") {
      formData.append("image", image, image.name);
    }
    if (values.name) {
      formData.append("name", values.name);
    }
    if (values.description) {
      formData.append("description", values.description);
    }
    if (values.fabric_name) {
      formData.append("fabric_name", values.fabric_name);
    }

    axios
      .post(`${apiConfig.baseUrl}/suit/${targetSuit}`, formData, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        swal("The Suit has been edited Successfully!").then(() => {
          handleClose();
          setLoading(true);
          setRender(!render);
        });
      })

      .catch((err) => {
        swal("!OOPS! something Went Wrong!", {
          icon: "error",
        });
      });
  };
  useEffect(() => {
    axios
      .get(`${apiConfig.baseUrl}/types`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => setTypes(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <div>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={editSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <div className=" wrap-form">
                <form
                  style={{
                    padding: "10px",
                    background: "white",
                    zIndex: "1000",
                    width: "70%",
                    borderRadius: "5px",
                  }}
                  onSubmit={handleSubmit}
                >
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  >
                    <TextField
                      label="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      name="name"
                      error={Boolean(touched.name) && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      label="description"
                      type="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      name="description"
                      error={
                        Boolean(touched.description) &&
                        Boolean(errors.description)
                      }
                      helperText={touched.description && errors.description}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      label="Fabric Name"
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.fabric_name}
                      name="fabric_name"
                      error={
                        Boolean(touched.fabric_name) &&
                        Boolean(errors.fabric_name)
                      }
                      helperText={touched.fabric_name && errors.fabric_name}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <Autocomplete
                      options={types.map((type) => ({
                        id: type.id,
                        label: type.type,
                      }))}
                      value={type}
                      onChange={(e, value) => {
                        setType(value);
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.id === value.id
                      }
                      sx={{ gridColumn: "span 4" }}
                      renderInput={(params) => (
                        <TextField {...params} label="Type" />
                      )}
                    />
                    <div style={{ gridColumn: "span 4" }}>
                      <TextField
                        type="file"
                        name="img"
                        id="img"
                        variant="standard"
                        label="image"
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                        }}
                        style={{ width: "100%" }}
                        sx={{ gridColumn: "span 4" }}
                      />
                    </div>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      fullWidth
                      type="submit"
                      sx={{
                        m: "1rem 0",
                        p: "0.5rem",
                      }}
                    >
                      Edit
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        m: "1rem 0",
                        p: "0.5rem",
                      }}
                      onClick={() => {
                        swal({
                          title: "Are you sure?",
                          text: "Once Canceled, you will not be able to recover your data!",
                          icon: "warning",
                          buttons: true,
                          dangerMode: true,
                        }).then((willCancel) => {
                          if (willCancel) {
                            handleClose();
                          } else {
                            swal("Your Data is safe!");
                          }
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </Box>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  ></div>
                </form>
              </div>
            )}
          </Formik>
        </div>
      </Fade>
    </Modal>
  );
};

export default PopUp;
