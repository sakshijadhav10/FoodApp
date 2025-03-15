import { Box, Typography } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

import { useState } from "react";
import { category } from "../utils/Data/categoryData";

interface CategoryData {
  id: number;
  image: string;
  name: string;
}

const WhatsOnMind = () => {
  const [categoryData] = useState<CategoryData[]>(category);
  const [slide, setslide] = useState(0);

  const nextSlide = () => {
    if (categoryData.length - 6 === slide) return false;
    setslide(slide + 1);
  };
  const prevSlide = () => {
    if (slide === 0) return;
    setslide(slide - 1);
  };
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="body1"
          sx={{
            color: "#02060c",
            fontWeight: 900,
            fontSize: { xs: "14px", lg: "18px" },
            fontFamily: "Gilroy, arial, Helvetica Neue, sans-serif",
          }}
        >
          What's On Your Mind
        </Typography>
        <Box>
          <ArrowCircleLeftIcon
            sx={{
              fontSize: { xs: "30px", lg: "40px" },
              color: "grey",
              cursor: "pointer",
            }}
            onClick={prevSlide}
          />

          <ArrowCircleRightIcon
            sx={{
              fontSize: { xs: "30px", lg: "40px" },
              color: "grey",
              cursor: "pointer",
            }}
            onClick={nextSlide}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          // ...globalMuiStyles.pageContainer,
          flexDirection: "row",
          gap: 2,
          overflow: "hidden",
          mt: 1,
        }}
      >
        {categoryData.map((element) => (
          <Box
            sx={{
              display: "inline-block",
              overflow: "hidden",

              flexShrink: 0,
              ml: { xs: 0, lg: 5 },
              transform: `translateX(-${slide * 100}%)`,
            }}
            key={element.id}
          >
            <Box>
              <img
                src={element.image}
                alt="Item at Rs.189"
                style={{
                  height: "100px",
                  width: "100px",
                  overflow: "hidden",

                  // border: "1px solid grey",
                  borderRadius: "50%",
                  objectFit: "fill",
                }}
              />
            </Box>
            <Box>
              <Typography
                variant="body1"
                sx={{ fontWeight: 800, textAlign: "center" }}
              >
                {element.name}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WhatsOnMind;
