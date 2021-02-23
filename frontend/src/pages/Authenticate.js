import React from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import InputAdornments from '../components/InputAdornments/InputAdornments'

function Authenticate(props) {
  const { access } = props
  return (
    <Grid container justify='center' style={{ marginTop: '35vh' }}>
      <Grid item xs={12}>
        <Typography variant='h4' align='center'>
          In order to access Developer Mode, please enter the developer
          password.
        </Typography>

        <InputAdornments access={access} />
      </Grid>
    </Grid>
  )
}

export default Authenticate
