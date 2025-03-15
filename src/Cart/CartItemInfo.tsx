import { Box, Checkbox, Container, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import EmptyCart from "./EmptyCart";
import { IMG_URL } from "../utils/constant";

import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
import { addToCart, removeSingleItems } from "../state/slices/cardSlice";
import { CardItem } from "../Interface";
import { useDispatch, useSelector } from "react-redux";

interface RootState {
  allCart: {
    carts: CardItem[];
  };
}

const CartItemInfo = () => {
  const { carts } = useSelector((state: RootState) => state.allCart);
  const dispatch = useDispatch();
  const [totalPrice, setPrice] = useState(0);
  const [totalQty, setQuantity] = useState(0);

  // effect----------------
  useEffect(() => {
    const newTotalPrice = carts.reduce(
      (total, item) =>
        total + (item.item.price / 100) * item.qnty ||
        total + (item.item.defaultPrice / 100) * item.qnty,
      0
    );
    const newTotalQty = carts.reduce((total, item) => total + item.qnty, 0);

    setPrice(newTotalPrice);
    setQuantity(newTotalQty);
  }, [carts]);

  // handlers-----------
  const handleIncrement = (itemInfo: any, restaurantInfo: any) => {
    const cartItem = {
      item: itemInfo,
      restaurant: restaurantInfo,
    };

    dispatch(addToCart(cartItem));
  };

  const handleDecrSingle = (item: CardItem) => {
    dispatch(removeSingleItems({ id: item.id }));
  };

  return (
    <Container>
      {carts.length === 0 ? (
        <EmptyCart />
      ) : (
        <Paper
          sx={{
            maxHeight: "500px",
            maxWidth: "500px",
            overflowY: "auto",
            p: 3,
          }}
        >
          {carts.map((data, index) => (
            <Box key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  textAlign: "left",
                }}
              >
                <img
                  src={IMG_URL + data.item.imageId}
                  style={{ height: 40, width: 40, marginTop: 3 }}
                />
                <Box sx={{ ml: 1 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {data.restaurant.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {data.restaurant.cuisines}
                  </Typography>
                </Box>
              </Box>

              {/* Cart Item */}
              <Box
                display="grid"
                gridTemplateColumns="2fr 1fr 1fr"
                gap={1}
                alignItems="center"
                mt={2}
                p={1}
                border="1px solid #e0e0e0"
                borderRadius="8px"
              >
                <Typography>{data.item.name}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    border: "1px solid grey",
                  }}
                >
                  <FaMinus
                    style={{ color: "grey" }}
                    onClick={() => handleDecrSingle(data.item)}
                  />
                  <Typography sx={{ color: "green", fontWeight: "bold" }}>
                    {data.qnty}
                  </Typography>
                  <IoMdAdd
                    style={{ color: "green", fontWeight: "bold" }}
                    onClick={() => handleIncrement(data.item, data.restaurant)}
                  />
                </Box>

                {data.item.price ? (
                  <Typography>
                    ₹{data.qnty * (data.item.price / 100)}{" "}
                  </Typography>
                ) : (
                  <Typography>
                    ₹{data.qnty * (data.item.defaultPrice / 100)}{" "}
                  </Typography>
                )}
              </Box>

              {/* No-contact Delivery */}
              <Paper sx={{ p: 2, mt: 2, backgroundColor: "#f9f9f9" }}>
                <Checkbox />
                <Typography variant="body2" component="span">
                  Opt in for No-contact Delivery
                </Typography>

                <Typography
                  variant="caption"
                  display="block"
                  color="textSecondary"
                >
                  Unwell, or avoiding contact? Your order will be placed outside
                  your door (not for COD).
                </Typography>
              </Paper>

              {/* Bill Details */}
              <Typography variant="body2" sx={{ fontWeight: "bold", mt: 1 }}>
                Bill Details
              </Typography>
              <Box mt={1}>
                <Typography variant="body1" sx={{ color: "grey" }}>
                  Item Total:{" "}
                  <Typography sx={{ color: "grey", float: "right" }}>
                    ₹{totalPrice}
                  </Typography>
                </Typography>
                <Typography variant="body1" sx={{ color: "grey" }}>
                  Delivery Fee:{" "}
                  <Typography sx={{ color: "grey", float: "right" }}>
                    ₹{50}
                  </Typography>
                </Typography>
                <hr />
                {/* <Typography>Delivery Fee: ₹20</Typography> */}
                <Typography variant="body1" fontWeight="bold" mt={2}>
                  TO PAY{" "}
                  <Typography
                    variant="body1"
                    sx={{ float: "right", fontWeight: "bold" }}
                  >
                    ₹{totalPrice + 50}
                  </Typography>
                </Typography>
              </Box>
            </Box>
          ))}
        </Paper>
      )}
    </Container>
  );
};

export default CartItemInfo;
