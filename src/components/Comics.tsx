import { Grid, Typography, Box } from "@mui/material";
import { Comics as ComicsT } from "../api/useMarvelQueries";

import MarvelButton from "./MarvelButton";
import noImage from "../assets/noImage.jpeg";
import { colors } from "../theme/colors";
import { useAtom } from "jotai";
import { readingListAtom } from "../api/atoms";

export default function Comics(props: ComicsProps) {
  const { comics } = props;
  const [readingList, setReadingList] = useAtom(readingListAtom);

  const { path, extension } = comics.images[0] || {};
  const img = path ? `${path}.${extension}` : noImage;

  return (
    <Grid container spacing={2} sx={{ alignItems: "flex-start" }}>
      <Grid item xs={12} sm={6} sx={{ position: "relative" }}>
        <img
          src={img}
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
          <MarvelButton
            onClick={handleAddToReadingList}
            variant="primary"
            label="Add"
          />
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

    return publishDate
      ? new Date(publishDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "";
  }

  function handleAddToReadingList() {
    const itemAlreadyInReadingList = readingList.find(
      (readingListEntry) => readingListEntry.id === comics.id
    );

    if (itemAlreadyInReadingList) return;

    const { id, title } = comics;

    setReadingList([...readingList, { id, title, img }]);
  }
}

type ComicsProps = {
  comics: ComicsT;
};
