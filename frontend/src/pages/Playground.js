import React from 'react'
import { useEffect, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Backdrop from '@material-ui/core/Backdrop'
import { motion } from 'framer-motion'

import io from 'socket.io-client'
import styled from 'styled-components'

import { Modal } from '../components/Modal/Modal'
import FormDialog from '../components/FormDialog/FormDialog'
import DancerCard from '../components/DancerCard/DancerCard'
import DancerCard2 from '../components/DancerCard/DancerCard2'
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
  const [danceMove, setDanceMove] = useState('Nothing')
  const [danceMove2, setDanceMove2] = useState('Nothing')
  const [danceMove3, setDanceMove3] = useState('Nothing')
  const [finalDanceMove, setFinalDanceMove] = useState('nothing')
  const [finalPosition, setFinalPosition] = useState('1 2 3')
  const [accuracy, setAccuracy] = useState(0)
  const [accuracy2, setAccuracy2] = useState(0)
  const [accuracy3, setAccuracy3] = useState(0)
  const [overallAccuracy, setOverallAccuracy] = useState(0)
  const [posAccuracy, setPosAccuracy] = useState(0)
  const [finalSync, setFinalSync] = useState('0')
  const [syncAvg, setSyncAvg] = useState(0)
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal((prev) => !prev)
  }
  const [connection, setConnection] = useState(false)

  const handleConnection = () => {
    if (connection) {
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
  const [score2, setScore2] = useState(0)
  const [maxScore2, setMaxScore2] = useState(0)
  const [score3, setScore3] = useState(0)
  const [maxScore3, setMaxScore3] = useState(0)
  const [scorePos, setScorePos] = useState(0)
  const [maxScorePos, setMaxScorePos] = useState(0)
  const [correctness, setCorrectness] = useState(false)
  const [syncList, setSyncList] = useState([])

  useEffect(() => {
    if (connection) {
      setAccuracy(0)
      setScore(0)
      setScore2(0)
      setScore3(0)
      setScorePos(0)
      setMaxScore(0)
      setMaxScore2(0)
      setMaxScore3(0)
      setMaxScorePos(0)

      socket.on('new_data', (newData) => {
        setDanceMove(newData.danceMove)
      })

      socket.on('new_data2', (newData) => {
        setDanceMove2(newData.danceMove)
      })

      socket.on('new_data3', (newData) => {
        setDanceMove3(newData.danceMove)
      })

      socket.on('new_data4', (newData) => {
        setFinalDanceMove(newData.finalDanceMove)
        setFinalPosition(newData.finalPosition)
        setFinalSync(newData.finalSync)
        setSyncList((oldList) => [...oldList, newData.finalSync])
      })
    } else {
      socket.off('new_data')
      socket.off('new_data2')
      socket.off('new_data3')
      socket.off('new_data4')
    }
  }, [connection])

  useEffect(() => {
    const handleKey = (event) => {
      if (event.keyCode === 81 && connection) {
        setCorrectness(true)
        setScore((prevScore) => prevScore + 1)
        setMaxScore((prevScore) => prevScore + 1)
      } else if (event.keyCode === 87 && connection) {
        setCorrectness(true)
        setScore2((prevScore) => prevScore + 1)
        setMaxScore2((prevScore) => prevScore + 1)
      } else if (event.keyCode === 69 && connection) {
        setCorrectness(true)
        setScore3((prevScore) => prevScore + 1)
        setMaxScore3((prevScore) => prevScore + 1)
      } else if (event.keyCode === 82 && connection) {
        setCorrectness(true)
        setScorePos((prevScore) => prevScore + 1)
        setMaxScorePos((prevScore) => prevScore + 1)
      } else if (event.keyCode === 65 && connection) {
        setCorrectness(false)
        setMaxScore((prevScore) => prevScore + 1)
      } else if (event.keyCode === 83 && connection) {
        setCorrectness(false)
        setMaxScore2((prevScore) => prevScore + 1)
      } else if (event.keyCode === 68 && connection) {
        setCorrectness(false)
        setMaxScore3((prevScore) => prevScore + 1)
      } else if (event.keyCode === 70 && connection) {
        setCorrectness(false)
        setMaxScorePos((prevScore) => prevScore + 1)
      }
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      window.removeEventListener('keydown', handleKey)
    }
  })

  useEffect(() => {
    setAccuracy(maxScore === 0 ? 0 : (score * 100) / maxScore)
    setAccuracy2(maxScore2 === 0 ? 0 : (score2 * 100) / maxScore2)
    setAccuracy3(maxScore3 === 0 ? 0 : (score3 * 100) / maxScore3)
    setOverallAccuracy((accuracy + accuracy2 + accuracy3) / 3)
    setPosAccuracy(maxScorePos === 0 ? 0 : (scorePos * 100) / maxScorePos)
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
        {/* 1 2 3 */}
        {finalPosition === '1 2 3' && (
          <>
            {/* #1 */}
            <Grid item>
              <motion.span>
                <DancerCard
                  name={leaderName}
                  position={finalPosition.substring(0, 1)}
                  userImage='NRfYKuSKs_o'
                  danceMove={danceMove}
                  role='Leader'
                  handleClickOpen={handleClickOpen2}
                  accuracy={accuracy.toFixed(1)}
                  sync={finalSync}
                />
              </motion.span>
            </Grid>

            {/* #2 */}
            <Grid item>
              <motion.span>
                <DancerCard2
                  name={member1Name}
                  position={finalPosition.substring(2, 3)}
                  userImage='OqQi3nCt4CA'
                  danceMove={danceMove2}
                  handleClickOpen={handleClickOpen}
                  accuracy={accuracy2.toFixed(1)}
                  sync={finalSync}
                  posAccuracy={posAccuracy.toFixed(1)}
                />
              </motion.span>
            </Grid>

            {/* #3 */}
            <Grid item>
              <motion.span>
                <DancerCard
                  name={member2Name}
                  position={finalPosition.substring(4)}
                  userImage='SFJz9q9EAZc'
                  danceMove={danceMove3}
                  role='Member 2'
                  handleClickOpen={handleClickOpen3}
                  accuracy={accuracy3.toFixed(1)}
                  sync={finalSync}
                />
              </motion.span>
            </Grid>
          </>
        )}
        {/* 1 3 2 */}
        {finalPosition === '1 3 2' && (
          <>
            {/* #1 */}
            <Grid item>
              <motion.span layout>
                <DancerCard
                  name={leaderName}
                  position={finalPosition.substring(0, 1)}
                  userImage='NRfYKuSKs_o'
                  danceMove={danceMove}
                  role='Leader'
                  handleClickOpen={handleClickOpen2}
                  accuracy={accuracy.toFixed(1)}
                  sync={finalSync}
                />
              </motion.span>
            </Grid>

            {/* #3 */}
            <Grid item>
              <motion.span layout>
                <DancerCard
                  name={member2Name}
                  position={finalPosition.substring(4)}
                  userImage='SFJz9q9EAZc'
                  danceMove={danceMove3}
                  role='Member 2'
                  handleClickOpen={handleClickOpen3}
                  accuracy={accuracy3.toFixed(1)}
                  sync={finalSync}
                />
              </motion.span>
            </Grid>

            {/* #2 */}
            <Grid item>
              <motion.span layout>
                <DancerCard2
                  name={member1Name}
                  position={finalPosition.substring(2, 3)}
                  userImage='OqQi3nCt4CA'
                  danceMove={danceMove2}
                  handleClickOpen={handleClickOpen}
                  accuracy={accuracy2.toFixed(1)}
                  sync={finalSync}
                  posAccuracy={posAccuracy.toFixed(1)}
                />
              </motion.span>
            </Grid>
          </>
        )}

        {/* 2 1 3 */}
        {finalPosition === '2 1 3' && (
          <>
            {/* #2 */}
            <Grid item>
              <motion.span layout>
                <DancerCard2
                  name={member1Name}
                  position={finalPosition.substring(2, 3)}
                  userImage='OqQi3nCt4CA'
                  danceMove={danceMove2}
                  handleClickOpen={handleClickOpen}
                  accuracy={accuracy2.toFixed(1)}
                  sync={finalSync}
                  posAccuracy={posAccuracy.toFixed(1)}
                />
              </motion.span>
            </Grid>
            {/* #1 */}
            <Grid item>
              <motion.span layout>
                <DancerCard
                  name={leaderName}
                  position={finalPosition.substring(0, 1)}
                  userImage='NRfYKuSKs_o'
                  danceMove={danceMove}
                  role='Leader'
                  handleClickOpen={handleClickOpen2}
                  accuracy={accuracy.toFixed(1)}
                  sync={finalSync}
                />
              </motion.span>
            </Grid>

            {/* #3 */}
            <Grid item>
              <motion.span layout>
                <DancerCard
                  name={member2Name}
                  position={finalPosition.substring(4)}
                  userImage='SFJz9q9EAZc'
                  danceMove={danceMove3}
                  role='Member 2'
                  handleClickOpen={handleClickOpen3}
                  accuracy={accuracy3.toFixed(1)}
                  sync={finalSync}
                />
              </motion.span>
            </Grid>
          </>
        )}

        {/* 2 3 1 */}
        {finalPosition === '2 3 1' && (
          <>
            {/* #2 */}
            <Grid item>
              <motion.span layout>
                <DancerCard2
                  name={member1Name}
                  position={finalPosition.substring(2, 3)}
                  userImage='OqQi3nCt4CA'
                  danceMove={danceMove2}
                  handleClickOpen={handleClickOpen}
                  accuracy={accuracy2.toFixed(1)}
                  sync={finalSync}
                  posAccuracy={posAccuracy.toFixed(1)}
                />
              </motion.span>
            </Grid>

            {/* #3 */}
            <Grid item>
              <motion.span layout>
                <DancerCard
                  name={member2Name}
                  position={finalPosition.substring(4)}
                  userImage='SFJz9q9EAZc'
                  danceMove={danceMove3}
                  role='Member 2'
                  handleClickOpen={handleClickOpen3}
                  accuracy={accuracy3.toFixed(1)}
                  sync={finalSync}
                />
              </motion.span>
            </Grid>

            {/* #1 */}
            <Grid item>
              <motion.span layout>
                <DancerCard
                  name={leaderName}
                  position={finalPosition.substring(0, 1)}
                  userImage='NRfYKuSKs_o'
                  danceMove={danceMove}
                  role='Leader'
                  handleClickOpen={handleClickOpen2}
                  accuracy={accuracy.toFixed(1)}
                  sync={finalSync}
                />
              </motion.span>
            </Grid>
          </>
        )}

        {/* 3 1 2 */}
        {finalPosition === '3 1 2' && (
          <>
            {/* #3 */}
            <Grid item>
              <motion.span layout>
                <DancerCard
                  name={member2Name}
                  position={finalPosition.substring(4)}
                  userImage='SFJz9q9EAZc'
                  danceMove={danceMove3}
                  role='Member 2'
                  handleClickOpen={handleClickOpen3}
                  accuracy={accuracy3.toFixed(1)}
                  sync={finalSync}
                />
              </motion.span>
            </Grid>

            {/* #1 */}
            <Grid item>
              <motion.span layout>
                <DancerCard
                  name={leaderName}
                  position={finalPosition.substring(0, 1)}
                  userImage='NRfYKuSKs_o'
                  danceMove={danceMove}
                  role='Leader'
                  handleClickOpen={handleClickOpen2}
                  accuracy={accuracy.toFixed(1)}
                  sync={finalSync}
                />
              </motion.span>
            </Grid>

            {/* #2 */}
            <Grid item>
              <motion.span layout>
                <DancerCard2
                  name={member1Name}
                  position={finalPosition.substring(2, 3)}
                  userImage='OqQi3nCt4CA'
                  danceMove={danceMove2}
                  handleClickOpen={handleClickOpen}
                  accuracy={accuracy2.toFixed(1)}
                  sync={finalSync}
                  posAccuracy={posAccuracy.toFixed(1)}
                />
              </motion.span>
            </Grid>
          </>
        )}

        {/* 3 2 1 */}
        {finalPosition === '3 2 1' && (
          <>
            {/* #3 */}
            <Grid item>
              <motion.span layout>
                <DancerCard
                  name={member2Name}
                  position={finalPosition.substring(4)}
                  userImage='SFJz9q9EAZc'
                  danceMove={danceMove3}
                  role='Member 2'
                  handleClickOpen={handleClickOpen3}
                  accuracy={accuracy3.toFixed(1)}
                  sync={finalSync}
                />
              </motion.span>
            </Grid>

            {/* #2 */}
            <Grid item>
              <motion.span layout>
                <DancerCard2
                  name={member1Name}
                  position={finalPosition.substring(2, 3)}
                  userImage='OqQi3nCt4CA'
                  danceMove={danceMove2}
                  handleClickOpen={handleClickOpen}
                  accuracy={accuracy2.toFixed(1)}
                  sync={finalSync}
                  posAccuracy={posAccuracy.toFixed(1)}
                />
              </motion.span>
            </Grid>

            {/* #1 */}
            <Grid item>
              <motion.span layout>
                <DancerCard
                  name={leaderName}
                  position={finalPosition.substring(0, 1)}
                  userImage='NRfYKuSKs_o'
                  danceMove={danceMove}
                  role='Leader'
                  handleClickOpen={handleClickOpen2}
                  accuracy={accuracy.toFixed(1)}
                  sync={finalSync}
                />
              </motion.span>
            </Grid>
          </>
        )}
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
              accuracy={overallAccuracy}
              setSyncList={setSyncList}
              syncList={syncList}
              syncAvg={syncAvg}
              posAccuracy={posAccuracy}
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
