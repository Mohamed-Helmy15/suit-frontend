import "./../App.css";
import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading/Loading";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [state, setState] = useState("success");
  const navigate = useNavigate();
  useEffect(() => {}, [loading, alert]);

  const registerSchema = yup.object().shape({
    name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    password_confirmation: yup.string().required("required"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    setLoading(true);
    axios
      .post("http://127.0.0.1:8000/api/signup", values)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));
        navigate("/suits");
        window.location.reload();
      })

      .catch((err) => {
        setState("error");
        setMessage(err.response.data.message);
        setLoading(false);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 5000);
      });
  };
  return !loading ? (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={registerSchema}
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
        <div className="form-wrapper ">
          {alert && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert variant="filled" severity={state}>
                {message}
              </Alert>
            </Stack>
          )}

          <div className="overlay">
            <p>Hello There!, Welcome To Our Suit Website</p>
            <div className=" wrap-form">
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                >
                  <TextField
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={Boolean(touched.name) && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Confirm Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password_confirmation}
                    name="password_confirmation"
                    error={
                      Boolean(touched.password_confirmation) &&
                      Boolean(errors.password_confirmation)
                    }
                    helperText={
                      touched.password_confirmation &&
                      errors.password_confirmation
                    }
                    sx={{ gridColumn: "span 4" }}
                  />
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{
                      m: "2rem 0",
                      p: "1rem",
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Link to="/">Return to login</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  ) : (
    <Loading />
  );
};

export default Register;
