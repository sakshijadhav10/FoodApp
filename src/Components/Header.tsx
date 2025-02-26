import { useState } from "react";

import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { LOGO_URL } from "../utils/constant";
import {  NavLink } from "react-router-dom";


import AuthDrawer from "./Auth/AuthDrawer";


const SwiggyNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // const [auth, setAuth] = useState("Sign In");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", color: "black", boxShadow: 2 }}
      >
        <Toolbar sx={{ display: "flex" }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography sx={{ display: "flex" }}>
            <NavLink to={'/'}>
            <img
              src={LOGO_URL}
              alt=""
              style={{
                height: 70,
                width: 70,
                borderRadius: 10,
                marginLeft: 30,
                marginRight:300,
                
              }}

            />
            </NavLink>
          </Typography>
          <NavLink to={'/'} style={{textDecoration:'none',color:"black",fontWeight:'bold'}}>
          <Button
            color="inherit"
            sx={{ display: { xs: "none", sm: "block" }, marginRight: 5 ,fontWeight:'bold'}}
          >
            Home
          </Button>
          </NavLink>
          <NavLink to={'https://www.swiggy.com/offers-near-me'} target="blank" style={{textDecoration:'none',color:'black',fontWeight:'bold'}}>
          <Button
            color="inherit"
            sx={{ display: { xs: "none", sm: "block" }, marginRight: 5,fontWeight:'bold' }}
          >
            Offers
          </Button>
          </NavLink>
          <NavLink to={'https://www.swiggy.com/support'} target="blank" style={{textDecoration:'none',color:"black",fontWeight:'bold'}}>
          <Button
            color="inherit"
            sx={{ display: { xs: "none", sm: "block" }, marginRight: 5 ,fontWeight:'bold'}}
          >
            Help
          </Button>
          </NavLink>
          <NavLink to={'/Cartdesc'} style={{textDecoration:'none',color:"black",fontWeight:'bold'}}>
          <IconButton color="inherit" sx={{ marginRight: 5 }}>
            <Badge badgeContent={1} color="error">
              <ShoppingCartIcon />
            </Badge>
              {/* <Cartdesc/> */}
            <Typography sx={{ marginLeft: 1 ,color:"black",fontWeight:'bold'}}>Cart</Typography>
          </IconButton>
          </NavLink>
          <IconButton color="inherit">
          <AccountCircleIcon />
          <AuthDrawer/>
          </IconButton>
          
        </Toolbar>
      </AppBar>
    </>
  );
};

export default SwiggyNavbar;
