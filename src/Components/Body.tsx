import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
// import { resdata } from '../utils/mockdata'
import Shimmer from "./Shimmer";

import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { CardItem } from "../Interface";
import FilterMenu from "./FilterMenu";
import CartDesc from "./CartDesc";
const Body: React.FC = () => {
  const [listOfRestaurant, setRestaurantData] = useState<CardItem[]>([]);
  const [originalList, setOriginalList] = useState<CardItem[]>([]);
  const [searchText, setSearchText] = useState("");
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
    setOriginalList(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
  };


  return listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div>
      <div>
        <Typography variant="h6">Restaurants with online food delivery in Chhindwara</Typography>
        <button
          onClick={() => {
            const listOfRestaurants = listOfRestaurant.filter(
              (res) => res.info.avgRating > 4.3
            );

            setRestaurantData(listOfRestaurants);
          }}
        >
          Top Rated Restaurants
        </button>
        <button onClick={()=>setRestaurantData(originalList)} style={{marginLeft:4}}>Clear</button>
      </div>
      <input
        placeholder="Search…"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />

      <button
        onClick={() => {
          const searchItem = listOfRestaurant.filter((res) =>
            res.info.name.toLowerCase().includes(searchText.toLowerCase())
          );
          console.log(searchItem);

          setRestaurantData(searchItem);
        }}
      >
        Search
      </button>
      <FilterMenu/>
      {/* {listOfRestaurant.map((restaurant)=>(
          <FilterMenu  key={restaurant.info.id} resData={restaurant}/>
      ))} */}
      {/* {listOfRestaurant.map((restaurant)=>(
          <CartDesc key={restaurant.info.id} resData={restaurant}/>
      ))} */}
  
      
      <Box sx={{ display: "flex", flexWrap: "wrap" }} >
        {listOfRestaurant.map((restaurant) => (
          <Link style={{textDecoration:'none'}} key={restaurant.info.id} to={'/cartDetails/'+restaurant.info.id}><RestaurantCard  resData={restaurant} /></Link>
        ))}
      </Box>
    </div>
  );
};

export default Body;
