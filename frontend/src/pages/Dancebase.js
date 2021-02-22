import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import MediaCard from '../components/MediaCard/MediaCard'
import SearchBar from '../components/SearchBar/SearchBar'
import VideoCarousel from '../components/VideoCarousel/VideoCarousel'

function Dancebase() {
  return (
    <Grid container justify='center'>
      <Grid item xs={12}>
        <Typography variant='h3' align='center'>
          {' '}
          Dance Base
        </Typography>
        <VideoCarousel />
      </Grid>
    </Grid>
  )
}

export default Dancebase
