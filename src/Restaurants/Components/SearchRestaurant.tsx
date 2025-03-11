import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import RestaurantCard from "../RestaurantCard";

import { Link } from "react-router-dom";
import { RESTAURANT_API2 } from "../../services/webApiServices.apis";
import { CardItem } from "../types";

const SearchItem = () => {
  const [listOfRestaurant, setRestaurantData] = useState<CardItem[]>([]);
  const [searchText, setSearchText] = useState("");
  const [filterItem, setFilterItem] = useState<CardItem[]>([]);

  // effects---------
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(RESTAURANT_API2);
    const json = await data.json();
    console.log(json);
    setRestaurantData(
      json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants
    );
  };

  //  handlers-------------------
  const handleSearch = () => {
    const searchItem = listOfRestaurant.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilterItem(searchItem);
    setSearchText("");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 8,
        background: "none",
        border: "none",
        height: "auto",
        paddingX: { xs: 2, sm: 3, md: 4, lg: 6 },
      }}
    >
      <Box>
        <TextField
          size="small"
          sx={{
            width: { xs: "100%", sm: 400, md: 500, lg: 600 },
            mt: { xs: 4, sm: 6, md: 10 },
            ml: { xs: 0, sm: 2, md: 3, lg: 5 },
          }}
          label="Search"
          id="fullWidth"
          placeholder="Search…"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />

        <Button
          onClick={handleSearch}
          sx={{
            mt: { xs: 2, sm: 6.5, md: 10 },
            height: { xs: 33, md: 33 },
            border: 1,
            backgroundColor: "primary.main",
            ml: { xs: 0, sm: 1, md: 2 },
            color: "#000000",
            display: searchText ? "inline-block" : "none",
          }}
        >
          Search
        </Button>
        <Button
          onClick={handleSearch}
          sx={{
            mt: { xs: 2, sm: 6.5, md: 10 },
            height: { xs: 33, md: 33 },
            border: 1,
            backgroundColor: "primary.main",
            ml: { xs: 0, sm: 1, md: 2 },
            color: "black",
            display: searchText ? "none" : "inline-block",
          }}
          disabled
        >
          Search
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        {filterItem.length === 0 ? (
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem" },
              ml: { xs: 2, sm: 2, md: 5 },
            }}
          >
            No results found. Try searching for something else.
          </Typography>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 2,
              mt: 2,
            }}
          >
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
        )}
      </Box>
    </Container>
  );
};

export default SearchItem;
