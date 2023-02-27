import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { activeCharacterIdAtom, activePageAtom } from "../api/atoms";
import useGetComics from "../api/useGetComics";
import { colors } from "../theme/colors";
import Comics from "./Comics";
import MarvelButton from "./MarvelButton";

const fallbackCharacterId = 1011334;
const limit = 4;

export default function ComicsGrid() {
  const [activePage, setActivePage] = useAtom(activePageAtom);
  const [activeCharacterId] = useAtom(activeCharacterIdAtom);
  const characterId = activeCharacterId || fallbackCharacterId;

  const { isLoading, error, data } = useGetComics({
    limit,
    characterId,
    activePage,
  });

  const comicsList = data?.data.results;

  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="subtitle1" sx={{ color: colors.primary }}>
        Error occured while trying to fetch data
      </Typography>
    );
  }

  if (!comicsList || comicsList.length < 1)
    return (
      <Typography variant="subtitle1" sx={{ color: colors.white }}>
        No comics were found for current character
      </Typography>
    );

  const nextPageExists = data.data.total > (activePage + 1) * limit;

  return (
    <div>
      <Grid container rowSpacing={4} spacing={2}>
        {comicsList.map((comics) => (
          <Grid key={comics.id} item xs={12} lg={6}>
            <Comics comics={comics} />
          </Grid>
        ))}
      </Grid>

      <div
        style={{ display: "flex", justifyContent: "center", margin: "32px 0" }}
      >
        <MarvelButton
          testId="prevBtn"
          disabled={activePage < 1}
          onClick={goToPrev}
          variant="secondary"
          direction="left"
          label="Prev"
        />

        <MarvelButton
          testId="nextBtn"
          disabled={!nextPageExists}
          onClick={goToNext}
          style={{ marginLeft: 8 }}
          variant="secondary"
          direction="right"
          label="Next"
        />
      </div>
    </div>
  );

  function goToPrev() {
    if (activePage > 0) setActivePage(activePage - 1);
  }

  function goToNext() {
    setActivePage(activePage + 1);
  }
}
