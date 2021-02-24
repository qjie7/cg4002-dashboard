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

import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

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
    color: 'white',
  },
}))

const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling'],
})

function Playground() {
  const classes = useStyles()
  const [danceMove, setDanceMove] = useState('Dab')
  const [position, setPosition] = useState([1, 2, 3])

  // const [testLog, setTestLog] = useState({
  //   danceMove: 'Dab',
  //   position1: 1,
  //   position2: 2,
  //   position3: 3,
  // })
  const [correctness, setCorrectness] = useState(false)
  // const [p1Position, setP1Position] = useState(1)
  // const [p2Position, setP2Position] = useState(2)
  // const [p3Position, setP3Position] = useState(3)

  // const [p1DanceMove, setP1DanceMove] = useState('')
  // const [p2DanceMove, setP2DanceMove] = useState('')
  // const [p3DanceMove, setP3DanceMove] = useState('')
  const [connection, setConnection] = useState(false)

  const handleConnection = () => {
    connection ? setConnection(false) : setConnection(true)
  }
  let [position1, position2, position3] = position
  let currentDanceMove = danceMove
  useEffect(() => {
    if (connection) {
      socket.on('new_data', (newData) => {
        setDanceMove(newData.danceMove)
        setPosition(newData.position)
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
      socket.off('new_data')
    }
  }, [connection])

  // useEffect(() => {
  //   if (
  //     position1 === testLog.position1 &&
  //     position2 === testLog.position2 &&
  //     position3 === testLog.position3 &&
  //     currentDanceMove === testLog.danceMove
  //   ) {
  //     setCorrectness(true)
  //   } else {
  //     setCorrectness(false)
  //   }
  // })
  // console.log(position1)
  // console.log(position2)
  // console.log(position3)
  // console.log(testLog.position1)
  // console.log(testLog.position2)
  // console.log(testLog.position3)
  // console.log(currentDanceMove)
  // console.log(testLog.danceMove)
  // console.log(correctness)

  return (
    <>
      <Grid container justify='center'>
        <Grid item xs={12}>
          <Typography variant='h3' align='center' className={classes.heading}>
            {' '}
            Dance Ground
          </Typography>
        </Grid>
      </Grid>

      <Grid container justify='center'>
        <Grid item>
          <DancerCard
            name='Paula'
            position={position[0]}
            userImage='6CgkUjUl4og'
            danceMove={danceMove}
          />
        </Grid>

        <Grid item>
          <DancerCard
            name='Robinson'
            position={position[1]}
            userImage='sibVwORYqs0'
            danceMove={danceMove}
          />
        </Grid>

        <Grid item>
          <DancerCard
            name='Erik'
            position={position[2]}
            userImage='d2MSDujJl2g'
            danceMove={danceMove}
          />
        </Grid>

        {/* <AnimateSharedLayout>
          <motion.div
            drag
            dragElastic={0.2}
            dragMomentum={false}
            layout
            layoutId
            className={classes.player1}
          >
            <DancerCard name='Jack' status='Ready' />
          </motion.div>

          <motion.div
            drag
            dragElastic={0.2}
            dragMomentum={false}
            layout
            layoutId
            className={classes.player2}
          >
            <DancerCard name='Chris' status='Ready' />
          </motion.div>

          <motion.div
            drag
            dragElastic={0.2}
            dragMomentum={false}
            layout
            layoutId
            className={classes.player3}
          >
            <DancerCard name='Vincent' status='' />
          </motion.div>
        </AnimateSharedLayout> */}

        {/* <Typography variant='h3'>Test Log Received</Typography>

        <Grid item style={{ justifyItems: 'center' }}>
          <BasicTable
            danceMove={testLog.danceMove}
            position1={testLog.position1}
            position2={testLog.position2}
            position3={testLog.position3}
            correctness={correctness}
          />
        </Grid> */}
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
