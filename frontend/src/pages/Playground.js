import React from 'react'
import DancerCard from '../components/DancerCard/DancerCard'
import { Grid, Typography } from '@material-ui/core'
import RadioButtonsGroup from '../components/RadioButtonsGroup/RadioButtonsGroup'
import StartButton from '../components/Button/StartButton'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { makeStyles } from '@material-ui/core/styles'
import FlipMove from 'react-flip-move'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import Button from '@material-ui/core/Button'
import BasicTable from '../components/BasicTable/BasicTable'
import Snackbar from '@material-ui/core/Snackbar'
import classNames from 'classnames'
import styled from 'styled-components'
import { Modal } from '../components/Modal/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormDialog from '../components/FormDialog/FormDialog'
import Switch from 'react-switch'
import axios from 'axios'
import Scoreboard from '../components/Scoreboard/Scoreboard'
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

  // const [correctness, setCorrectness] = useState(false)

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
      // console.log(accuracyAvg)
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
    // setLeader(e.target.value)
    console.log(e.target.value)
    localStorage.setItem('leaderName', e.target.value)
  }

  function handleMember1NameChange(e) {
    // setLeader(e.target.value)
    console.log(e.target.value)
    localStorage.setItem('member1Name', e.target.value)
  }

  function handleMember2NameChange(e) {
    // setLeader(e.target.value)
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

  const [checked, setChecked] = useState(true)
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

  // function handleChange() {
  //   // axios
  //   //   .post('/api/connection', { checked })
  //   //   .then((response) => {
  //   //     console.log(response.data)
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log(error)
  //   //   })
  //   setChecked((prevChecked) => !checked)
  //   // if (checked) {
  //   //   socket.connect()
  //   //   console.log('connect')
  //   // } else {
  //   //   socket.close()
  //   //   console.log('disconnect')
  //   // }
  //   // console.log(checked)
  // }

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

      // socket.on('test_log', (newData) => {
      //   setTestLog(newData)
      // })

      // socket.on('new_data', (newData) => {
      //   setDanceMove(newData.danceMove)
      //   setPosition(newData.position)
      // })
      // socket.on('new_data', (newData) => {
      //   setDanceMove(newData.danceMove)
      //   setPosition(newData.position)
      // })
    } else {
      // if (!checked) {
      //   socket.disconnect()
      // } else {
      //   socket.off('new_data')
      // }
      // socket.off('new_data')
      socket.off('new_data')

      // socket.disconnect('new_data')
    }
  }, [connection])
  // console.log(accuracyList)
  // }, [connection, checked])

  // useEffect(() => {
  //   if (!checked && !connection) {
  //     socket.off('new_data')

  //     // socket.on('test_log', (newData) => {
  //     //   setTestLog(newData)
  //     // })

  //     // socket.on('new_data', (newData) => {
  //     //   setDanceMove(newData.danceMove)
  //     //   setPosition(newData.position)
  //     // })
  //     // socket.on('new_data', (newData) => {
  //     //   setDanceMove(newData.danceMove)
  //     //   setPosition(newData.position)
  //     // })
  //   } else if (checked && connection) {
  //     socket.on('new_data', (newData) => {
  //       setDanceMove(newData.danceMove)
  //       setPosition(newData.position)
  //     })
  //   } else if (checked && !connection) {
  //     socket.off('new_data')
  //   } else if (!checked) {
  //     // socket.off('new_data')
  //     //socket.off('new_data')
  //     socket.disconnect('new_data')
  //   }
  // }, [connection])

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
      // if (!connection) {
      //   setScore(0)
      // }
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
        {/* <Grid item onClick={handleClickOpen}> */}
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

        {/* <Grid item onClick={handleClickOpen2}> */}
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

        {/* <Grid item onClick={handleClickOpen3}> */}
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
          {/* <Scoreboard /> */}
          <Button
            variant='contained'
            color='secondary'
            onClick={handleConnection}
            className={classes.margin}
          >
            {connection ? <p>END</p> : <p>START</p>}
          </Button>
          {/* <Switch type='submit' onChange={handleChange} checked={checked} /> */}

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
