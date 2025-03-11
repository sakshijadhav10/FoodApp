export const headerStyle = {
  AppBar: {
    backgroundColor: "primary.light",
    boxShadow: "0 15px 40px -20px rgba(40,44,63,.15)",
    backgroundOrigin: "content-box",
    height: 80,
  },
  AppBarMenu: {
    marginLeft: 2,
    color: "#000000",
    fontWeight: 600,
    fontSize: 16,
    fontFamily: "Gilroy, arial, Helvetica Neue, sans-serif",
    display: "flex",
    mr: 5,
    "&:hover": {
      color: "primary.main",
      transform: "scale(0.97)",
      transformOrigin: "top bottom",
    },
  },
  HideMenuLg: {
    "@media (max-width:1200px)": {
      display: "none",
    },
  },

  Logo: {
    height: 80,
    width: 90,
    borderRadius: 10,
    marginLeft: { xs: 10, lg: 30 },
    marginRight: 360,
  },

  navLinks: {
    textDecoration: "none",
    display: "flex",

    fontWeight: "bold",
  },
};
