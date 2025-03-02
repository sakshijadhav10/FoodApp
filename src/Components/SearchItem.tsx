import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { CardItem } from "../Interface";
import { Link } from "react-router-dom";
// import React, { useState } from 'react'

const SearchItem = () => {
  // const [ setSearchText] = useState("");

  const [listOfRestaurant, setRestaurantData] = useState<CardItem[]>([]);

  const [searchText, setSearchText] = useState("");
  const [filterItem, setFilterItem] = useState<CardItem[]>([]);

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
  };
  // fetchData();
  let searchItem;
  const handleSearch = () => {
    console.log("hi");
    searchItem = listOfRestaurant.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(searchItem);

    setFilterItem(searchItem);

    setSearchText("");
  };

  return (
    <div>
      <TextField
        sx={{ width: 800, mt: 10, ml: 10 }}
        label="Search"
        id="fullWidth"
        placeholder="Search…"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      {/* <Typography>{searchText}</Typography> */}
      {searchText ? (
        <Button onClick={handleSearch} sx={{ mt: 11, ml: 2, border: 1 }}>
          Search
        </Button>
      ) : (
        <Button
          onClick={handleSearch}
          sx={{ mt: 11, ml: 2, border: 1 }}
          disabled
        >
          Search
        </Button>
      )}
      {/* {searchItem && "no result found"} */}
      <Box sx={{ ml: 15 }}>
        {filterItem.map((item) => (
          <Link
            style={{ textDecoration: "none" }}
            key={item.info.id}
            to={"/cartDetails/" + item.info.id}
          >
            <RestaurantCard resData={item} />
          </Link>
        ))}
      </Box>
    </div>
  );
};

export default SearchItem;
