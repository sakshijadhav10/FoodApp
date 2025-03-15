import { Box, Typography } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { offers } from "../utils/Data/offersData";
import { useState } from "react";

interface OfferData {
  id: number | string;
  img: string;
  title: string;
  description: string;
}

const DealsOfDay = () => {
  const [cardData] = useState<OfferData[]>(offers);
  const [slide, setslide] = useState(0);

  const nextSlide = () => {
    if (cardData.length - 2 === slide) return false;
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
            fontFamily: "Gilroy, arial, Helvetica Neue, sans-serif",
          }}
        >
          Deals for You
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
          flexDirection: "row",
          gap: 2,
          overflow: "hidden",
          mt: 1,
        }}
      >
        {cardData.map((element) => (
          <Box
            sx={{
              height: 70,
              width: 300,
              border: "2px solid black",
              borderRadius: 4,
              display: "flex",
              flexDirection: "row",
              gap: 2,
              flexShrink: 0,
              transform: `translateX(-${slide * 100}%)`,
            }}
            key={element.id}
          >
            <div>
              <img
                src={element.img}
                alt="Item at Rs.189"
                style={{
                  height: 50,
                  width: 50,
                  marginTop: 3,
                  marginLeft: 3,
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body1" sx={{ fontWeight: 800 }}>
                {element.title}
              </Typography>

              <Typography variant="body2">{element.description}</Typography>
            </div>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DealsOfDay;
