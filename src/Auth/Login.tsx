import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authStyle } from "./styles/auth.styles";
import { loginSchema } from "./validationSchemas/loginSchema";

const Login = ({
  onHandleSubmit,
  setCurrentDrawer,
  setLoggedIn,
}: {
  onHandleSubmit;
  setCurrentDrawer: React.Dispatch<
    React.SetStateAction<"register" | "login" | null>
  >;
  setLoggedIn: any;
}) => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  // effects---------------
  useEffect(() => {
    const userLoginData = sessionStorage.getItem("user_login");
    console.log(userLoginData);

    if (userLoginData) {
      setLoggedIn(true); // User is logged in, show logout button
    }
  }, [setLoggedIn]);

  // formik----------------

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,

      validationSchema: loginSchema,
      onSubmit: (values, actions) => {
        onHandleSubmit(values);
        const getuser = sessionStorage.getItem("userdata");
        const userdata = JSON.parse(getuser);
        console.log("userdata", userdata);

        const userlogin = userdata.filter((el) => {
          return el.email === values.email && el.password === values.password;
        });

        console.log("userlogin", userlogin);

        if (getuser && getuser?.length) {
          if (userlogin.length === 0) {
            setCurrentDrawer("register");
            sessionStorage.removeItem("isAuthenticated");
            sessionStorage.removeItem("user_login");
          } else {
            toast.success("user login succesfulyy");
            sessionStorage.setItem("userdata", JSON.stringify(userdata));
            sessionStorage.setItem("user_login", JSON.stringify(userlogin));
            sessionStorage.setItem("isAuthenticated", JSON.stringify(true));
            setLoggedIn(true);
            setCurrentDrawer(null);
            navigate(`/`);
          }
        }
        actions.resetForm();
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <Container sx={{ width: { md: 350, xs: 250, sm: 300, lg: 350 } }}>
        <CssBaseline />
        <Box sx={authStyle.box}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Login
          </Typography>
          <Typography sx={authStyle.text}>
            or
            <Typography
              onClick={() => setCurrentDrawer("register")}
              sx={authStyle.textLinks}
            >
              create an account
            </Typography>
          </Typography>
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
              // helperText={touched.email ? errors.email : "Email is required"}
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
              // helperText={
              //   touched.password ? errors.password : "Password is required"
              // }
            />
            {errors.password && touched.password && <p>{errors.password}</p>}
            <Button
              fullWidth
              variant="contained"
              sx={authStyle.buttons}
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
