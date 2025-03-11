import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { MdDelete } from "react-icons/md";
import { FaMinus } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  emptyCarts,
  removeCart,
  removeSingleItems,
} from "../state/slices/cardSlice";
import toast from "react-hot-toast";
import { IMG_URL } from "../utils/constant";
import { CardItem } from "../Interface";
import EmptyCart from "./EmptyCart";
import { cartStyle } from "./styles/cartStyle.styles";

interface RootState {
  allCart: {
    carts: CardItem[];
  };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CartDetails: React.FC = () => {
  const { carts } = useSelector((state: RootState) => state.allCart);

  console.log("firstcarts", carts);
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

  const handleDecrement = (id: number) => {
    dispatch(removeCart(id));
    toast.success("Item removed successfully");
  };

  const handleEmptyCart = () => {
    dispatch(emptyCarts());
    toast.success("Cart is empty");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        justifyContent: "center",
      }}
    >
      {carts.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <AppBar
            sx={{
              mt: 15,
              maxWidth: "lg",
              justifyContent: "center",
            }}
            position="static"
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              ></IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                Cart Calculation{carts.length > 0 ? ` (${carts.length})` : ""}
              </Typography>
              {carts.length > 0 && (
                <Button
                  variant="outlined"
                  startIcon={<MdDelete />}
                  sx={{ backgroundColor: "white" }}
                  onClick={handleEmptyCart}
                >
                  Empty cart
                </Button>
              )}
            </Toolbar>
          </AppBar>
          <TableContainer>
            <Table sx={{ maxWidth: "md" }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Action</StyledTableCell>
                  <StyledTableCell>Product</StyledTableCell>
                  <StyledTableCell>Restaurant Name</StyledTableCell>
                  <StyledTableCell>Item Name</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell align="center">Qty</StyledTableCell>
                  <StyledTableCell align="right">Total Amount</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {carts.map((data, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>
                      <MdDelete onClick={() => handleDecrement(data.item.id)} />
                    </StyledTableCell>
                    <StyledTableCell>
                      <img
                        src={IMG_URL + data.item.imageId}
                        style={{ height: 30, width: 30 }}
                      />
                    </StyledTableCell>
                    <StyledTableCell>{data.restaurant.name}</StyledTableCell>
                    <StyledTableCell>{data.item.name}</StyledTableCell>
                    {data.item.price ? (
                      <StyledTableCell>{data.item.price / 100}</StyledTableCell>
                    ) : (
                      <StyledTableCell>
                        {data.item.defaultPrice / 100}
                      </StyledTableCell>
                    )}

                    <StyledTableCell>
                      <Button
                        sx={{
                          ...cartStyle.buttons,
                          marginRight: 2,
                        }}
                        onClick={() =>
                          handleIncrement(data.item, data.restaurant)
                        }
                      >
                        <IoMdAdd />
                      </Button>
                      <input
                        type="text"
                        style={{ width: 30 }}
                        value={data.qnty}
                        readOnly
                      />
                      <Button
                        sx={{
                          ...cartStyle.buttons,
                          marginLeft: 2,
                        }}
                        onClick={() => handleDecrSingle(data.item)}
                      >
                        <FaMinus />
                      </Button>
                    </StyledTableCell>

                    {data.item.price ? (
                      <StyledTableCell align="right">
                        {data.qnty * (data.item.price / 100)}{" "}
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell align="right">
                        {data.qnty * (data.item.defaultPrice / 100)}{" "}
                      </StyledTableCell>
                    )}
                  </StyledTableRow>
                ))}
              </TableBody>

              <TableRow>
                <StyledTableCell align="right" colSpan={6}>
                  Items in cart: {totalQty}
                </StyledTableCell>
                <StyledTableCell align="right">
                  Total Price: {totalPrice}
                </StyledTableCell>
              </TableRow>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default CartDetails;
