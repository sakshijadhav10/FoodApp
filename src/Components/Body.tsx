import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import {
  // Badge,
  Box,
  // Button,
  Chip,
  Container,
  Paper,
  // Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { CardItem } from "../Interface";
import FilterMenu from "./FilterMenu";
// import FilterListIcon from "@mui/icons-material/FilterList";

const Body: React.FC = () => {
  const [listOfRestaurant, setRestaurantData] = useState<CardItem[]>([]);
  const [originalList, setOriginalList] = useState<CardItem[]>([]);

  const [change, setChange] = useState<boolean>(false);

  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const [sortBy, setSortBy] = useState("Relevance");
  const [filterBy, setFilterBy] = useState();

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);
    //  optional chaining

    setRestaurantData(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );
    setOriginalList(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  const handleClearFilters = () => {
    setSortBy("Relevance");
    setFilterBy("");
    setRestaurantData(originalList);
  };

  const handleApplySort = () => {
    let updatedList = [...listOfRestaurant];

    if (sortBy === "Relevance") {
      updatedList = originalList;
    } else if (sortBy === "Rating") {
      updatedList = updatedList.sort(
        (a, b) => parseFloat(b.info.avgRating) - parseFloat(a.info.avgRating)
      );
    } else if (sortBy === "Low to High") {
      updatedList = updatedList.sort(
        (a, b) =>
          parseInt(a.info.costForTwo.replace(/\D/g, "")) -
          parseInt(b.info.costForTwo.replace(/\D/g, ""))
      );
    } else if (sortBy === "High to Low") {
      updatedList = updatedList.sort(
        (a, b) =>
          parseInt(b.info.costForTwo.replace(/\D/g, "")) -
          parseInt(a.info.costForTwo.replace(/\D/g, ""))
      );
    } else if (sortBy === "Delivery Time") {
      updatedList = updatedList.sort(
        (a, b) =>
          parseInt(a.info.sla.deliveryTime) - parseInt(b.info.sla.deliveryTime)
      );
    }
    if (filterBy === "Ratings 4.5+") {
      updatedList = updatedList.filter((res) => res.info.avgRating > 4.5);
    } else if (filterBy === "Ratings 4.0+") {
      updatedList = updatedList.filter((res) => res.info.avgRating > 4.0);
    } else if (filterBy === "Ratings 3.0+") {
      updatedList = updatedList.filter((res) => res.info.avgRating > 3.0);
    }
    setRestaurantData(updatedList);
    setOpen(false);
  };

  const topRated = () => {
    if (!change) {
      const listOfRestaurants = listOfRestaurant.filter(
        (res) => res.info.avgRating > 4.3
      );

      setRestaurantData(listOfRestaurants);
    } else {
      setRestaurantData(originalList);
    }
    setChange(!change);
  };
  return listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <Container maxWidth="lg">
      <Paper elevation={0} sx={{ marginLeft: 13 }}>
        <Box sx={{ ml: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mt: 2 }}>
            Restaurants with online food delivery in Chhindwara
          </Typography>
          <Box sx={{ display: "flex", mt: 2 }}>
            <FilterMenu
              handleClear={handleClearFilters}
              handleApply={handleApplySort}
              sortBy={sortBy}
              setSortBy={setSortBy}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />

            <Box sx={{ ml: 2 }}>
              <Chip
                label="Top Rated Restaurant"
                onClick={topRated}
                onDelete={change ? topRated : undefined}
              />
            </Box>
          </Box>
        </Box>
        {/* <button onClick={()=>setRestaurantData(originalList)} style={{marginLeft:4}}>Clear</button> */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {listOfRestaurant.map((restaurant) => (
            <Link
              style={{ textDecoration: "none" }}
              key={restaurant.info.id}
              to={"/cartDetails/" + restaurant.info.id}
            >
              <RestaurantCard resData={restaurant} />
            </Link>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default Body;
