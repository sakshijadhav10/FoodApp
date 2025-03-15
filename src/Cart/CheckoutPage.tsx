import React from "react";
import { Grid, Paper, Box } from "@mui/material";

import CartItemInfo from "./CartItemInfo";
import { CardItem } from "../Interface";
import EmptyCart from "./EmptyCart";
import { useSelector } from "react-redux";
import AccountSection from "./Components/AccountSection";
import DeliveryAddressSection from "./Components/DeliveryAddressSection";
import PaymentSection from "./Components/PaymentSection";

interface RootState {
  allCart: {
    carts: CardItem[];
  };
}
const CheckoutPage = () => {
  const { carts } = useSelector((state: RootState) => state.allCart);

  return (
    <>
      {carts.length === 0 ? (
        <EmptyCart />
      ) : (
        <Box
          sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", p: 4, mt: 5 }}
        >
          <Grid container spacing={-1} maxWidth="1100px" margin="auto">
            <Grid item xs={12} md={7} sx={{ mt: 5 }}>
              {/* Account */}
              <Paper sx={{ p: 3, mb: 2 }}>
                <AccountSection />
              </Paper>
              {/* Delivery Address */}
              <Paper sx={{ p: 3, mb: 2 }}>
                <DeliveryAddressSection />
              </Paper>

              {/* Payment Section */}
              <Paper sx={{ p: 3 }}>
                <PaymentSection />
              </Paper>
            </Grid>

            {/* Right Section - Cart Summary */}
            <Grid item xs={12} md={5} sx={{ mt: 5 }}>
              <CartItemInfo />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default CheckoutPage;
