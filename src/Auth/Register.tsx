import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import { authStyle } from "./styles/auth.styles";
import { RegisterSchema } from "./validationSchemas/registerSchema";

const Register = ({
  setCurrentDrawer,
}: {
  setCurrentDrawer: React.Dispatch<
    React.SetStateAction<"register" | "login" | null>
  >;
}) => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const getUser = sessionStorage.getItem("userdata");
  const userData = JSON.parse(getUser);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: RegisterSchema,
      onSubmit: (values, actions) => {
        sessionStorage.setItem("userdata", JSON.stringify([userData, values]));
        setCurrentDrawer(null);
        setCurrentDrawer("login");

        actions.resetForm();
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <Container sx={{ width: { md: 350, xs: 250, sm: 300, lg: 350 } }}>
        <CssBaseline />
        <Box sx={authStyle.box}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Sign Up
          </Typography>
          <Typography sx={authStyle.text}>
            or
            <Typography
              onClick={() => setCurrentDrawer("login")}
              sx={authStyle.textLinks}
            >
              login to your account
            </Typography>
          </Typography>
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
              sx={authStyle.buttons}
              type="submit"
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </form>
  );
};

export default Register;
