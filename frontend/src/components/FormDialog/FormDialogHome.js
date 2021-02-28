import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Typography } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
export default function FormDialog(props) {
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const [leaderName, setLeader] = useState('Leader')
  // const [member1, setMember1] = useState({ name: 'Member 1' })
  // const [member2, setMember2] = useState({ name: 'Member 2' })
  function handleGroupNameChange(e) {
    // setLeader(e.target.value)
    console.log(e.target.value)
    localStorage.setItem('groupName', e.target.value)
  }
  // function handleLeaderEmailChange(e) {
  //   // setLeader(e.target.value)
  //   console.log(e.target.value)
  //   localStorage.setItem('leaderEmail', e.target.value)
  // }

  // function handleNameChange(e) {
  //   // setLeader(e.target.value)
  //   console.log(e.target.value)
  //   localStorage.setItem('leaderName', e.target.value)
  // }

  // function handleLeaderNameChange(e) {
  //   // setLeader(e.target.value)
  //   console.log(e.target.value)
  //   localStorage.setItem('leaderName', e.target.value)
  // }

  // function handleMember1NameChange(e) {
  //   // setLeader(e.target.value)
  //   console.log(e.target.value)
  //   localStorage.setItem('member1Name', e.target.value)
  // }

  // function handleMember2NameChange(e) {
  //   // setLeader(e.target.value)
  //   console.log(e.target.value)
  //   localStorage.setItem('member2Name', e.target.value)
  // }

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
          {/* <Typography>Group Leader</Typography> */}
          {/* <TextField
            autoFocus
            margin='dense'
            id='email'
            label='Email'
            type='email'
            fullWidth
            onChange={handleLeaderEmailChange}
          /> */}
          {/* <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Name'
            type='text'
            fullWidth
            // onChange={handleLeaderNameChange}
            onChange={props.handleNameChange}
          />
          <Typography>Member 1</Typography>

          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Name'
            type='text'
            fullWidth
            onChange={handleMember1NameChange}
          />
          <Typography>Member 2</Typography>

          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Name'
            type='text'
            fullWidth
            onChange={handleMember2NameChange}
          /> */}
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
