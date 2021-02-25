import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Cartoon from '../components/Cartoon/Cartoon'

const useStyles = makeStyles((theme) => ({
  root: {},
  heading: {
    fontSize: '4.5em',
    letterSpacing: '-1px',
    backgroundColor: '#503e9d',
    color: 'white',
  },
  cartoon: {
    marginTop: '100px',
  },
}))

function Home() {
  const classes = useStyles()

  return (
    <>
      <Grid container justify='center' style={{ marginTop: '-10px' }}>
        <Grid item xs={12}>
          <Typography variant='h3' align='center' className={classes.heading}>
            {' '}
            Welcome to Dance Dance
          </Typography>
        </Grid>
      </Grid>

      <Grid container justify='center' className={classes.cartoon}>
        <Cartoon />
      </Grid>

      <Grid container justify='center'>
        <Grid item></Grid>
      </Grid>
    </>
  )
}

export default Home
