/* eslint-disable no-unsafe-optional-chaining */
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IMG_URL, Menu_API_URL } from "../utils/constant";
import { useParams } from "react-router-dom";
import RadioButtonCheckedRoundedIcon from '@mui/icons-material/RadioButtonCheckedRounded';
import { CartDetailsResponse } from "../Interface";
import StarsIcon from "@mui/icons-material/Stars";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useDispatch } from "react-redux";
import { addToCart } from "./redux/slices/cardSlice";
import { toast } from "react-toastify";

const CartDetails: React.FC = () => {
  const [cartDetails, setCartDetails] = useState<CartDetailsResponse | null>(
    null
  );
  const dispatch = useDispatch();
  const { resId } = useParams();
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
    return <Typography>Loading...</Typography>;
  }

  const restaurantInfo = cartDetails?.cards[2]?.card?.card?.info;

  const { itemCards } =
    cartDetails?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards[2]?.card
      ?.card;
  console.log("itemcard", itemCards);

  if (!restaurantInfo) {
    return <Typography>Error loading restaurant details.</Typography>;
  }


  const send = (e:CartDetailsResponse) => {
    dispatch(addToCart(e));
    toast.success("Item added Successfully")
  };

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{ marginLeft: 31, marginTop: 10, mb: 2, fontWeight: "bold" }}
      >
        {restaurantInfo.name}
      </Typography>
      <Card
        sx={{ borderRadius: 5, boxShadow: 15, marginLeft: 30, width: "50%" }}
      >
        <CardContent>
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
              {restaurantInfo.avgRating}({restaurantInfo.totalRatings} ratings )
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
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-start" }}>
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
        </CardContent>
      </Card>
      <Box>
        <Typography
          variant="h6"
          sx={{ marginLeft: 30, marginTop: 5, fontWeight: "bold" }}
        >
          Recommended
        </Typography>
        {itemCards.map((item) => (
          <Box
            sx={{
              // borderRadius: 5,
              boxShadow: 15,
              width: "50%",
              display: "flex",
              height: 300,
              justifyContent: "space-between",
              margin: 2,
              marginLeft: 30,
              alignContentL: "center",
            }}
          >
            {/* <CardContent> */}
            <Box sx={{ gap: 2, mt: 2 ,ml:5}}>
            <RadioButtonCheckedRoundedIcon sx={{color:'green'}}/> 
              <Typography
                variant="body1"
                sx={{ color: "#36454F", fontWeight: "bold" }}
              >
                {item.card.info.name}
              </Typography>
              <Typography>Rs. {item.card.info.defaultPrice/100}:{item.card.info.price/100}</Typography>
              <Typography variant="body1" >
  {item.card.info.description}
</Typography>

            </Box>
        
            {/*  */}
            {/* </CardContent> */}
            <Box sx={{ display: "" }}>
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <img
                  src={IMG_URL + item.card.info.imageId}
                  alt=""
                  style={{
                    height: 120,
                    width: 180,
                    borderRadius: 10,
                    marginTop: 5,
                  }}
                />

                <Button
                  sx={{
                    position: "absolute",
                    top: "90%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "green",
                    borderRadius: 2,
                    backgroundColor: "skyblue",
                    height: 30,
                    width: 50,
                  }}
                  onClick={() => { send(item); }}
                >
                  ADD
                </Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CartDetails;
