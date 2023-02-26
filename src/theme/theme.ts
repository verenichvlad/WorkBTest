import { createTheme } from "@mui/material";
import { colors } from "./colors";

export const theme = createTheme({
  typography: {
    fontFamily: ["Roboto Condensed", "Roboto", "Arial"].join(","),

    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
  },
  palette: {
    background: {
      default: "#000",
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          color: "#FFF",
        },
      },
    },
  },
});

const hProps = {
  lineHeight: 1.4,
  fontWeight: 700,
  fontFamily: "Roboto Condensed",
};

const bProps = {
  lineHeight: 1.5,
  fontFamily: "Roboto",
};

theme.typography.h1 = {
  ...hProps,

  fontSize: "28px",

  [theme.breakpoints.up("lg")]: {
    fontSize: "44px",
  },
};

theme.typography.h2 = {
  ...hProps,

  fontSize: "26px",

  [theme.breakpoints.up("lg")]: {
    fontSize: "37px",
  },
};

theme.typography.h3 = {
  ...hProps,

  fontSize: "22px",

  [theme.breakpoints.up("lg")]: {
    fontSize: "31px",
  },
};

theme.typography.h4 = {
  ...hProps,

  fontSize: "20px",

  [theme.breakpoints.up("lg")]: {
    fontSize: "25px",
  },
};

theme.typography.h5 = {
  ...hProps,

  fontSize: "18px",

  [theme.breakpoints.up("lg")]: {
    fontSize: "21px",
  },
};

theme.typography.h6 = {
  ...hProps,

  fontSize: "16px",

  [theme.breakpoints.up("lg")]: {
    fontSize: "18px",
  },
};

theme.typography.subtitle1 = {
  ...hProps,

  fontSize: "16px",

  [theme.breakpoints.up("lg")]: {
    fontSize: "18px",
  },
};

theme.typography.subtitle2 = {
  ...hProps,

  fontSize: "14px",

  [theme.breakpoints.up("lg")]: {
    fontSize: "14px",
  },
};

theme.typography.body1 = {
  ...bProps,

  fontSize: "16px",

  [theme.breakpoints.up("lg")]: {
    fontSize: "18px",
  },
};

theme.typography.body2 = {
  ...bProps,

  fontSize: "14px",

  [theme.breakpoints.up("lg")]: {
    fontSize: "14px",
  },
};
