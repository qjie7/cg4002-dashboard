import React from 'react'
import { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Backdrop from '@material-ui/core/Backdrop'

import io from 'socket.io-client'
import styled from 'styled-components'

import { Modal } from '../components/Modal/Modal'
import FormDialog from '../components/FormDialog/FormDialog'
import DancerCard from '../components/DancerCard/DancerCard'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    paddingRight: 33,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  heading: {
    fontSize: '4.5em',
    letterSpacing: '-1px',
    backgroundColor: '#503e9d',
    top: '0px',
    color: 'white',
  },
}))

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50px;
  bottom: 50px;
`

const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling'],
})

function Playground() {
  const classes = useStyles()
  const [danceMove, setDanceMove] = useState('Dab')
  const [position, setPosition] = useState([1, 2, 3])
  const [accuracy, setAccuracy] = useState(0)
  const [accuracyAvg, setAccuracyAvg] = useState(0)
  const [sync, setSync] = useState(0)
  const [syncAvg, setSyncAvg] = useState(0)

  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal((prev) => !prev)
  }
  const [connection, setConnection] = useState(false)

  const handleConnection = () => {
    if (connection) {
      const accuracySum = accuracyList.reduce((a, b) => a + b, 0)
      const accuracyAvg = accuracySum / accuracyList.length || 0
      setAccuracyAvg(accuracyAvg)

      const syncSum = syncList.reduce((a, b) => a + b, 0)
      const syncAvg = syncSum / syncList.length || 0
      setSyncAvg(syncAvg)
    }
    connection ? setConnection(false) : setConnection(true)
    connection ? setShowModal(true) : setShowModal(false)
  }

  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [open2, setOpen2] = React.useState(false)
  const handleClickOpen2 = () => {
    setOpen2(true)
  }
  const handleClose2 = () => {
    setOpen2(false)
  }

  const [open3, setOpen3] = React.useState(false)
  const handleClickOpen3 = () => {
    setOpen3(true)
  }
  const handleClose3 = () => {
    setOpen3(false)
  }

  function handleLeaderNameChange(e) {
    console.log(e.target.value)
    localStorage.setItem('leaderName', e.target.value)
  }

  function handleMember1NameChange(e) {
    console.log(e.target.value)
    localStorage.setItem('member1Name', e.target.value)
  }

  function handleMember2NameChange(e) {
    console.log(e.target.value)
    localStorage.setItem('member2Name', e.target.value)
  }

  const [groupName, setGroupName] = useState('Group Name')
  const [leaderName, setLeaderName] = useState('Leader Name')
  const [member1Name, setMember1Name] = useState('Member 1 Name')
  const [member2Name, setMember2Name] = useState('Member 2 Name')

  useEffect(() => {
    setGroupName(localStorage.getItem('groupName'))
    setLeaderName(localStorage.getItem('leaderName'))
    setMember1Name(localStorage.getItem('member1Name'))
    setMember2Name(localStorage.getItem('member2Name'))
  })

  const [score, setScore] = useState(0)
  const [testLog, setTestLog] = useState({
    danceMove: 'Dab',
    position1: 1,
    position2: 2,
    position3: 3,
  })
  const [correctness, setCorrectness] = useState(false)

  const [accuracyList, setAccuracyList] = useState([])
  const [syncList, setSyncList] = useState([])

  useEffect(() => {
    if (connection) {
      // socket.connect()
      // if (connection && checked) {
      socket.on('new_data', (newData) => {
        setDanceMove(newData.danceMove)
        setPosition(newData.position)
        setAccuracy(newData.accuracy)
        setAccuracyList((oldList) => [...oldList, newData.accuracy])
        setSync(newData.sync)
        setSyncList((oldList) => [...oldList, newData.sync])
      })
      socket.on('test_log', (newData) => {
        setTestLog(newData)
      })
    } else {
      socket.off('new_data')
      socket.off('test_log')
    }
  }, [connection])

  useEffect(() => {
    if (
      // position1 === testLog.position1 &&
      // position2 === testLog.position2 &&
      // position3 === testLog.position3 &&
      danceMove === testLog.danceMove
    ) {
      setCorrectness(true)
      if (score < 10) {
        setScore((prevScore) => prevScore + 1)
      }

      console.log(score)
    } else {
      setCorrectness(false)
    }
  }, [danceMove])

  return (
    <>
      <FormDialog
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
        handleNameChange={handleMember1NameChange}
      />

      <FormDialog
        handleClickOpen={handleClickOpen2}
        handleClose={handleClose2}
        open={open2}
        setOpen={setOpen2}
        handleNameChange={handleLeaderNameChange}
      />

      <FormDialog
        handleClickOpen={handleClickOpen3}
        handleClose={handleClose3}
        open={open3}
        setOpen={setOpen3}
        handleNameChange={handleMember2NameChange}
      />
      <Grid container justify='center' style={{ marginTop: '-10px' }}>
        <Grid item xs={12}>
          <Typography variant='h3' align='center' className={classes.heading}>
            {groupName}
          </Typography>
        </Grid>
      </Grid>

      <Grid container justify='center'>
        <Grid item>
          <DancerCard
            name={member1Name}
            position={position[0]}
            userImage='6CgkUjUl4og'
            danceMove={danceMove}
            handleClickOpen={handleClickOpen}
            accuracy={accuracy}
            sync={sync}
          />
        </Grid>

        <Grid item>
          <DancerCard
            name={leaderName}
            position={position[1]}
            userImage='sibVwORYqs0'
            danceMove={danceMove}
            role='Leader'
            handleClickOpen={handleClickOpen2}
            accuracy={accuracy}
            sync={sync}
          />
        </Grid>

        <Grid item>
          <DancerCard
            name={member2Name}
            position={position[2]}
            userImage='d2MSDujJl2g'
            danceMove={danceMove}
            role='Member 2'
            handleClickOpen={handleClickOpen3}
            accuracy={accuracy}
            sync={sync}
          />
        </Grid>
      </Grid>

      <Grid container justify='center'>
        <Grid item>
          <Button
            variant='contained'
            color='secondary'
            onClick={handleConnection}
            className={classes.margin}
          >
            {connection ? <p>END</p> : <p>START</p>}
          </Button>

          <Container>
            <Modal
              showModal={showModal}
              setShowModal={setShowModal}
              score={score}
              setScore={setScore}
              setAccuracyList={setAccuracyList}
              accuracyList={accuracyList}
              accuracyAvg={accuracyAvg}
              setSyncList={setSyncList}
              syncList={syncList}
              syncAvg={syncAvg}
            />
          </Container>
          <Backdrop
            className={classes.backdrop}
            open={connection ? !socket.connected : false}
          >
            <CircularProgress color='inherit' />
          </Backdrop>
        </Grid>
      </Grid>
    </>
  )
}

export default Playground
