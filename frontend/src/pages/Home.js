import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Cartoon from '../components/Cartoon/Cartoon'
import SpeechBubble from '../components/SpeechBubble/SpeechBubble'

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
      <div class='bg'></div>
      <div class='bg bg2'></div>
      <div class='bg bg3'></div>

      <Grid container justify='center' style={{ marginTop: '-10px' }}>
        <Grid item xs={12}>
          <Typography variant='h3' align='center' className={classes.heading}>
            {' '}
            Welcome to Dance Dance
          </Typography>
        </Grid>
      </Grid>

      <Grid container justify='center'>
        <Grid item>
          <SpeechBubble type='h1' message='Click me!' />
        </Grid>
      </Grid>
      <Grid container justify='center' className={classes.cartoon}>
        <Cartoon />
      </Grid>
    </>
  )
}

export default Home
