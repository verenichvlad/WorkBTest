import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    background: {
      default: '#000',
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        'root': {
          color: '#FFF',
        },
      },
    },
  },
});