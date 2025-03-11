import { Box, Button, Card, CardContent } from "@mui/material";
import React from "react";
import { restauInfoStyle } from "./style/restauInfoShimmer.styles";

const ShimmerResta = () => {
  return (
    <>
      <Box>
        <Card sx={restauInfoStyle.infoCard}>
          <CardContent>
            <Box sx={restauInfoStyle.infoCardContent}></Box>

            <Box sx={restauInfoStyle.infoCardContentBox}></Box>
          </CardContent>
        </Card>
        <Box>
          <Box sx={restauInfoStyle.infoCardBox}>
            <Box sx={{ gap: 2, mt: 2, ml: 5 }}></Box>

            <Box sx={{ display: "" }}>
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <img
                  src=""
                  alt=""
                  style={{
                    height: 120,
                    width: 180,
                    borderRadius: 10,
                    marginTop: 10,
                    backgroundColor: "lightgrey",
                  }}
                />

                <Button sx={restauInfoStyle.infoAddToCartBtn}></Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <CardContent>
          <Box sx={restauInfoStyle.infoCardContent}></Box>

          <Box sx={restauInfoStyle.infoCardContentBox}></Box>
        </CardContent>

        <Box>
          <Box sx={restauInfoStyle.infoCardBox}>
            <Box sx={{ gap: 2, mt: 2, ml: 5 }}></Box>

            <Box sx={{ display: "" }}>
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <img
                  src=""
                  alt=""
                  style={{
                    height: 120,
                    width: 180,
                    borderRadius: 10,
                    marginTop: 10,
                    backgroundColor: "lightgrey",
                  }}
                />

                <Button sx={restauInfoStyle.infoAddToCartBtn}></Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <CardContent>
          <Box sx={restauInfoStyle.infoCardContent}></Box>

          <Box sx={restauInfoStyle.infoCardContentBox}></Box>
        </CardContent>

        <Box>
          <Box sx={restauInfoStyle.infoCardBox}>
            <Box sx={{ gap: 2, mt: 2, ml: 5 }}></Box>

            <Box sx={{ display: "" }}>
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <img
                  src=""
                  alt=""
                  style={{
                    height: 120,
                    width: 180,
                    borderRadius: 10,
                    marginTop: 10,
                    backgroundColor: "lightgrey",
                  }}
                />

                <Button sx={restauInfoStyle.infoAddToCartBtn}></Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <CardContent>
          <Box sx={restauInfoStyle.infoCardContent}></Box>

          <Box sx={restauInfoStyle.infoCardContentBox}></Box>
        </CardContent>

        <Box>
          <Box sx={restauInfoStyle.infoCardBox}>
            <Box sx={{ gap: 2, mt: 2, ml: 5 }}></Box>

            <Box sx={{ display: "" }}>
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <img
                  src=""
                  alt=""
                  style={{
                    height: 120,
                    width: 180,
                    borderRadius: 10,
                    marginTop: 10,
                    backgroundColor: "lightgrey",
                  }}
                />

                <Button sx={restauInfoStyle.infoAddToCartBtn}></Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ShimmerResta;
