/* eslint-disable no-unsafe-optional-chaining */
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IMG_URL, Menu_API_URL } from "../utils/constant";
import { useParams } from "react-router-dom";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";
import { CartDetailsResponse } from "../Interface";
import StarsIcon from "@mui/icons-material/Stars";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./redux/slices/cardSlice";
import { toast } from "react-hot-toast";
import ShimmerResta from "./ShimmerResta";
import AddtoCart from "./AddtoCart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// import Slide from "@mui/material/Slide";
// import { TransitionProps } from "@mui/material/transitions";

// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement<any, any>;
//   },
//   ref: React.Ref<unknown>
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

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

const CartDetails: React.FC = () => {
  const [cartDetails, setCartDetails] = useState<CartDetailsResponse | null>(
    null
  );
  const [showMore, setShowMore] = useState(false);
  const [showMoreText, setShowMoreText] = useState(false);
  const { carts } = useSelector((state: RootState) => state.allCart);
  const dispatch = useDispatch();
  const { resId } = useParams();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  const [isAuthenticated] = localStorage.getItem("userdata");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await fetch(Menu_API_URL + resId);
      const json = await data.json();
      console.log(json);

      setCartDetails(json.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  if (!cartDetails) {
    return (
      <Typography>
        <ShimmerResta />
      </Typography>
    );
  }

  const restaurantInfo = cartDetails?.cards[2]?.card?.card?.info;

  const { itemCards } =
    cartDetails?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards[2]?.card
      ?.card;
  console.log("itemcard", itemCards);

  if (!restaurantInfo) {
    return <Typography>Error loading restaurant details.</Typography>;
  }

  const send = (itemCards: any, restaurantInfo: asny) => {
    const existingResta = carts.find(
      (cartItem) => cartItem.restaurant.id !== restaurantInfo.id
    );
    const cartItem = {
      item: itemCards,
      restaurant: restaurantInfo,
    };
    if (isAuthenticated) {
      if (existingResta) {
        setSelectedItem(cartItem);

        setOpenDialog(true);
      } else {
        console.log(cartItem);
        dispatch(addToCart(cartItem));
        toast.success("Item added successfully");
      }
    }
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleAddtoCart = () => {
    if (selectedItem) {
      // setSelectedItem(selectedItem);
      dispatch(addToCart(selectedItem));

      toast.success("Item added successfully");
      setOpenDialog(false);
    }
  };
  return (
    <Container maxWidth="xl">
      <Box>
        <Typography
          variant="h5"
          sx={{ marginLeft: 33, marginTop: 5, mb: 2, fontWeight: "bold" }}
        >
          {restaurantInfo.name}
        </Typography>
        <Card
          sx={{
            borderRadius: 5,
            boxShadow: "20px 20px lightgrey",
            border: 0.5,
            marginLeft: 32,
            width: "55%",
          }}
        >
          <CardContent>
            <Box sx={{ ml: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 0.5,
                }}
              >
                <StarsIcon sx={{ color: "green", display: "inline" }} />
                <Typography sx={{ fontWeight: "bold" }}>
                  {restaurantInfo.avgRating}({restaurantInfo.totalRatings}{" "}
                  ratings )
                </Typography>
                <FiberManualRecordIcon sx={{ fontSize: 10 }} />
                <Typography sx={{ fontWeight: "bold" }}>
                  {restaurantInfo.costForTwoMessage}
                </Typography>
              </Box>
              <Typography sx={{ color: "orangered", fontWeight: "400", mb: 1 }}>
                <a href="/" style={{ color: "orangered" }}>
                  {restaurantInfo.cuisines}
                </a>
              </Typography>
              <Box
                sx={{ display: "flex", gap: 2, justifyContent: "flex-start" }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  <FiberManualRecordIcon sx={{ fontSize: 10 }} />
                  Outlet
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.3 }}>
                  {" "}
                  {restaurantInfo.cuisines}
                </Typography>
              </Box>
              <Typography sx={{ height: 10, mb: 1 }}>|</Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                <FiberManualRecordIcon sx={{ fontSize: 10 }} />
                {restaurantInfo.sla.minDeliveryTime}-
                {restaurantInfo.sla.maxDeliveryTime} MINS
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Box>
          {showMore ? (
            // <ExpandLessIcon />
            <Box sx={{ display: "flex", flexDirection: "row", gap: 55 }}>
              <Typography
                variant="h6"
                sx={{
                  marginLeft: 33,
                  marginTop: 6,
                  fontWeight: "bold",
                  gap: 20,
                }}
              >
                Recommended({itemCards.length})
              </Typography>
              <ExpandMoreIcon
                onClick={() => {
                  setShowMore(!showMore);
                }}
                sx={{ mt: 6 }}
              />
            </Box>
          ) : (
            <>
              <Box sx={{ display: "flex", flexDirection: "row", gap: 55 }}>
                <Typography
                  variant="h6"
                  sx={{ marginLeft: 33, marginTop: 6, fontWeight: "bold" }}
                >
                  Recommended({itemCards.length})
                </Typography>
                <ExpandLessIcon
                  onClick={() => setShowMore(!showMore)}
                  sx={{ mt: 6 }}
                />
              </Box>

              {itemCards.map((item, index) => (
                <>
                  <Box
                    sx={{
                      // borderRadius: 5,
                      // boxShadow: 15,
                      width: "60%",
                      display: "flex",
                      height: "auto",
                      justifyContent: "space-between",
                      marginBottom: 2,
                      marginLeft: 29,
                      alignContentL: "center",
                      border: "none",
                    }}
                    key={index}
                  >
                    {/* <CardContent> */}
                    <Box sx={{ gap: 2, mt: 2, ml: 5, maxWidth: "auto" }}>
                      <RadioButtonCheckedRoundedIcon sx={{ color: "green" }} />
                      <Typography
                        variant="body1"
                        sx={{ color: "#36454F", fontWeight: "bold" }}
                      >
                        {item.card.info.name}
                      </Typography>
                      {item.card.info.price ? (
                        <Typography>Rs.{item.card.info.price / 100}</Typography>
                      ) : (
                        <Typography>
                          Rs.{item.card.info.defaultPrice / 100}
                        </Typography>
                      )}
                      {showMoreText ? (
                        <>
                          <Typography variant="body1">
                            {item.card.info.description}
                            <button
                              style={{
                                border: "none",
                                background: "none",
                                color: "black",
                                fontWeight: "bold",
                                fontSize: 15,
                              }}
                              onClick={() => setShowMoreText(!showMoreText)}
                            >
                              Show Less
                            </button>
                          </Typography>
                        </>
                      ) : (
                        <>
                          <Typography variant="body1">
                            {item.card.info.description.slice(0, 100)}...
                            <button
                              style={{
                                border: "none",
                                background: "none",
                                color: "black",
                                fontWeight: "bold",
                                fontSize: 15,
                              }}
                              onClick={() => setShowMoreText(!showMoreText)}
                            >
                              Show More
                            </button>
                          </Typography>
                        </>
                      )}

                      {/* {item.card.info.description ?{show} (
                  <Typography variant="body1">
                    {item.card.info.description.slice(0, 100)}...
                  </Typography>
                ) : (
                  ""
                )} */}
                    </Box>

                    {/*  */}
                    {/* </CardContent> */}
                    <Box sx={{ display: "" }}>
                      <Box
                        sx={{ position: "relative", display: "inline-block" }}
                      >
                        <img
                          src={IMG_URL + item.card.info.imageId}
                          alt=""
                          style={{
                            height: 150,
                            width: 180,
                            borderRadius: 10,
                            marginTop: 10,
                            marginRight: 20,
                          }}
                        />

                        <Button
                          sx={{
                            position: "absolute",
                            top: "95%",
                            left: "48%",
                            transform: "translate(-50%, -50%)",
                            color: "green",
                            borderRadius: 2,
                            backgroundColor: "skyblue",
                            height: 30,
                            width: 50,
                          }}
                          onClick={() => {
                            send(item.card.info, restaurantInfo);
                          }}
                        >
                          ADD
                        </Button>
                        <AddtoCart
                          open={openDialog}
                          onClose={handleDialogClose}
                          handleAddAgain={handleAddtoCart}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <hr style={{ width: 700 }} />
                </>
              ))}
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default CartDetails;
