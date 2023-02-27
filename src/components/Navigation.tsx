import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAtom } from "jotai";
import { useState } from "react";
import { readingListAtom } from "../api/atoms";

import ReadingListSvg from "../assets/ReadingList.svg";
import ReadingList from "./ReadingList";

export default function Navigation() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [readingList] = useAtom(readingListAtom);

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mb: "24px" }}
      >
        <Typography variant="h1">Comics</Typography>

        <Box
          component="button"
          onClick={setIsDrawerOpen.bind(null, !isDrawerOpen)}
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

          <Typography variant="body1">({readingList.length})</Typography>
        </Box>
      </Box>

      <ReadingList
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </>
  );
}
