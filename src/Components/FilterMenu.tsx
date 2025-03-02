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

interface filter {
  handleApply: () => void;
  handleClear: () => void;
  sortBy: string;
  setSortBy: string;
  filterBy: string;
  setFilterBy: string;
}

const FilterMenu: React.FC<filter> = ({
  handleClear,
  handleApply,
  sortBy,
  setSortBy,
  filterBy,
  setFilterBy,
}) => {
  const handleOpen = () => setOpen(true);

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [cnt, setCnt] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  // let cnt = 1;
  const Ischeck = () => {
    setCnt((prevCnt) => prevCnt + 1);
  };
  function handleClearAllFilter() {
    setCnt(0);
    handleClear();
    setShowBtn(!showBtn);
  }

  function AfterApply() {
    handleApply();

    handleClose();
    setShowBtn(!showBtn);
  }
  console.log(sortBy);

  return (
    <>
      <Stack
        sx={{
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          sx={{ height: 30, width: 80 }}
          onClick={handleOpen}
        >
          <Badge badgeContent={cnt} color="secondary">
            {" "}
            Filter
          </Badge>
        </Button>
        {showBtn && (
          <Chip
            sx={{ mt: 0.1 }}
            label="Clear Filters"
            onClick={handleClearAllFilter}
            variant="outlined"
          />
        )}
      </Stack>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            display: "flex",
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
                <RadioGroup
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <FormControlLabel
                    value="Relevance"
                    control={<Radio />}
                    label="Relevance (Default)"
                    onClick={Ischeck}
                  />
                  <FormControlLabel
                    value="Delivery Time"
                    control={<Radio />}
                    label="Delivery Time"
                    onClick={Ischeck}
                  />
                  <FormControlLabel
                    value="Rating"
                    control={<Radio />}
                    label="Rating"
                    onClick={Ischeck}
                  />
                  <FormControlLabel
                    value="Low to High"
                    control={<Radio />}
                    label="Cost: Low to High"
                    onClick={Ischeck}
                  />
                  <FormControlLabel
                    value="High to Low"
                    control={<Radio />}
                    label="Cost: High to Low"
                    onClick={Ischeck}
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
                <RadioGroup
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                >
                  {/* <FormControlLabel value="Default" control={<Radio />} label="Default" /> */}
                  <FormControlLabel
                    value="Ratings 4.5+"
                    control={<Radio />}
                    label="Ratings 4.5+"
                    onClick={Ischeck}
                  />
                  <FormControlLabel
                    value="Ratings 4.0+"
                    control={<Radio />}
                    label="Ratings 4.0+"
                    onClick={Ischeck}
                  />
                  <FormControlLabel
                    value="Rating 3.5+"
                    control={<Radio />}
                    label="Ratings 3.5+"
                    onClick={Ischeck}
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
          <Button onClick={AfterApply} variant="contained" color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
      {/* {filteredList.map((item) => (
        <div key={item.info.id}>{item.info.name}</div>
      ))} */}
    </>
  );
};

export default FilterMenu;
