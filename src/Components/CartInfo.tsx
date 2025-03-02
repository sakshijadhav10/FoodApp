import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Paper,
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
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  emptyCarts,
  removeCart,
  removeSingleItems,
} from "./redux/slices/cardSlice";
import toast from "react-hot-toast";
import { IMG_URL } from "../utils/constant";

interface CartItem {
  id: number;
  name: string;
  avgRating: number;
  costForTwoMessage: string;
  sla: { minDeliveryTime: number; maxDeliveryTime: number };
  cuisines: string;
  totalRatings: number;
  groupedCard?: boolean;
}

interface RootState {
  allCart: {
    carts: CartItem[];
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
  const dispatch = useDispatch();
  const [totalPrice, setPrice] = useState(0);
  const [totalQty, setQuantity] = useState(0);

  console.log(carts);
  const userData = localStorage.getItem("userdata");
  const isAuthenticated = userData ? true : false;
  useEffect(() => {
    // Calculate total price and quantity whenever the cart changes
    const newTotalPrice = carts.reduce(
      (total, item) => total + (item.item.price / 100) * item.qnty,
      0
    );
    const newTotalQty = carts.reduce((total, item) => total + item.qnty, 0);

    setPrice(newTotalPrice);
    setQuantity(newTotalQty);
  }, [carts]); // Depend on carts array to recalculate whenever the cart changes

  const handleIncr = (itemInfo: any, restaurantInfo: any) => {
    const cartItem = {
      item: itemInfo,
      restaurant: restaurantInfo,
    };

    // Dispatch action with both item and restaurant information
    dispatch(addToCart(cartItem));
  };

  const handleDecrSingle = (item: CartItem) => {
    // Decrease quantity of a specific item based on its restaurant
    dispatch(removeSingleItems({ id: item.id }));
  };

  // const handleIncr = (item: CartItem) => {
  //   dispatch(addToCart(item));
  // };

  const handleDecr = (id: number) => {
    dispatch(removeCart(id));
    toast.success("Item removed successfully");
  };
  if (!isAuthenticated) {
    <h1>Please Login Please</h1>;
  }
  // const handleDecrSingle = (item: CartItem) => {
  //   // console.log(id);

  //   dispatch(removeSingleItems({id:item.id}));
  // };

  const emptyCart = () => {
    dispatch(emptyCarts());
    toast.success("Cart is empty");
  };
  return (
    <Box sx={{ flexGrow: 1, marginTop: 3, width: 900, marginLeft: 25 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
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
              onClick={emptyCart}
            >
              Empty cart
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {carts.length === 0 ? (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700, height: 200, marginLeft: 30 }}
            aria-label="customized table"
          >
            <TableBody>
              <StyledTableRow>
                <Typography variant="h5">Your Cart Is Empty</Typography>
              </StyledTableRow>
              <StyledTableRow>
                <FaCartPlus style={{ height: 50, width: 80 }} />
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Action</StyledTableCell>
                <StyledTableCell>Product</StyledTableCell>
                <StyledTableCell>Restaurant Name</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>Qty</StyledTableCell>
                <StyledTableCell align="right">Total Amount</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {carts.map((data, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>
                    <MdDelete onClick={() => handleDecr(data.item.id)} />
                  </StyledTableCell>
                  <StyledTableCell>
                    <img
                      src={IMG_URL + data.item.imageId}
                      style={{ height: 30, width: 30 }}
                    />
                  </StyledTableCell>
                  <StyledTableCell>{data.restaurant.name}</StyledTableCell>
                  <StyledTableCell>{data.item.name}</StyledTableCell>
                  <StyledTableCell>{data.item.price / 100}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      sx={{
                        backgroundColor: "blue",
                        marginRight: 2,
                        height: 25,
                        color: "white",
                      }}
                      onClick={() => handleIncr(data.item, data.restaurant)}
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
                        backgroundColor: "blue",
                        marginLeft: 2,
                        height: 25,
                        color: "white",
                      }}
                      onClick={() => handleDecrSingle(data.item)}
                    >
                      <FaMinus />
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {data.qnty * (data.item.price / 100)}
                  </StyledTableCell>
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
      )}
    </Box>
  );
  // return (
  //   <Box sx={{ flexGrow: 1, marginTop: 3, width: 900, marginLeft: 25 }}>
  //     <AppBar position="static">
  //       <Toolbar>
  //         <IconButton
  //           size="large"
  //           edge="start"
  //           color="inherit"
  //           aria-label="open drawer"
  //           sx={{ mr: 2 }}
  //         >
  //           {/* <MenuIcon /> */}
  //         </IconButton>
  //         <Typography
  //           variant="h6"
  //           noWrap
  //           component="div"
  //           sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
  //         >
  //           Cart Calculation{carts.length > 0 ? ` (${carts.length})` : ""}
  //         </Typography>
  //         {carts.length > 0 && (
  //           <Button
  //             variant="outlined"
  //             startIcon={<MdDelete />}
  //             sx={{ backgroundColor: "white" }}
  //             onClick={emptyCart}
  //           >
  //             Empty cart
  //           </Button>
  //         )}
  //       </Toolbar>
  //     </AppBar>

  //     {carts.length === 0 ? (
  //       <TableContainer component={Paper}>
  //         <Table
  //           sx={{ minWidth: 700, height: 200, marginLeft: 30 }}
  //           aria-label="customized table"
  //         >
  //           <TableBody>
  //             <StyledTableRow>
  //               <Typography variant="h5">Your Cart Is Empty</Typography>
  //             </StyledTableRow>
  //             <StyledTableRow>
  //               <FaCartPlus style={{ height: 50, width: 80 }} />
  //             </StyledTableRow>
  //           </TableBody>
  //         </Table>
  //       </TableContainer>
  //     ) : (
  //       <TableContainer component={Paper}>
  //         <Table sx={{ minWidth: 700 }} aria-label="customized table">
  //           <TableHead>
  //             <TableRow>
  //               <StyledTableCell>Action</StyledTableCell>
  //               <StyledTableCell>Product</StyledTableCell>
  //               <StyledTableCell>Restaurant Name</StyledTableCell>
  //               <StyledTableCell>Name</StyledTableCell>
  //               <StyledTableCell>Price</StyledTableCell>
  //               <StyledTableCell>Qty</StyledTableCell>
  //               <StyledTableCell align="right">Total Amount</StyledTableCell>
  //             </TableRow>
  //           </TableHead>

  //           <TableBody>
  //             {carts.map((data, index) => (
  //               <StyledTableRow key={index}>
  //                 <StyledTableCell>
  //                   <MdDelete onClick={() => handleDecr(data.item.id)} />
  //                 </StyledTableCell>
  //                 <StyledTableCell>
  //                   <img
  //                     src={IMG_URL + data.item.imageId}
  //                     style={{ height: 30, width: 30 }}
  //                   />
  //                 </StyledTableCell>
  //                 <StyledTableCell>{data.restaurant.name}</StyledTableCell>
  //                 <StyledTableCell>{data.item.name}</StyledTableCell>
  //                 <StyledTableCell>{data.item.price / 100}</StyledTableCell>
  //                 <StyledTableCell>
  //                   <Button
  //                     sx={{
  //                       backgroundColor: "blue",
  //                       marginRight: 2,
  //                       height: 25,
  //                       color: "white",
  //                     }}
  //                     onClick={() => handleIncr(data.item, data.restaurant)}
  //                   >
  //                     <IoMdAdd />
  //                   </Button>
  //                   <input
  //                     type="text"
  //                     style={{ width: 30 }}
  //                     value={data.qnty}
  //                     readOnly
  //                   />
  //                   <Button
  //                     sx={{
  //                       backgroundColor: "blue",
  //                       marginLeft: 2,
  //                       height: 25,
  //                       color: "white",
  //                     }}
  //                     onClick={() => handleDecrSingle(data.item)}
  //                   >
  //                     <FaMinus />
  //                   </Button>
  //                 </StyledTableCell>
  //                 <StyledTableCell align="right">
  //                   {data.qnty * (data.item.price / 100)}
  //                 </StyledTableCell>
  //               </StyledTableRow>
  //             ))}
  //           </TableBody>

  //           <TableRow>
  //             <StyledTableCell align="right" colSpan={6}>
  //               Items in cart: {totalQty}
  //             </StyledTableCell>
  //             <StyledTableCell align="right">
  //               Total Price: {totalPrice}
  //             </StyledTableCell>
  //           </TableRow>
  //         </Table>
  //       </TableContainer>
  //     )}
  //   </Box>
  // );
};

export default CartDetails;
