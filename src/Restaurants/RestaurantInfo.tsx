import {
  Box,
  Card,
  CardContent,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Menu_API_URL } from "../services/webApiServices.apis";
import { useParams } from "react-router-dom";

import StarsIcon from "@mui/icons-material/Stars";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ShimmerResta from "../Components/Shimmers/RestaurantInfoShimmer";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import RecommendedMenuCard from "./RecommendedMenuCard";
import { CardItem } from "../Interface";
import DealsOfDay from "./DealsOfDay";

const CartDetails: React.FC = () => {
  const [cartDetails, setCartDetails] = useState<CardItem | null>(null);
  const [showMore, setShowMore] = useState(false);
  const { resId } = useParams();
  const restaurantInfo = cartDetails?.cards[2]?.card?.card?.info;
  const itemCards =
    cartDetails?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card?.itemCards || [];
  console.log("itemcards", itemCards);

  // effect-----------------------

  useEffect(() => {
    fetchMenu();
  }, []);

  // data fetching---------------
  const fetchMenu = async () => {
    try {
      const res = await axios.get(Menu_API_URL + resId);
      const json = res.data;
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

  return (
    <Container maxWidth="md">
      <Paper elevation={0}>
        <Box>
          <Typography
            variant="h5"
            sx={{ marginTop: 15, mb: 2, fontWeight: "bolder" }}
          >
            {restaurantInfo.name}
          </Typography>
          <Card
            sx={{
              // display: "block",
              background:
                " linear-gradient(rgb(255, 255, 255) -6.71%, rgb(235, 235, 242) 56.19%, rgb(223, 223, 231) 106.56%)",
              padding: { xs: 0, lg: "0px 10px 5px" },
              borderBottomLeftRadius: 36,
              borderBottomRightRadius: 36,
              boxSizing: "inherit",
            }}
          >
            <CardContent>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: { xs: 0, lg: 0.5 },
                  }}
                >
                  <StarsIcon sx={{ color: "green", display: "inline" }} />
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: { xs: 12, lg: 15 } }}
                  >
                    {restaurantInfo.avgRating}({restaurantInfo.totalRatings}{" "}
                    ratings )
                  </Typography>
                  <FiberManualRecordIcon
                    sx={{ fontSize: 6, color: "grey", ml: 1 }}
                  />
                  <Typography
                    sx={{ fontWeight: "bold", fontSize: { xs: 12, lg: 15 } }}
                  >
                    {restaurantInfo.costForTwoMessage}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: "orangered",
                    fontWeight: 600,
                    mt: 1,
                    fontSize: 14,
                  }}
                >
                  {restaurantInfo.cuisines.join(",")}
                </Typography>
                <Box
                  sx={{ display: "flex", gap: 2, justifyContent: "flex-start" }}
                >
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", fontSize: { xs: 12, lg: 15 } }}
                  >
                    <FiberManualRecordIcon
                      sx={{
                        fontSize: 8,
                        color: "grey",
                        alignItems: { lg: "center", xs: "left" },
                        mb: { xs: 0, lg: 0.2 },
                      }}
                    />
                    Outlet
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: { xs: 0, lg: 0.3 },
                      fontSize: { xs: 12, lg: 15 },
                    }}
                  >
                    {" "}
                    {restaurantInfo.cuisines.join(",")}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", mt: 0.3 }}
                >
                  <FiberManualRecordIcon
                    sx={{
                      fontSize: 8,
                      color: "grey",
                      alignItems: "center",
                      mb: 0.2,
                    }}
                  />
                  {restaurantInfo.sla.minDeliveryTime}-
                  {restaurantInfo.sla.maxDeliveryTime} MINS
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Box sx={{ mt: 2 }}>
            <DealsOfDay />
          </Box>
          <Box>
            {showMore ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    marginTop: 6,
                    color: "#02060c",
                    fontWeight: 900,
                    fontFamily: "Gilroy, arial, Helvetica Neue, sans-serif",
                  }}
                >
                  Recommended({itemCards.length})
                </Typography>
                <ExpandMoreIcon
                  onClick={() => {
                    setShowMore(!showMore);
                  }}
                  sx={{ mt: 6, fontSize: 30, justifyContent: "flex-end" }}
                />
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",

                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      marginTop: 6,
                      color: "#02060c",
                      fontWeight: 900,
                      fontFamily: "Gilroy, arial, Helvetica Neue, sans-serif",
                    }}
                  >
                    Recommended({itemCards.length})
                  </Typography>
                  <ExpandLessIcon
                    onClick={() => setShowMore(!showMore)}
                    sx={{ mt: 6, fontSize: 30 }}
                  />
                </Box>
                <RecommendedMenuCard
                  itemCards={itemCards}
                  restaurantInfo={restaurantInfo}
                />
              </>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CartDetails;
