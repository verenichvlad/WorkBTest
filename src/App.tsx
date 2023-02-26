import { CssBaseline, ThemeProvider, Container } from "@mui/material";
import { QueryClientProvider, QueryClient } from "react-query";
import ComicsGrid from "./components/ComicsGrid";
import FilterBox from "./components/FilterBox";
import Header from "./components/Header";
import MarvelButton from "./components/MarvelButton";
import Navigation from "./components/Navigation";
import { theme } from "./theme/theme";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />

        <Header />

        <Container>
          <Navigation />
          <FilterBox />
          <ComicsGrid />
        </Container>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
