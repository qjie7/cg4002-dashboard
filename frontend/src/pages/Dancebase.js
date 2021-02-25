import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import VideoCarousel from '../components/VideoCarousel/VideoCarousel'

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: '4.5em',
    letterSpacing: '-1px',
    backgroundColor: '#503e9d',
    color: 'white',
  },
}))

function Dancebase() {
  const classes = useStyles()
  return (
    <Grid container justify='center' style={{ marginTop: '-10px' }}>
      <Grid item xs={12}>
        <Typography variant='h3' align='center' className={classes.heading}>
          {' '}
          Dance Base
        </Typography>
        <VideoCarousel />
      </Grid>
    </Grid>
  )
}

export default Dancebase
