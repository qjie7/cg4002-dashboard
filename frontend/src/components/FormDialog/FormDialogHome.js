import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Link } from 'react-router-dom'
export default function FormDialog(props) {
  function handleGroupNameChange(e) {
    console.log(e.target.value)
    localStorage.setItem('groupName', e.target.value)
    localStorage.removeItem('oneScore')
    localStorage.removeItem('twoScore')
    localStorage.removeItem('threeScore')
    localStorage.removeItem('fourScore')
    localStorage.removeItem('fiveScore')
    localStorage.removeItem('sixScore')
    localStorage.removeItem('sevenScore')
    localStorage.removeItem('eightScore')
    localStorage.removeItem('nineScore')
    localStorage.removeItem('tenScore')
    localStorage.setItem('accuracyDatas', '[0]')
    localStorage.setItem('syncDatas', '[0]')
    localStorage.setItem('time', '[0]')
  }
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>
          Hello! Welcome to Dance Dance!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{`My name is Michael Lexson.`}</DialogContentText>

          <DialogContentText>
            {`I guess you are here to improve your group dance performance? `}
          </DialogContentText>

          <DialogContentText>
            {`Alright! Before you start, why not let me know your dance group name if you have yet to do so :D`}
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Group Name'
            type='text'
            fullWidth
            onChange={handleGroupNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color='primary'>
            Cancel
          </Button>
          <Link to='/playground'>
            <Button onClick={props.handleClose} color='primary'>
              Confirm
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  )
}
