import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  List,
  TextField,
  Typography,
  Grid,
  Drawer,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
// import * as Yup from "yup";
import React, { useState } from "react";
import { loginSchema } from "./Login";
import { RegisterSchema } from "./Register";
// import Login from "./Login";


 

export default function AuthDrawer() {
  const [currentDrawer, setCurrentDrawer] = useState<"register" | "login" | null>(null);

  const navigate = useNavigate();
    
    const validationSchema = currentDrawer === "register" ? RegisterSchema : loginSchema;
  
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };


  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values, actions) => {
        console.log(values);
        actions.resetForm();
        setCurrentDrawer(null);
        navigate("/");
      },
    });

  const toggleDrawer = (drawerType: "register" | "login" | null) => {
    setCurrentDrawer(drawerType);
  };

  const renderDrawerContent = (drawerType: "register" | "login") => (
    <Box sx={{ width: 400 }} role="presentation">
      <Button onClick={() => toggleDrawer(null)} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <CloseIcon />
      </Button>
      <List>
        {drawerType === "login" ? (
            <form onSubmit={handleSubmit}>
            <Container maxWidth="xs">
              <CssBaseline />
              <Box sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                    helperText={touched.password ? errors.password : "Password is required"}
                  />
                  <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} type="submit">
                    Login
                  </Button>
                  <Typography sx={{ textAlign: "center", mt: 1 }} >
                    Don't have an account?<Button  onClick={() => toggleDrawer("register")}>register</Button>
                  </Typography>
                </Box>
              </Box>
            </Container>
          </form>
         
        ) : (
            <form onSubmit={handleSubmit}>
            <Container maxWidth="xs">
              <CssBaseline />
              <Box sx={{ mt: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                  {errors.confirm_password && touched.confirm_password && <p>{errors.confirm_password}</p>}
                  <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} type="submit">
                    Sign Up
                  </Button>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <Typography>
                        Already have an account?{" "}
                        <Button onClick={() => toggleDrawer("login")}>Login</Button>
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </form>
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={() => toggleDrawer("login")}>SignIn</Button>
      <Drawer anchor="right" open={currentDrawer !== null} onClose={() => toggleDrawer(null)}>
        {currentDrawer && renderDrawerContent(currentDrawer)}
      </Drawer>
    </div>
  );
}


