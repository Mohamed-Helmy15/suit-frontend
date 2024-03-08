import React, { useEffect, useState } from "react";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import { apiConfig } from "../utils/apiConfig";
const NewSuit = () => {
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);
  const [type, setType] = useState(null);
  const [image, setImage] = useState("");
  const [error, setError] = useState(false);
  const [imageError, setImageError] = useState(false);

  const newSuitSchema = yup.object().shape({
    name: yup.string().required("required"),
    description: yup.string().required("required"),
    fabric_name: yup.string().required("required"),
  });

  const initialValues = {
    name: "",
    description: "",
    fabric_name: "",
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (type === null) {
      setError(true);
    } else if (image === "") {
      setImageError(true);
    } else {
      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("fabric_name", values.fabric_name);
      formData.append("type_id", type.id);
      formData.append("image", image, image.name);

      axios
        .post(`${apiConfig.baseUrl}/suits`, formData, {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          swal("The New Suit has been created Successfully!").then(() => {
            navigate("/suits");
          });
        })

        .catch((err) => {
          swal("!OOPS! something Went Wrong!", {
            icon: "error",
          });
        });
    }
  };
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/types", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => setTypes(res.data.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={newSuitSchema}
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
        <div className="form-wrapper-new ">
          <div className="overlay">
            <div className=" wrap-form">
              <form onSubmit={handleSubmit}>
                <p
                  style={{
                    background: "#ccc",
                    marginBottom: "5px",
                    padding: "10px",
                    borderRadius: "5px",
                    fontSize: "20px",
                  }}
                >
                  Create a new Suite
                </p>
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
                      <TextField
                        onBlur={() => {
                          if (type === null) {
                            setError(true);
                          } else {
                            setError(false);
                          }
                        }}
                        error={error && true}
                        helperText={error && "Type is Required"}
                        {...params}
                        label="Type"
                      />
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
                    {imageError && (
                      <p
                        style={{
                          color: "red",
                          textAlign: "start",
                          fontSize: "12px",
                        }}
                      >
                        Image is rquired
                      </p>
                    )}
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
                    Create
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
                          navigate("/suits");
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
          </div>
        </div>
      )}
    </Formik>
  );
};

export default NewSuit;
