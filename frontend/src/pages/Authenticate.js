// import React from 'react'
// import { Grid, Typography, Button } from '@material-ui/core'
// import InputAdornments from '../components/InputAdornments/InputAdornments'
// import { makeStyles } from '@material-ui/core/styles'
// const useStyles = makeStyles((theme) => ({
//   heading: {
//     fontSize: '4.5em',
//     letterSpacing: '-1px',
//     backgroundColor: '#503e9d',
//     color: 'white',
//   },
// }))
// function Authenticate(props) {
//   const { access } = props
//   const classes = useStyles()

//   return (
//     <>
//       {/* <Grid container justify='center'>
//         <Grid item xs={12}>
//           <Typography variant='h3' align='center' className={classes.heading}>
//             {' '}
//             Developer Mode
//           </Typography>
//         </Grid>
//       </Grid>
//       <Grid container justify='center' style={{ marginTop: '25vh' }}>
//         <Grid item xs={12}>
//           <Typography variant='h4' align='center'>
//             In order to access Developer Mode, please enter the developer
//             password.
//           </Typography>

//           <InputAdornments access={access} />
//         </Grid>
//       </Grid> */}
//     </>
//   )
// }

// export default Authenticate

import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
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
          <img src={logo} style={{ width: '100%', height: 'auto' }} />

          <Typography variant='h6'>
            Please Sign In To Access Developer Mode
          </Typography>
          <InputAdornments access={access} />
        </div>
      </Container>
    </>
  )
}
