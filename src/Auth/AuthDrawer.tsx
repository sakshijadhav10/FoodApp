import { useEffect, useState } from "react";
import { Drawer, Button, Typography, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Login from "./Login";
import Register from "./Register";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import toast from "react-hot-toast";
import { headerStyle } from "../Components/Layout/styles/Header.styles";

const AuthDrawer = () => {
  const [currentDrawer, setCurrentDrawer] = useState<
    "register" | "login" | null
  >(null);

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const mobileOpen = useMediaQuery("(max-width:1200px)");
  useEffect(() => {
    updateLoginState();
  }, []);

  // handlers -----------
  const handleLogin = (values: string) => {
    console.log(values);

    updateLoginState();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("user_login");
    toast.success("You have successfully logout");
    updateLoginState();
  };

  const toggleDrawer = (drawerType: "register" | "login" | null) => {
    setCurrentDrawer(drawerType);
  };

  const updateLoginState = () => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <Typography
          onClick={handleLogout}
          sx={{
            ...headerStyle.AppBarMenu,
            fontWeight: { xs: "none", sm: "none", md: "none", lg: 700 },
            ml: { xs: 12, sm: 12, md: 12, lg: 2 },
            mt: { xs: 2, lg: 0 },
            cursor: "pointer",
          }}
        >
          <AccountCircleIcon
            sx={{ display: { xs: "none", md: "none", lg: "flex" } }}
          />
          Logout
        </Typography>
      ) : (
        <Typography
          onClick={() => toggleDrawer("login")}
          sx={{
            ...headerStyle.AppBarMenu,
            fontWeight: { xs: "none", sm: "none", md: "none", lg: 700 },
            ml: { xs: 12, sm: 12, md: 12, lg: 2 },
            mt: { xs: 2, lg: 0 },
            cursor: "pointer",
          }}
        >
          <AccountCircleIcon
            sx={{ display: { xs: "none", md: "none", lg: "flex" } }}
          />
          Sign In
        </Typography>
      )}

      <Drawer
        anchor={mobileOpen ? "left" : "right"}
        open={currentDrawer !== null}
        onClose={() => toggleDrawer(null)}
      >
        <div
          style={{
            // width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <Button
            onClick={() => toggleDrawer(null)}
            sx={{
              // ...globalMuiStyles.display,
              mt: 2,
              // width: "100%",
              color: "#000000",
              justifyContent: { xs: "right", lg: "left" },
              ml: { xs: 0, lg: 1.5 },
              background: "none",
              cursor: "pointer",
            }}
          > */}
          <CloseIcon
            onClick={() => toggleDrawer(null)}
            sx={{
              mt: 2,
              // width: "100%",
              color: "#000000",
              justifyContent: { xs: "right", lg: "left" },
              ml: { xs: 0, lg: 2 },
              background: "none",
              cursor: "pointer",
            }}
          />
          {/* </Button> */}

          {currentDrawer === "login" ? (
            <Login
              onHandleSubmit={handleLogin}
              setCurrentDrawer={setCurrentDrawer}
              setLoggedIn={setIsLoggedIn}
            />
          ) : (
            <Register setCurrentDrawer={setCurrentDrawer} />
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default AuthDrawer;
