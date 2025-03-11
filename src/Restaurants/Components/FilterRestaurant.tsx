import React, { useState } from "react";
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
  Badge,
  Chip,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Filter, FilterBy, SortBy } from "../../Interface";
import globalMuiStyles from "../../utils/global.styles";

const FilterMenu: React.FC<Filter> = ({
  handleClear,
  handleApply,
  sortBy,
  setSortBy,
  filterBy,
  setFilterBy,
}) => {
  const [open, setOpen] = useState(false);
  const [cnt, setCnt] = useState(0);
  const [sortSelected, setSortSelected] = useState(false);
  const [filterSelected, setFilterSelected] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  // handlers----------------------------

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  function handleClearAllFilter() {
    setCnt(0);
    setSortSelected(false);
    setFilterSelected(false);
    handleClear();
    setShowBtn(false);
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortBy(e.target.value as SortBy);
    if (!sortSelected) {
      setSortSelected(true);
      setCnt((prevCnt) => prevCnt + 1);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterBy(e.target.value as FilterBy);
    if (!filterSelected) {
      setFilterSelected(true);
      setCnt((prevCnt) => prevCnt + 1);
    }
  };

  function handleAfterApply() {
    handleApply();
    handleClose();
    setShowBtn(true);
  }

  return (
    <>
      <Stack
        sx={{
          flexDirection: "row",
          gap: { xs: 0.7, md: 1, lg: 2 },
          alignItems: { xs: "center", lg: "center" },
        }}
      >
        <Button
          variant="contained"
          startIcon={<FilterListIcon />}
          sx={{
            height: { xs: 25, md: 30 },
            width: { xs: 70, sm: 80, md: 90 },
            ml: { xs: 0 },

            borderRadius: 10,
            color: "#000000",
            backgroundColor: "#D3D3D3",
            ...globalMuiStyles.display,
          }}
          onClick={handleOpen}
        >
          <Badge badgeContent={cnt} color="secondary">
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: 10, sm: 12, md: 12, lg: 14 },
                fontWeight: "100",
                width: { xs: 20, md: 25, lg: 30 },
                mr: { xs: 2 },
                color: "#000000",
              }}
            >
              Filter
            </Typography>
          </Badge>
        </Button>

        {showBtn && (
          <Chip
            sx={{
              mt: { sm: 0.2 },
              ml: { xs: 1 },
              // mr: { xs: 0.3 },
              backgroundColor: "#D3D3D3",
              height: { xs: 25, md: 30 },
              width: { xs: 80, sm: 80, md: 90, lg: 90 },
              fontSize: { xs: 10 },
            }}
            label="Clear Filters"
            onClick={handleClearAllFilter}
            variant="outlined"
          />
        )}
      </Stack>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        sx={{ mt: { xs: 8, lg: 10 } }}
      >
        <DialogTitle
          sx={{
            ...globalMuiStyles.display,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Filter</Typography>
        </DialogTitle>

        <DialogContent dividers>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Sort By</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <RadioGroup value={sortBy} onChange={handleSortChange}>
                  <FormControlLabel
                    value="Relevance"
                    control={<Radio />}
                    label="Relevance"
                  />
                  <FormControlLabel
                    value="Delivery Time"
                    control={<Radio />}
                    label="DeliveryTime"
                  />
                  <FormControlLabel
                    value="Rating"
                    control={<Radio />}
                    label="Rating"
                  />
                  <FormControlLabel
                    value="Low to High"
                    control={<Radio />}
                    label="Cost: Low to High"
                  />
                  <FormControlLabel
                    value="High to Low"
                    control={<Radio />}
                    label="Cost: High to Low"
                  />
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </DialogContent>

        <DialogContent dividers>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Ratings</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl component="fieldset">
                <RadioGroup value={filterBy} onChange={handleFilterChange}>
                  <FormControlLabel
                    value="Ratings 4.5+"
                    control={<Radio />}
                    label="Ratings 4.5+"
                  />
                  <FormControlLabel
                    value="Ratings 4.0+"
                    control={<Radio />}
                    label="Ratings 4.0+"
                  />
                  <FormControlLabel
                    value="Rating 3.5+"
                    control={<Radio />}
                    label="Ratings 3.5+"
                  />
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClearAllFilter} color="error">
            Clear Filters
          </Button>
          <Button
            onClick={handleAfterApply}
            variant="contained"
            color="primary"
          >
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FilterMenu;
