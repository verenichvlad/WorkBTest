import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import ReadingListSvg from "../assets/ReadingList.svg";

export default function Navigation() {
  const items = 0;

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: "24px" }}>
      <Typography variant="h1">Comics</Typography>

      <Box
        component="button"
        sx={{
          all: "unset",
          gap: "8px",
          display: "flex",
          alignItems: "center",

          "&:hover": {
            cursor: "pointer",
            textDecoration: "underline",
          },
          "&:focus": {
            textDecoration: "underline",
          },
        }}
      >
        <img src={ReadingListSvg} alt="Reading List" />

        <Typography
          variant="body1"
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          Reading List
        </Typography>

        <Typography variant="body1">({items})</Typography>
      </Box>
    </Box>
  );
}
