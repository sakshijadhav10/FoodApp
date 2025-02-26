import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { CardItem } from "../Interface";

const FilterMenu: React.FC<{ resData: CardItem }> = () => {
  const [listOfRestaurant, setRestaurantData] = useState<CardItem[]>([]);
  const [originalList, setOriginalList] = useState<CardItem[]>([]);
  const [open, setOpen] = useState(false);
  const [sortBy, setSortBy] = useState("Relevance");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch restaurant data");
      }
      const json = await response.json();
      const restaurants = json?.data?.cards?.[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      setRestaurantData(restaurants);
      setOriginalList(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleApplyFilter = () => {
    let filteredData = [...originalList];

    if (sortBy === "Rating") {
      filteredData = filteredData.filter((res) => Number(res.avgRating) > 4.3);
    } else if (sortBy === "Low to High") {
      filteredData = filteredData.slice().sort((a, b) => {
        const costA = parseInt(a.costForTwoMessage.replace(/\D/g, ""));
        const costB = parseInt(b.costForTwoMessage.replace(/\D/g, ""));
        return costA - costB;
      });
    } else if (sortBy === "High to Low") {
      filteredData = filteredData.slice().sort((a, b) => {
        const costA = parseInt(a.costForTwoMessage.replace(/\D/g, ""));
        const costB = parseInt(b.costForTwoMessage.replace(/\D/g, ""));
        return costB - costA;
      });
    }

    setRestaurantData(filteredData);
    setOpen(false);
  };

  const handleClearFilters = () => {
    setSortBy("Relevance");
    setRestaurantData(originalList);
  };

  return (
    <>
      <Button variant="outlined" startIcon={<FilterListIcon />} onClick={handleOpen}>
        Filter
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Filter</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Sort By</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <RadioGroup value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <FormControlLabel value="Relevance" control={<Radio />} label="Relevance (Default)" />
                  <FormControlLabel value="Delivery Time" control={<Radio />} label="Delivery Time" />
                  <FormControlLabel value="Rating" control={<Radio />} label="Rating" />
                  <FormControlLabel value="Low to High" control={<Radio />} label="Cost: Low to High" />
                  <FormControlLabel value="High to Low" control={<Radio />} label="Cost: High to Low" />
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClearFilters} color="error">Clear Filters</Button>
          <Button onClick={handleApplyFilter} variant="contained" color="primary">Apply</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FilterMenu;
