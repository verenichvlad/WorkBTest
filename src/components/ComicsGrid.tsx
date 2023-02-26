import { Box, CircularProgress, Grid } from "@mui/material";
import { useAtom } from "jotai";
import { useState } from "react";
import { useQuery } from "react-query";
import { activeCharacterIdAtom, activePageAtom } from "../api/atoms";
import useMarvelQueries from "../api/useMarvelQueries";
import Comics from "./Comics";
import MarvelButton from "./MarvelButton";

const fallbackCharacterId = 1011334;
const limit = 4;

export default function ComicsGrid() {
  const { fetchComics } = useMarvelQueries();
  const [activePage, setActivePage] = useAtom(activePageAtom);
  const [activeCharacterId] = useAtom(activeCharacterIdAtom);
  const characterId = activeCharacterId || fallbackCharacterId;

  const { isLoading, error, data } = useQuery(
    ["fetchComics", characterId, activePage],
    fetchComics.bind(null, { limit, activePage, characterId })
  );

  const comicsList = data?.data.results;

  if (isLoading) {
    return (
      <Box sx={{ textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!comicsList) return null;

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
          onClick={goToPrev}
          variant="secondary"
          direction="left"
          label="Prev"
          size="xs-lg"
        />

        {nextPageExists && (
          <MarvelButton
            onClick={goToNext}
            style={{ marginLeft: 8 }}
            variant="secondary"
            direction="right"
            label="Next"
            size="xs-lg"
          />
        )}
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
