import { Box, Typography } from '@mui/material'
import image from '../../assets/image.svg'

const Welcome = () => {
  return (
    <Box sx={{ backgroundColor: 'grey' }}>
      <img src={image} alt="logo" />
      <Typography variant="h2">Front End Technical Test</Typography>
    </Box>
  )
}

export default Welcome
