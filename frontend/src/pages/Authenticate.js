import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import InputAdornments from '../components/InputAdornments/InputAdornments'
import logo from '../images/logo_dev_transparent.png'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },

  heading: {
    fontSize: '4.5em',
    letterSpacing: '-1px',
    backgroundColor: '#503e9d',
    color: 'white',
  },
}))

export default function Authenticate(props) {
  const classes = useStyles()
  const { access } = props

  return (
    <>
      <Grid container justify='center' style={{ marginTop: '-10px' }}>
        <Grid item xs={12}>
          <Typography variant='h3' align='center' className={classes.heading}>
            {' '}
            Developer Mode
          </Typography>
        </Grid>
      </Grid>
      <Container component='main' maxWidth='xs'>
        <div className={classes.paper}>
          <img
            src={logo}
            style={{ width: '100%', height: 'auto' }}
            alt='team logo'
          />

          <Typography variant='h6'>
            Please Sign In To Access Developer Mode
          </Typography>
          <InputAdornments access={access} />
        </div>
      </Container>
    </>
  )
}
