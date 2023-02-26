import { Grid, Typography, Box } from "@mui/material";
import { Comics as ComicsT } from "../api/useMarvelQueries";

import MarvelButton from "./MarvelButton";
import noImage from "../assets/noImage.jpeg";
import { colors } from "../theme/colors";

export default function Comics(props: ComicsProps) {
  const { comics } = props;
  const { path, extension } = comics.images[0] || {};

  return (
    <Grid container spacing={2} sx={{ alignItems: "flex-start" }}>
      <Grid item xs={12} sm={6} sx={{ position: "relative" }}>
        <img
          src={path ? `${path}.${extension}` : noImage}
          alt="Comics Image"
          style={{ width: "100%", height: "auto" }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: "16px",
            left: "50%",
            transform: "translate(-50%, 0)",
          }}
        >
          <MarvelButton variant="primary" size="xs-lg" label="Add" />
        </Box>
      </Grid>

      <Grid item xs={12} sm={6}>
        <div>
          <Typography variant="h3" sx={{ mb: "24px" }}>
            {comics.title}
          </Typography>

          <Typography variant="subtitle1">Published:</Typography>
          <Typography variant="body1" sx={{ mb: "24px" }}>
            {getFormattedDate()}
          </Typography>

          <Typography variant="subtitle1">Writer:</Typography>
          <Typography variant="body1" sx={{ mb: "24px" }}>
            {getWriters()}
          </Typography>

          <Typography variant="body2" sx={{ color: colors.neutral70 }}>
            {comics.description}
          </Typography>
        </div>
      </Grid>
    </Grid>
  );

  function getWriters() {
    const writers = comics.creators.items.filter(
      (writer) => writer.role === "writer"
    );

    const writerNames = writers.map((writer) => writer.name);

    return writerNames.join(", ");
  }

  function getFormattedDate() {
    const publishDate = comics.dates.find(
      (date) => date.type === "onsaleDate"
    )?.date;

    return publishDate ? new Date(publishDate).toLocaleDateString() : "";
  }
}

type ComicsProps = {
  comics: ComicsT;
};
