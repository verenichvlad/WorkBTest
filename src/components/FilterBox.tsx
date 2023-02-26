import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "react-query";
import useMarvelQueries from "../api/useMarvelQueries";
import { colors } from "../theme/colors";

const limitOfCharacters = 10;

export default function FilterBox() {
  const { fetchCharacters } = useMarvelQueries();

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
        {characters.map((character) => (
          <Box
            key={character.id}
            component="button"
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
}
