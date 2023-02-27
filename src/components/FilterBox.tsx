import { useAtom } from "jotai";
import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "react-query";
import useMarvelQueries from "../api/useMarvelQueries";
import { colors } from "../theme/colors";
import { activeCharacterIdAtom, activePageAtom } from "../api/atoms";

const limitOfCharacters = 10;

export default function FilterBox() {
  const { fetchCharacters } = useMarvelQueries();
  const [, setActiveCharacterId] = useAtom(activeCharacterIdAtom);
  const [, setActivePage] = useAtom(activePageAtom);

  const { isLoading, error, data } = useQuery(
    ["fetchCharacters"],
    fetchCharacters.bind(null, { limit: limitOfCharacters })
  );

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

  const characters = data?.data.results || [];

  return (
    <Box
      sx={{
        background: colors.neutral30,
        p: "24px",
        borderRadius: "16px",
        mb: "40px",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{ color: colors.neutral70, mb: "8px" }}
      >
        Filter by character:
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: "8px 32px",
          flexWrap: "wrap",
        }}
      >
        {characters.length < 1 && (
          <Typography variant="subtitle1" sx={{ color: colors.white }}>
            No characters were found
          </Typography>
        )}

        {characters.map((character) => (
          <Box
            key={character.id}
            component="button"
            onClick={handleCharacterFilterSelection.bind(null, character.id)}
            sx={{
              all: "unset",

              "&:hover": {
                cursor: "pointer",
                textDecoration: "underline",
              },
              "&:focus": {
                textDecoration: "underline",
              },
            }}
          >
            <Typography variant="body1">{character.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );

  function handleCharacterFilterSelection(characterId: number) {
    setActiveCharacterId(characterId);
    setActivePage(0);
  }
}
