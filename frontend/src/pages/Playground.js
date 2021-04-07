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
  // const [danceMove, setDanceMove] = useState('Dab')
  // const [danceMove2, setDanceMove2] = useState('Dab')
  // const [danceMove3, setDanceMove3] = useState('Dab')
  const [finalDanceMove, setFinalDanceMove] = useState('nothing')
  const [finalPosition, setFinalPosition] = useState('1 2 3')
  // const [position, setPosition] = useState([1, 2, 3])
  // const [position2, setPosition2] = useState([1, 2, 3])
  // const [position3, setPosition3] = useState([1, 2, 3])
  const [accuracy, setAccuracy] = useState(0)
  // const [accuracy2, setAccuracy2] = useState(0)
  // const [accuracy3, setAccuracy3] = useState(0)
  // const [accuracyAvg, setAccuracyAvg] = useState(0)
  const [finalSync, setFinalSync] = useState('0')
  // const [sync, setSync] = useState(0)
  // const [sync2, setSync2] = useState(0)
  // const [sync3, setSync3] = useState(0)
  const [syncAvg, setSyncAvg] = useState(0)

  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal((prev) => !prev)
  }
  const [connection, setConnection] = useState(false)

  const handleConnection = () => {
    if (connection) {
      // const accuracySum = accuracyList.reduce((a, b) => a + b, 0)
      // const accuracyAvg = accuracySum / accuracyList.length || 0
      // setAccuracyAvg(accuracyAvg)

      const syncSum = syncListFloat.reduce((a, b) => a + b, 0)

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
  const [maxScore, setMaxScore] = useState(0)
  // const [testLog, setTestLog] = useState({
  //   danceMove: 'Dab',
  //   position1: 1,
  //   position2: 2,
  //   position3: 3,
  // })
  const [correctness, setCorrectness] = useState(false)

  // const [accuracyList, setAccuracyList] = useState([])
  const [syncList, setSyncList] = useState([])

  useEffect(() => {
    if (connection) {
      setAccuracy(0)
      setScore(0)
      setMaxScore(0)
      // socket.connect()
      // if (connection && checked) {
      // socket.on('new_data', (newData) => {
      //   // setDanceMove(newData.danceMove)
      //   // setPosition(newData.position)
      //   // setAccuracy(newData.accuracy)
      //   // setAccuracyList((oldList) => [...oldList, newData.accuracy])
      //   setSync(newData.sync)
      //   setSyncList((oldList) => [...oldList, newData.sync])
      // })

      // socket.on('new_data2', (newData) => {
      //   setDanceMove2(newData.danceMove)
      //   setPosition2(newData.position)
      //   // setAccuracy2(newData.accuracy)
      //   // setAccuracyList2((oldList) => [...oldList, newData.accuracy])
      //   setSync2(newData.sync)
      //   // setSyncList2((oldList) => [...oldList, newData.sync])
      // })

      // socket.on('new_data3', (newData) => {
      //   setDanceMove3(newData.danceMove)
      //   setPosition3(newData.position)
      //   // setAccuracy3(newData.accuracy)
      //   // setAccuracyList3((oldList) => [...oldList, newData.accuracy])
      //   setSync3(newData.sync)
      //   // setSyncList3((oldList) => [...oldList, newData.sync])
      // })

      socket.on('new_data4', (newData) => {
        setFinalDanceMove(newData.finalDanceMove)
        setFinalPosition(newData.finalPosition)
        setFinalSync(newData.finalSync)
        setSyncList((oldList) => [...oldList, newData.finalSync])
      })

      // socket.on('test_log', (newData) => {
      //   setTestLog(newData)
      // })
    } else {
      socket.off('new_data4')
      // socket.off('test_log')
    }
  }, [connection])

  // useEffect(() => {
  //   if (
  //     // position1 === testLog.position1 &&
  //     // position2 === testLog.position2 &&
  //     // position3 === testLog.position3 &&

  //     finalDanceMove === testLog.danceMove
  //   ) {
  //     setCorrectness(true)
  //     if (score < 10) {
  //       setScore((prevScore) => prevScore + 1)
  //     }

  //     console.log(score)
  //   } else {
  //     setCorrectness(false)
  //   }
  // }, [finalDanceMove])

  useEffect(() => {
    const handleKey = (event) => {
      if (event.keyCode === 16 && connection) {
        setCorrectness(true)
        setScore((prevScore) => prevScore + 1)
        setMaxScore((prevScore) => prevScore + 1)
      } else if (event.keyCode === 88 && connection) {
        setCorrectness(false)
        setMaxScore((prevScore) => prevScore + 1)
      }
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  })

  useEffect(() => {
    setAccuracy(maxScore === 0 ? 0 : (score * 100) / maxScore)
  })

  let syncListFloat = syncList.map(function (x) {
    return parseFloat(x, 10)
  })

  console.log(syncAvg)
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
        {/* Display Dancer Cards start here */}
        <Grid item>
          <DancerCard
            name={leaderName}
            position={finalPosition.substring(0, 1)}
            userImage='sibVwORYqs0'
            danceMove={finalDanceMove}
            role='Leader'
            handleClickOpen={handleClickOpen2}
            accuracy={accuracy.toFixed(1)}
            sync={finalSync}
          />
        </Grid>
        <Grid item>
          <DancerCard
            name={member1Name}
            position={finalPosition.substring(2, 3)}
            userImage='6CgkUjUl4og'
            danceMove={finalDanceMove}
            handleClickOpen={handleClickOpen}
            accuracy={accuracy.toFixed(1)}
            sync={finalSync}
          />
        </Grid>
        <Grid item>
          <DancerCard
            name={member2Name}
            position={finalPosition.substring(4)}
            userImage='d2MSDujJl2g'
            danceMove={finalDanceMove}
            role='Member 2'
            handleClickOpen={handleClickOpen3}
            accuracy={accuracy.toFixed(1)}
            sync={finalSync}
          />
        </Grid>
        {/* Display Dancer Cards end here */}
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
              maxScore={maxScore}
              setMaxScore={setMaxScore}
              accuracy={accuracy}
              // setAccuracyList={setAccuracyList}
              // accuracyList={accuracyList}
              // accuracyAvg={accuracyAvg}
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
