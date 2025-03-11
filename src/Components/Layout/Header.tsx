import { useState } from "react";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Box,
  Divider,
  ListItem,
  ListItemText,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { LOGO_URL } from "../../utils/constant";
import { NavLink } from "react-router-dom";
import AuthDrawer from "../../Auth/AuthDrawer";
import { useSelector } from "react-redux";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HelpIcon from "@mui/icons-material/Help";
import { CardItem } from "../../Interface";
import { sidebar } from "../../utils/routes/SideBarRoutes";
import { headerStyle } from "./styles/Header.styles";
import globalMuiStyles from "../../utils/global.styles";
import CloseIcon from "@mui/icons-material/Close";

interface RootState {
  allCart: {
    carts: CardItem[];
  };
}

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

const SwiggyNavbar = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { carts } = useSelector((state: RootState) => state.allCart);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <Box
      onClick={() => setMobileOpen(false)}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      <div>
        <Typography
          onClick={handleDrawerToggle}
          sx={{
            ...globalMuiStyles.display,
            color: "#000000",
            float: "right",
            mt: 2,
            mr: 2,
            cursor: "pointer",
          }}
        >
          <CloseIcon />
        </Typography>
        <Typography
          variant="h6"
          sx={{
            justifyContent: "center",
            ml: 6,
          }}
        >
          <NavLink to={"/"}>
            <img
              src={LOGO_URL}
              alt=""
              style={{
                height: 80,
                width: 90,
                borderRadius: 10,
                marginLeft: 30,
                marginRight: 360,
              }}
            />
          </NavLink>
        </Typography>
      </div>

      <Divider />

      <div>
        {sidebar.map((item) => (
          <NavLink
            to={item.routeHref}
            style={{
              textDecorationLine: "none",
              color: "black",
            }}
            key={item.routerName}
          >
            <ListItem sx={{ textAlign: "center" }}>
              <ListItemText primary={item.routerName} />
            </ListItem>
          </NavLink>
        ))}
      </div>

      <AuthDrawer />
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          ...headerStyle.AppBar,
          justifyContent: { lg: "space-between", xs: "space-between" },
        }}
      >
        <Toolbar
          sx={{
            flex: 1,

            justifyContent: { lg: "space-between", xs: "space-between" },
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleDrawerToggle}
            sx={{ display: { lg: "none" }, color: "#000000" }}
          >
            <MenuIcon />
          </IconButton>

          <Typography>
            <NavLink to={"/"}>
              <img
                src={LOGO_URL}
                alt=""
                style={{
                  height: 80,
                  width: 90,
                  borderRadius: 10,
                }}
              />
            </NavLink>
          </Typography>

          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              justifyContent: "flex-end",
              textAlign: "right",
              float: "right",
              xs: "h",
            }}
          >
            <NavLink to={"/"} style={headerStyle.navLinks}>
              <Typography
                color="inherit"
                sx={{ ...headerStyle.AppBarMenu, ...headerStyle.HideMenuLg }}
              >
                Home
              </Typography>
            </NavLink>

            <NavLink to={"/search"} style={headerStyle.navLinks}>
              <Typography
                sx={{ ...headerStyle.AppBarMenu, ...headerStyle.HideMenuLg }}
              >
                <SearchIcon />
                Search
              </Typography>
            </NavLink>

            <NavLink
              to={"https://www.swiggy.com/offers-near-me"}
              target="blank"
              style={headerStyle.navLinks}
            >
              <Typography
                color="inherit"
                sx={{ ...headerStyle.AppBarMenu, ...headerStyle.HideMenuLg }}
              >
                <LocalOfferIcon />
                Offers
              </Typography>
            </NavLink>
            <NavLink
              to={"https://www.swiggy.com/support"}
              target="blank"
              style={headerStyle.navLinks}
            >
              <Typography
                color="inherit"
                sx={{ ...headerStyle.AppBarMenu, ...headerStyle.HideMenuLg }}
              >
                <HelpIcon />
                Help
              </Typography>
            </NavLink>
            <NavLink to={"/cart"} style={headerStyle.navLinks}>
              <Typography
                sx={{ ...headerStyle.AppBarMenu, ...headerStyle.HideMenuLg }}
              >
                <Badge badgeContent={carts.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
                Cart
              </Typography>
            </NavLink>

            <Box sx={headerStyle.HideMenuLg}>
              <AuthDrawer />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="persistent"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: false }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default SwiggyNavbar;
