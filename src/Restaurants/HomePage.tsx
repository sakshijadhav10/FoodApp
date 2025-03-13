import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "../Components/Shimmers/RestaurantCardShimmer";
import {
  Box,
  Chip,
  Container,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { CardItem, FilterBy, SortBy } from "../Interface";
import FilterMenu from "./Components/FilterRestaurant";
import globalMuiStyles from "../utils/global.styles";
import axios from "axios";
import {
  RESTAURANT_API,
  RESTAURANT_API2,
} from "../services/webApiServices.apis";

const HomePage: React.FC = () => {
  const [restaurantData, setRestaurantData] = useState<CardItem[]>([]);
  const [originalList, setOriginalList] = useState<CardItem[]>([]);
  const [change, setChange] = useState<boolean>(false);
  const [open, setOpen] = useState(true);
  const [sortBy, setSortBy] = useState<SortBy>();
  const [filterBy, setFilterBy] = useState<FilterBy>();

  const mobileOpen = useMediaQuery("(max-width:600px)");

  // effects----------------
  useEffect(() => {
    fetchData();
  }, [mobileOpen]);

  //FOR FETCHING RESTAURANT DATA
  const fetchData = async () => {
    try {
      let res;
      if (mobileOpen) {
        res = await axios.get(RESTAURANT_API);
      } else {
        res = await axios.get(RESTAURANT_API2);
      }

      const json = res.data;

      //  optional chaining

      setRestaurantData(
        json.data.cards[4].card?.card?.gridElements?.infoWithStyle
          ?.restaurants || []
      );
      setOriginalList(
        json.data.cards[4].card?.card?.gridElements?.infoWithStyle
          ?.restaurants || []
      );
    } catch (e) {
      console.error(e);
    }
  };

  // handlers--------------------
  const handleClearFilters = () => {
    setSortBy("");
    setFilterBy("");
    setRestaurantData(originalList);
  };

  const handleApplySort = () => {
    handleSortFilterBy();
  };

  const handleSortFilterBy = () => {
    let updatedList = [...restaurantData];
    switch (sortBy) {
      case "Relevance":
        updatedList = originalList;
        break;
      case "Rating":
        updatedList = updatedList.sort(
          (a, b) => parseFloat(b.info.avgRating) - parseFloat(a.info.avgRating)
        );
        break;
      case "Low to High":
        updatedList = updatedList.sort(
          (a, b) =>
            parseInt(a.info.costForTwo.replace(/\D/g, "")) -
            parseInt(b.info.costForTwo.replace(/\D/g, ""))
        );
        break;
      case "High to Low":
        updatedList = updatedList.sort(
          (a, b) =>
            parseInt(b.info.costForTwo.replace(/\D/g, "")) -
            parseInt(a.info.costForTwo.replace(/\D/g, ""))
        );
        break;
      case "Delivery Time":
        updatedList = updatedList.sort(
          (a, b) =>
            parseInt(a.info.sla.DeliveryTime) -
            parseInt(b.info.sla.DeliveryTime)
        );
        break;
      default:
        break;
    }
    switch (filterBy) {
      case "Ratings 4.5+":
        updatedList = updatedList.filter((res) => res.info.avgRating > 4.5);
        break;
      case "Ratings 4.0+":
        updatedList = updatedList.filter((res) => res.info.avgRating > 4.0);
        break;
      case "Ratings 3.5+":
        updatedList = updatedList.filter((res) => res.info.avgRating > 3.5);
        break;
      default:
        break;
    }
    setRestaurantData(updatedList);

    setOpen(!open);
  };

  const handleBestRestaurants = () => {
    if (!change) {
      const listOfRestaurants = restaurantData.filter(
        (res) => res.info.avgRating > 4.3
      );

      setRestaurantData(listOfRestaurants);
    } else {
      setRestaurantData(originalList);
    }
    setChange(!change);
  };

  return restaurantData.length === 0 ? (
    <Shimmer />
  ) : (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        padding: 0,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          mt: 10,
          width: "100%",
          ...globalMuiStyles.pageContainer,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Box
          sx={{
            flexDirection: { xs: "row", lg: "row" },
            alignItems: {
              xs: "center",
              sm: "center",
              md: "center",
              lg: "flex-start",
            },
            textAlign: {
              xs: "center",
              sm: "center",
              md: "center",
              lg: "left",
            },
            justifyContent: { xs: "center", md: "center", lg: "flex-start" },
            ml: { xs: 0, md: 0, sm: 0, lg: 3 },

            width: "100%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              // textAlign: { xs: "center", md: "center" },
              fontWeight: "bolder",
              mt: 2,
              fontSize: { xs: 12, sm: 15, md: 18 },
            }}
          >
            Restaurants with online food delivery in Chhindwara
          </Typography>
          <Box
            sx={{
              display: "flex",
              mt: 1,
              gap: 1,
              alignItems: {
                xs: "center",
                sm: "center",
                md: "center",
                lg: "flex-start",
              },
              justifyContent: {
                xs: "center",
                sm: "center",
                md: "center",
                lg: "flex-start",
              },
            }}
          >
            <FilterMenu
              handleClear={handleClearFilters}
              handleApply={handleApplySort}
              sortBy={sortBy}
              setSortBy={setSortBy}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />

            <Box
              sx={{
                ml: { sm: 0, md: 1, lg: 2 },
                width: { xs: 120, sm: 150, md: 170 },
              }}
            >
              <Chip
                sx={{
                  fontSize: { xs: 10, md: 12, lg: 14 },
                  height: { xs: 25, md: 30 },
                  backgroundColor: "#D3D3D3",
                  wordSpacing: { xs: "none", sm: "none" },
                }}
                label="Best Restaurants"
                onClick={handleBestRestaurants}
                onDelete={change ? handleBestRestaurants : undefined}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            ...globalMuiStyles.display,
            flexWrap: "wrap",
            gap: "10px",
            mt: 2,

            ...globalMuiStyles.pageContainer,
          }}
        >
          {restaurantData.map((restaurant) => (
            <Link
              style={{
                textDecoration: "none",
              }}
              key={restaurant.info.id}
              to={"/cartDetails/" + restaurant.info.id}
            >
              <RestaurantCard resData={restaurant} key={restaurant.id} />
            </Link>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default HomePage;
