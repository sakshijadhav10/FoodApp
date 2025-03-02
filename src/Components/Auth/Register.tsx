import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
export const RegisterSchema = Yup.object({
  username: Yup.string().min(2).required("Please enter your name"),
  email: Yup.string()
    .email()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Email is invalid")
    .required(),
  password: Yup.string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must contain 8 characters, one uppercase, one lowercase, one number, and one special character"
    ),
  confirm_password: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

const Register = ({
  onSubmit,
  setCurrentDrawer,
}: {
  onSubmit: (values) => void;
  setCurrentDrawer: React.Dispatch<
    React.SetStateAction<"register" | "login" | null>
  >;
}) => {
  const navigate = useNavigate();

  //  const [currentDrawer, setCurrentDrawer] = useState<
  //      "register" | "login" | null
  //    >(null);

  // const validationSchema =
  //   currentDrawer === "register" ? RegisterSchema : loginSchema;
  const [data] = useState([]);
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: RegisterSchema,
      onSubmit: (values, actions) => {
        // onSubmit(values);
        console.log(values);
        localStorage.setItem("userdata", JSON.stringify([...data, values]));
        setCurrentDrawer(null);
        navigate("/Cartdesc");
        actions.resetForm();
      },
    });
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Container maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              mt: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h5">Register</Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.username && touched.username && <p>{errors.username}</p>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && <p>{errors.email}</p>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && <p>{errors.password}</p>}
              <TextField
                margin="normal"
                required
                fullWidth
                id="confirm_password"
                name="confirm_password"
                label="Confirm Password"
                type="password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirm_password && touched.confirm_password && (
                <p>{errors.confirm_password}</p>
              )}
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                type="submit"
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Container>
      </form>
    </>
  );
};

export default Register;
