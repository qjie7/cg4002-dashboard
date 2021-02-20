import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import MediaCard from '../components/MediaCard/MediaCard'
import SearchBar from '../components/SearchBar/SearchBar'
import VideoCarousel from '../components/VideoCarousel/VideoCarousel'

function Dancebase() {
  return (
    <Grid container justify='center'>
      {/* <Grid item>
        <SearchBar />
      </Grid> */}

      {/* <Grid item container justify='center' spacing={5}>
        <Grid item xs={3} style={{ textAlign: 'center' }}>
          <MediaCard />
        </Grid>
      </Grid> */}

      {/* <Grid item xs={12} style={{ textAlign: 'center' }}>
        <MediaCard />
      </Grid> */}

      <Grid item xs={12}>
        <Typography variant='h3' align='center'>
          {' '}
          Available Dance Moves
        </Typography>
        <VideoCarousel />
      </Grid>
    </Grid>
  )
}

export default Dancebase
