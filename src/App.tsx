import { CssBaseline, ThemeProvider, Container } from '@mui/material'
import { theme } from './theme/theme'
import Welcome from './components/Welcome/Welcome';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Welcome />
      </Container>
    </ThemeProvider>
  )
}

export default App
