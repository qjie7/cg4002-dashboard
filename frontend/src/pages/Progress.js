import React from 'react'
import { Card, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PieChart from '../components/PieChart/PieChart'
import OutlinedCard from '../components/OutlinedCard/OutlinedCard'
import LineChart from '../components/LineChart/LineChart'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 120,
  },
  heading: {
    fontSize: '4.5em',
    letterSpacing: '-1px',
    backgroundColor: '#503e9d',
    color: 'white',
  },
})

function Progress() {
  const classes = useStyles()
  return (
    <>
      <Grid container justify='center' style={{ marginTop: '-10px' }}>
        <Grid item xs={12}>
          <Typography variant='h3' align='center' className={classes.heading}>
            {' '}
            Dance Ground
          </Typography>
        </Grid>
      </Grid>
      <Grid container direction='column'>
        <Grid container item>
          <Grid item xs={6}>
            <PieChart />
          </Grid>

          <Grid item xs={6} className={classes.root}>
            <OutlinedCard title='Total Games' count='12' />
            <OutlinedCard title='Total Dance Moves' count='111' />
          </Grid>
        </Grid>
        <Grid item>
          <LineChart />
        </Grid>
      </Grid>
    </>
  )
}

export default Progress
