import globalMuiStyles from "../../../utils/global.styles";

export const shimmerStyle = {
  restauBox: {
    ...globalMuiStyles.pageContainer,
    flexWrap: "wrap",
    gap: "14px",
    mt: 2,
    mr: 1,
  },
  restauBtn: {
    height: 30,
    width: 80,

    ml: 3,
  },
  restauChip: { ml: 2, mt: 2, backgroundColor: "lightgray", width: 100 },
  restauCardBox: {
    ...globalMuiStyles.pageContainer,
    ...globalMuiStyles.display,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  restauCardBox2: {
    width: 270,
    borderRadius: 3,
    border: "none",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(0.97)",
      transformOrigin: "top bottom",
    },
    marginRight: 0.5,
    mt: 5,
    ml: 4,
    backgroundColor: "lightgrey",
  },
  restauCardImg: {
    width: "100%",
    height: 180,
    objectFit: "cover",
    borderRadius: 12,
  },
  restauCardContent: { paddingTop: "1px", mt: 0, height: 80 },
};
