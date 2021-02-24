import React from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import InputAdornments from '../components/InputAdornments/InputAdornments'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: '4.5em',
    letterSpacing: '-1px',
    backgroundColor: '#503e9d',
    color: 'white',
  },
}))
function Authenticate(props) {
  const { access } = props
  const classes = useStyles()

  return (
    <>
      <Grid container justify='center'>
        <Grid item xs={12}>
          <Typography variant='h3' align='center' className={classes.heading}>
            {' '}
            Developer Mode
          </Typography>
        </Grid>
      </Grid>
      <Grid container justify='center' style={{ marginTop: '25vh' }}>
        <Grid item xs={12}>
          <Typography variant='h4' align='center'>
            In order to access Developer Mode, please enter the developer
            password.
          </Typography>

          <InputAdornments access={access} />
        </Grid>
      </Grid>
    </>
  )
}

export default Authenticate
