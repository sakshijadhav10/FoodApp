import * as React from "react";
import { Box, CardContent, Typography } from "@mui/material";
import { CDN_URL } from "../utils/constant";
import { CardItem } from "./types";
import StarsIcon from "@mui/icons-material/Stars";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const RestaurantCard: React.FC<{ resData: CardItem }> = ({ resData }) => {
  const { name, avgRating, costForTwo, sla, cloudinaryImageId, cuisines } =
    resData.info;

  return (
    <Box
      sx={{
        width: { xs: 300, sm: 290, md: 290, lg: 290 },
        borderRadius: 3,
        height: 300,

        objectFit: "cover",
        transition: "0.3s",

        "&:hover": { transform: "scale(0.97)", transformOrigin: "top bottom" },
      }}
    >
      <Box>
        <img
          src={CDN_URL + cloudinaryImageId}
          alt={name}
          style={{
            width: "100%",
            height: 170,
            objectFit: "cover",
            borderRadius: 12,
          }}
        />
      </Box>
      <CardContent sx={{ paddingTop: "1px", mt: 0 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "black",
            wordSpacing: -2,
            fontSize: 18,
            mt: 0,
          }}
        >
          {name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", marginY: 1 }}>
          <StarsIcon sx={{ color: "green", fontSize: 16, marginRight: 0.5 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", color: "black" }}
          >
            {avgRating}
          </Typography>

          <FiberManualRecordIcon
            sx={{ fontSize: 8, marginX: 1, color: "gray" }}
          />
          <Typography variant="body2" sx={{ color: "gray" }}>
            {sla.slaString}
          </Typography>
          <FiberManualRecordIcon
            sx={{ fontSize: 8, marginX: 1, color: "gray" }}
          />
          <Typography variant="body2" sx={{ color: "gray" }}>
            {costForTwo}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: "gray",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {cuisines.join(", ")}
        </Typography>
      </CardContent>
    </Box>
  );
};

export default RestaurantCard;
