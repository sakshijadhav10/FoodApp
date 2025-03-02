import React, { useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Box,
  Avatar,
  Typography,
  Container,
  CssBaseline,
  Grid,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i, "Email is invalid")
    .required(),
  password: Yup.string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

// src/components/Login.tsx

// import { loginSchema } from "../validationSchemas/LoginSchema";

const Login = ({
  onSubmit,
  setCurrentDrawer,
}: {
  onSubmit: (values) => void;
  setCurrentDrawer: React.Dispatch<
    React.SetStateAction<"register" | "login" | null>
  >;
}) => {
  const [open, setOpen] = useState(false);
  const checkOpen = () => {
    if (open) {
      setOpen(!open);
    }
  };
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,

      validationSchema: loginSchema,
      onSubmit: (values, actions) => {
        // onSubmit(values);
        console.log(values);
        const getuser = localStorage.getItem("userdata");
        console.log(getuser);

        if (getuser && getuser.length) {
          const userdata = JSON.parse(getuser);
          const userlogin = userdata.filter((el, k) => {
            return el.email === values.email && el.password === values.password;
          });

          if (userlogin.length === 0) {
            alert("invalid details");
          } else {
            console.log("user login succesfulyy");
            navigate("/Cartdesc");
            localStorage.setItem("user_login", JSON.stringify(userlogin));
            // checkOpen();
            // setCurrentDrawer(null);
            setCurrentDrawer(null);
            // history("/details")
          }
        }
        actions.resetForm();
      },
    });

  return (
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
          <Typography variant="h5">Login</Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.email ? errors.email : "Email is required"}
            />
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
              helperText={
                touched.password ? errors.password : "Password is required"
              }
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              type="submit"
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </form>
  );
};

export default Login;
