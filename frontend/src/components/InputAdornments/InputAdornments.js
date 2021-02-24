import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import FilledInput from '@material-ui/core/FilledInput'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar'

import MuiAlert from '@material-ui/lab/Alert'
import CustomizedSnackbars from '../CustomizedSnackbars/CustomizedSnackbars'
function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '10px',
  },
  margin: {
    margin: theme.spacing(1),
    paddingRight: 33,
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '70ch',
    marginLeft: '60px',
  },
  button: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  alert: {
    width: '100%',
    marginLeft: '120px',
  },
}))

export default function InputAdornments(props) {
  const classes = useStyles()

  const { access } = props
  const [values, setValues] = React.useState({
    password: '',

    showPassword: false,
  })

  const [accessStatus, setAccessStatus] = React.useState(true)

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setAccessStatus(true)
  }

  function handleSubmit(event) {
    // event.preventDefault()
    // console.log('Password: ', values.password)

    // ..code to submit form to backend here...
    axios
      .post('/authenticate/password', values)
      .then((response) => {
        access(response.data)
        setAccessStatus(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <div className={classes.root}>
        <div>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant='outlined'
          >
            <InputLabel htmlFor='outlined-adornment-password'>
              Enter your developer password here
            </InputLabel>
            <OutlinedInput
              fullWidth
              id='outlined-adornment-password'
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={260}
            />
          </FormControl>
          {/* <input type='hidden' name='password' value={values.password}></input> */}
        </div>
      </div>
      <div style={{ textAlign: 'center' }} className={classes.button}>
        <Button
          variant='contained'
          color='secondary'
          className={classes.margin}
          onClick={handleSubmit}
          type='submit'
        >
          Request For Access
        </Button>

        <Snackbar
          open={!accessStatus}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity='error'
            className={classes.alert}
          >
            Wrong Password!
          </Alert>
        </Snackbar>
      </div>
    </>
  )
}
