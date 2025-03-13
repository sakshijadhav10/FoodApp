import { Button, Container, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const EmptyCart = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "cover",
        justifyContent: "center",
        height: "90vh",
        // position: "fixed",
        overflow: "hidden",
      }}
    >
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB5Yht-mQ_--XLAV5jlE5FJUna6f9Hsjq1Mw&s"
        alt="FoodImg"
      ></img>
      <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
        Your Cart Is Empty
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "secondary.main",
          fontWeight: 500,
          ml: { xs: 2, md: -4 },
        }}
      >
        You can go to home page to view more restaurants
      </Typography>
      <NavLink to={"/"}>
        <Button
          sx={{
            mt: 2,
            border: 1,
            backgroundColor: "primary.main",
            color: "#ffffff",
            fontWeight: "bold",
          }}
        >
          SEE RESTAURANTS
        </Button>
      </NavLink>
    </Container>
  );
};

export default EmptyCart;
