import { Box, Button, Grid, Grid2, Typography } from "@mui/material";
import { useState } from "react";
import { IMG_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../state/slices/cardSlice";
import { toast } from "react-hot-toast";
import AddtoCart from "../Cart/AddtoCartPopUp";

import { CardItem } from "../Interface";
import globalMuiStyles from "../utils/global.styles";

interface RootState {
  allCart: {
    carts: CardItem[];
  };
}
interface ItemCard {
  card: {
    info: {
      name: string;
      price?: number;
      defaultPrice?: number;
      description: string;
      imageId: string;
    };
  };
}

interface RestaurantInfo {
  id: string;
  name: string;
}

const RecommendedMenuCard = ({
  itemCards,
  restaurantInfo,
}: {
  itemCards: ItemCard[];
  restaurantInfo: RestaurantInfo;
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [expandedText, setExpandedText] = useState<{ [key: number]: boolean }>(
    {}
  );

  const { carts } = useSelector((state: RootState) => state.allCart);
  const dispatch = useDispatch();

  // handlers---------------------
  const handleSend = (
    itemCards: ItemCard[],
    restaurantInfo: RestaurantInfo
  ) => {
    const LOGGED_USER = localStorage.getItem("userdata");
    console.log("loginuser", LOGGED_USER);

    if (!LOGGED_USER || !LOGGED_USER.length) {
      toast.error("You need to log in first.");

      return;
    }
    const USER_DATA = JSON.parse(LOGGED_USER);
    console.log("userdata", USER_DATA);

    if (USER_DATA) {
      const EXISTING_RESTAU = carts.find(
        (cartItem) => cartItem.restaurant.id !== restaurantInfo.id
      );
      const CART_ITEM = {
        item: itemCards,
        restaurant: restaurantInfo,
      };

      if (EXISTING_RESTAU) {
        setSelectedItem(CART_ITEM);

        setOpenDialog(true);
      } else {
        dispatch(addToCart(CART_ITEM));
        toast.success("Item added successfully");
      }
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleAddtoCart = () => {
    if (selectedItem) {
      dispatch(addToCart(selectedItem));

      toast.success("Item added successfully");
      setOpenDialog(false);
    }
  };
  const handleToggleShowMore = (index: number) => {
    setExpandedText((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  return (
    <>
      {itemCards.map((item, index) => (
        <>
          <Box
            sx={{
              height: "auto",
              marginBottom: 5,
              border: "none",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            key={index}
          >
            <Box sx={{ gap: 2, mt: 2 }}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh71sfIQVPk_TuhnuWB0Q1E6FlciHqRH-wRA&s"
                alt=""
                style={{ height: 20 }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(2, 6, 12, 0.85)",
                  fontWeight: 700,
                  fontFamily: "Girloy",
                  fontSize: 17,
                  letterSpacing: -0.45,
                }}
              >
                {item.card.info.name}
              </Typography>

              {item.card.info.price ? (
                <Typography
                  sx={{
                    color: "#02060c",
                    fontWeight: 500,
                    fontFamily: "Gilroy, arial, Helvetica Neue, sans-serif",
                  }}
                >
                  Rs.{item.card.info.price / 100}
                </Typography>
              ) : (
                <Typography
                  sx={{
                    color: "#02060c",
                    fontWeight: 500,
                    fontFamily: "Gilroy, arial, Helvetica Neue, sans-serif",
                  }}
                >
                  Rs.{item?.card?.info?.defaultPrice / 100}
                </Typography>
              )}
              <Typography
                variant="body1"
                sx={{
                  color: "grey",
                  fontFamily: "Gilroy, arial, Helvetica Neue, sans-serif",
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                {expandedText[index]
                  ? item.card.info.description
                  : item.card.info.description.slice(0, 100) + "..."}
                {item.card.info.description ? (
                  <button
                    style={{
                      border: "none",
                      background: "none",
                      color: "#000000",
                      fontWeight: 800,
                      fontSize: 14,
                      marginLeft: 2,
                    }}
                    onClick={() => handleToggleShowMore(index)}
                  >
                    {expandedText[index] ? "less" : "more"}
                  </button>
                ) : (
                  ""
                )}
              </Typography>
            </Box>

            <Box>
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <img
                  src={IMG_URL + item.card.info.imageId}
                  style={{
                    height: 150,
                    width: 160,
                    borderRadius: 10,
                    marginTop: 10,
                    marginLeft: 15,
                  }}
                />

                <Button
                  sx={{
                    position: "absolute",
                    top: "95%",
                    left: "55%",
                    transform: "translate(-50%, -50%)",
                    color: "#17B169",
                    fontWeight: "bolder",
                    fontSize: 18,
                    borderRadius: 2,
                    backgroundColor: "#ffffff",
                    border: 1,
                    borderColor: "#E5E4E2",
                    height: 40,
                    width: 110,
                  }}
                  onClick={() => {
                    handleSend(item.card.info, restaurantInfo);
                  }}
                >
                  ADD
                </Button>
              </Box>
            </Box>

            <AddtoCart
              open={openDialog}
              onClose={handleDialogClose}
              onHandleAddAgain={handleAddtoCart}
            />
          </Box>
          <hr />
        </>
      ))}
    </>
  );
};

export default RecommendedMenuCard;
