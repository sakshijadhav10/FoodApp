// src/components/AuthDrawer.tsx
import React, { useState } from "react";
import { Drawer, Button, Grid, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Login from "./Login";
import Register from "./Register";
import { useNavigate } from "react-router-dom";

const AuthDrawer = () => {
  const [currentDrawer, setCurrentDrawer] = useState<
    "register" | "login" | null
  >(null);
  const navigate = useNavigate();

  const toggleDrawer = (drawerType: "register" | "login" | null) => {
    setCurrentDrawer(drawerType);
  };
  // const [data] = useState([]);

  const handleLoginSubmit = (values: any) => {
    console.log("Logged in", values);

    // setCurrentDrawer(null);
    // navigate("/");
  };

  const handleRegisterSubmit = (values: any) => {
    console.log("Registered", values);
  };

  return (
    <div>
      <Button onClick={() => toggleDrawer("login")}>SignIn</Button>
      <Drawer
        anchor="right"
        open={currentDrawer !== null}
        onClose={() => toggleDrawer(null)}
      >
        <div style={{ width: 400, padding: 20 }}>
          <Button
            onClick={() => toggleDrawer(null)}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <CloseIcon />
          </Button>
          {currentDrawer === "login" ? (
            <>
              <Login
                onSubmit={handleLoginSubmit}
                setCurrentDrawer={setCurrentDrawer}
              />
              <Typography sx={{ textAlign: "center", mt: 1 }}>
                Don't have an account?
                <Button onClick={() => toggleDrawer("register")}>
                  register
                </Button>
              </Typography>
            </>
          ) : currentDrawer === "register" ? (
            <>
              <Register
                onSubmit={handleRegisterSubmit}
                setCurrentDrawer={setCurrentDrawer}
              />
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography>
                    Already have an account?{" "}
                    <Button onClick={() => toggleDrawer("login")}>Login</Button>
                  </Typography>
                </Grid>
              </Grid>
            </>
          ) : null}
        </div>
      </Drawer>
    </div>
  );
};

export default AuthDrawer;
function setCurrentDrawer(arg0: null) {
  throw new Error("Function not implemented.");
}
