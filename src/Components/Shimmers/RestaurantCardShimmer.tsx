import { Box, Button, CardContent, Chip } from "@mui/material";
import { shimmerStyle } from "./style/restauCardShimmer.styles";
// import globalMuiStyles from "../../utils/global.styles";

const Shimmer = () => {
  return (
    <>
      <Box>
        <Box sx={shimmerStyle.restauBox}>
          <Button variant="outlined" sx={shimmerStyle.restauBtn}></Button>

          <Chip sx={shimmerStyle.restauChip}></Chip>
        </Box>
      </Box>
      <Box sx={shimmerStyle.restauCardBox}>
        <Box sx={shimmerStyle.restauCardBox2}>
          <Box>
            <img
              src=" "
              alt=""
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          </Box>
          <CardContent sx={shimmerStyle.restauCardContent}>
            <Box
              sx={{ display: "flex", alignItems: "center", marginY: 1 }}
            ></Box>
          </CardContent>
        </Box>

        <Box sx={shimmerStyle.restauCardBox2}>
          <Box>
            <img
              src=" "
              alt=""
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          </Box>
          <CardContent sx={shimmerStyle.restauCardContent}>
            <Box
              sx={{ display: "flex", alignItems: "center", marginY: 1 }}
            ></Box>
          </CardContent>
        </Box>

        <Box sx={shimmerStyle.restauCardBox2}>
          <Box>
            <img
              src=" "
              alt=""
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          </Box>
          <CardContent sx={shimmerStyle.restauCardContent}>
            <Box
              sx={{ display: "flex", alignItems: "center", marginY: 1 }}
            ></Box>
          </CardContent>
        </Box>

        <Box sx={shimmerStyle.restauCardBox2}>
          <Box>
            <img
              src=" "
              alt=""
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          </Box>
          <CardContent sx={shimmerStyle.restauCardContent}>
            <Box
              sx={{ display: "flex", alignItems: "center", marginY: 1 }}
            ></Box>
          </CardContent>
        </Box>

        <Box sx={shimmerStyle.restauCardBox2}>
          <Box>
            <img
              src=" "
              alt=""
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          </Box>
          <CardContent sx={shimmerStyle.restauCardContent}>
            <Box
              sx={{ display: "flex", alignItems: "center", marginY: 1 }}
            ></Box>
          </CardContent>
        </Box>

        <Box sx={shimmerStyle.restauCardBox2}>
          <Box>
            <img
              src=" "
              alt=""
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          </Box>
          <CardContent sx={shimmerStyle.restauCardContent}>
            <Box
              sx={{ display: "flex", alignItems: "center", marginY: 1 }}
            ></Box>
          </CardContent>
        </Box>

        <Box sx={shimmerStyle.restauCardBox2}>
          <Box>
            <img
              src=" "
              alt=""
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          </Box>
          <CardContent sx={shimmerStyle.restauCardContent}>
            <Box
              sx={{ display: "flex", alignItems: "center", marginY: 1 }}
            ></Box>
          </CardContent>
        </Box>

        <Box sx={shimmerStyle.restauCardBox2}>
          <Box>
            <img
              src=" "
              alt=""
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          </Box>
          <CardContent sx={shimmerStyle.restauCardContent}>
            <Box
              sx={{ display: "flex", alignItems: "center", marginY: 1 }}
            ></Box>
          </CardContent>
        </Box>

        <Box sx={shimmerStyle.restauCardBox2}>
          <Box>
            <img
              src=" "
              alt=""
              style={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          </Box>
          <CardContent sx={shimmerStyle.restauCardContent}>
            <Box
              sx={{ display: "flex", alignItems: "center", marginY: 1 }}
            ></Box>
          </CardContent>
        </Box>
      </Box>
    </>
  );
};
export default Shimmer;
