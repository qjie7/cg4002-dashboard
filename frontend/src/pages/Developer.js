import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Grid } from '@material-ui/core'
import CustomizedSnackbars from '../components/CustomizedSnackbars/CustomizedSnackbars'

import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts'
import Button from '@material-ui/core/Button'
import SimpleCard from '../components/SimpleCard/SimpleCard'
import BasicTable from '../components/BasicTable/BasicTable'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling'],
})

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  margin: {
    margin: theme.spacing(1),
    paddingRight: 33,
  },
  logout: {
    margin: theme.spacing(1),
    paddingRight: 33,
    width: '100px',
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

export default function Developer(props) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const { access } = props

  const [p1LeftAData, setP1LeftAData] = useState([])
  const [data, setData] = useState([])
  // const [p1LeftGData, setP1LeftGData] = useState([])
  // const [p1RightAData, setP1RightAData] = useState([])
  // const [p1RightGData, setP1RightGData] = useState([])

  // const [p2LeftAData, setP2LeftAData] = useState([])
  // const [p2LeftGData, setP2LeftGData] = useState([])
  // const [p2RightAData, setP2RightAData] = useState([])
  // const [p2RightGData, setP2RightGData] = useState([])

  // const [p3LeftAData, setP3LeftAData] = useState([])
  // const [p3LeftGData, setP3LeftGData] = useState([])
  // const [p3RightAData, setP3RightAData] = useState([])
  // const [p3RightGData, setP3RightGData] = useState([])
  const [danceMove, setDanceMove] = useState('Dab')
  // const [p1DanceMove, setP1DanceMove] = useState('Neutral')
  // const [p2DanceMove, setP2DanceMove] = useState('Neutral')
  // const [p3DanceMove, setP3DanceMove] = useState('Neutral')

  const [position, setPosition] = useState([1, 2, 3])
  // const [p1Position, setP1Position] = useState(1)
  // const [p2Position, setP2Position] = useState(2)
  // const [p3Position, setP3Position] = useState(3)

  const [connection, setConnection] = useState(false)
  // const [termination, setTermination] = useState(false)
  // const [connection, setConnection] = useState(0)

  const handleConnection = () => {
    connection ? setConnection(false) : setConnection(true)

    console.log('clicked')
  }

  const handleAccess = () => {
    access(false)
  }

  // const handleTermination = () => {
  //   termination ? setTermination(false) : setTermination(true)
  // }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [testLog, setTestLog] = useState({
    danceMove: 'Dab',
    position1: 1,
    position2: 2,
    position3: 3,
  })
  const [correctness, setCorrectness] = useState(false)

  let [position1, position2, position3] = position
  let currentDanceMove = danceMove

  useEffect(() => {
    if (connection) {
      socket.on('new_data', (newData) => {
        setData((currentData) => [...currentData, newData])
        setPosition(newData.position)
        setDanceMove(newData.danceMove)
        // setP1DanceMove(newData.danceMove)
        // setP1Position(newData.position)
      })

      socket.on('test_log', (newData) => {
        setTestLog(newData)
      })

      // socket.on('p1LeftG', (newData) => {
      //   setP1LeftGData((currentData) => [...currentData, newData])
      // })

      // socket.on('p1RightA', (newData) => {
      //   setP1RightAData((currentData) => [...currentData, newData])
      // })
      // socket.on('p1RightG', (newData) => {
      //   setP1RightGData((currentData) => [...currentData, newData])
      // })

      // socket.on('p2LeftA', (newData) => {
      //   setP2Position(newData.position)
      //   setP2DanceMove(newData.danceMove)
      //   setP2LeftAData((currentData) => [...currentData, newData])
      // })
      // socket.on('p2LeftG', (newData) => {
      //   setP2LeftGData((currentData) => [...currentData, newData])
      // })

      // socket.on('p2RightA', (newData) => {
      //   setP2RightAData((currentData) => [...currentData, newData])
      // })
      // socket.on('p2RightG', (newData) => {
      //   setP2RightGData((currentData) => [...currentData, newData])
      // })

      // socket.on('p3LeftA', (newData) => {
      //   setP3Position(newData.position)
      //   setP3DanceMove(newData.danceMove)
      //   setP3LeftAData((currentData) => [...currentData, newData])
      // })
      // socket.on('p3LeftG', (newData) => {
      //   setP3LeftGData((currentData) => [...currentData, newData])
      // })

      // socket.on('p3RightA', (newData) => {
      //   setP3RightAData((currentData) => [...currentData, newData])
      // })
      // socket.on('p3RightG', (newData) => {
      //   setP3RightGData((currentData) => [...currentData, newData])
      // })
    } else {
      // socket.emit('end')
      socket.off('new_data')
      // socket.off('p1LeftG')
      // socket.off('p1RightA')
      // socket.off('p1RightG')
      // socket.off('p2LeftA')
      // socket.off('p2LeftG')
      // socket.off('p2RightA')
      // socket.off('p2RightG')
      // socket.off('p3LeftA')
      // socket.off('p3LeftG')
      // socket.off('p3RightA')
      // socket.off('p3RightG')
      // socket.disconnect()
      // socket.close('p1LeftA')
      // socket.close('p1LeftG')
      // socket.close('p1RightA')
      // socket.close('p1RightG')
      // socket.close('p2LeftA')
      // socket.close('p2LeftG')
      // socket.close('p2RightA')
      // socket.close('p2RightG')
      // socket.close('p3LeftA')
      // socket.close('p3LeftG')
      // socket.close('p3RightA')
      // socket.close('p3RightG')
    }
  }, [connection])

  useEffect(() => {
    if (
      position1 === testLog.position1 &&
      position2 === testLog.position2 &&
      position3 === testLog.position3 &&
      currentDanceMove === testLog.danceMove
    ) {
      setCorrectness(true)
    } else {
      setCorrectness(false)
    }
  })

  console.log(correctness)
  return (
    <>
      <Grid container justify='center'>
        <Grid item xs={12}>
          <Typography variant='h3' align='center' className={classes.heading}>
            {' '}
            Developer Mode
          </Typography>
        </Grid>
      </Grid>
      <div className={classes.root}>
        <AppBar position='static' color='default'>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            variant='scrollable'
            scrollButtons='auto'
            aria-label='scrollable auto tabs example'
          >
            <Tab label='Player 1' {...a11yProps(0)} />
            <Tab label='Player 2' {...a11yProps(1)} />
            <Tab label='Player 3' {...a11yProps(2)} />
            <Tab label='Offline Analytics' {...a11yProps(3)} />
            {/* <Tab label='Log Out' {...a11yProps(6)}></Tab> */}
            <Grid container justify='flex-end'>
              <Button
                variant='contained'
                color='secondary'
                onClick={handleAccess}
                className={classes.logout}
              >
                Log out
              </Button>
              {/* <CustomizedSnackbars access={access} /> */}
            </Grid>
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <>
            <Grid container justify='space-around'>
              <Grid item>
                <div>
                  <h1>(Left) MPU </h1>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis />

                    <Line type='monotone' dataKey='xAxis' stroke='#820000' />
                    <Line type='monotone' dataKey='yAxis' stroke='#118200' />
                    <Line type='monotone' dataKey='zAxis' stroke='#000982' />
                  </LineChart>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis />
                    <Line type='monotone' dataKey='xAxis' stroke='#820000' />
                    <Line type='monotone' dataKey='yAxis' stroke='#118200' />
                    <Line type='monotone' dataKey='zAxis' stroke='#000982' />
                  </LineChart>
                </div>
              </Grid>
              <Grid item>
                <div>
                  <h1>(Right) MPU </h1>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis />

                    <Line type='monotone' dataKey='xAxis' stroke='#820000' />
                    <Line type='monotone' dataKey='yAxis' stroke='#118200' />
                    <Line type='monotone' dataKey='zAxis' stroke='#000982' />
                  </LineChart>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis />
                    <Line type='monotone' dataKey='xAxis' stroke='#820000' />
                    <Line type='monotone' dataKey='yAxis' stroke='#118200' />
                    <Line type='monotone' dataKey='zAxis' stroke='#000982' />
                  </LineChart>
                </div>
              </Grid>
            </Grid>
          </>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <>
            <Grid container justify='space-around'>
              <Grid item>
                <div>
                  <h1>(Left) MPU </h1>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis />

                    <Line type='monotone' dataKey='xAxis' stroke='#820000' />
                    <Line type='monotone' dataKey='yAxis' stroke='#118200' />
                    <Line type='monotone' dataKey='zAxis' stroke='#000982' />
                  </LineChart>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis />
                    <Line type='monotone' dataKey='xAxis' stroke='#820000' />
                    <Line type='monotone' dataKey='yAxis' stroke='#118200' />
                    <Line type='monotone' dataKey='zAxis' stroke='#000982' />
                  </LineChart>
                </div>
              </Grid>
              <Grid item>
                <div>
                  <h1>(Right) MPU </h1>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis />

                    <Line type='monotone' dataKey='xAxis' stroke='#820000' />
                    <Line type='monotone' dataKey='yAxis' stroke='#118200' />
                    <Line type='monotone' dataKey='zAxis' stroke='#000982' />
                  </LineChart>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis />
                    <Line type='monotone' dataKey='xAxis' stroke='#820000' />
                    <Line type='monotone' dataKey='yAxis' stroke='#118200' />
                    <Line type='monotone' dataKey='zAxis' stroke='#000982' />
                  </LineChart>
                </div>
              </Grid>
            </Grid>
          </>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <>
            <Grid container justify='space-around'>
              <Grid item>
                <div>
                  <h1>(Left) MPU </h1>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis />

                    <Line type='monotone' dataKey='xAxis' stroke='#820000' />
                    <Line type='monotone' dataKey='yAxis' stroke='#118200' />
                    <Line type='monotone' dataKey='zAxis' stroke='#000982' />
                  </LineChart>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis />
                    <Line type='monotone' dataKey='xAxis' stroke='#820000' />
                    <Line type='monotone' dataKey='yAxis' stroke='#118200' />
                    <Line type='monotone' dataKey='zAxis' stroke='#000982' />
                  </LineChart>
                </div>
              </Grid>
              <Grid item>
                <div>
                  <h1>(Right) MPU </h1>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis />

                    <Line type='monotone' dataKey='xAxis' stroke='#820000' />
                    <Line type='monotone' dataKey='yAxis' stroke='#118200' />
                    <Line type='monotone' dataKey='zAxis' stroke='#000982' />
                  </LineChart>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis />
                    <Line type='monotone' dataKey='xAxis' stroke='#820000' />
                    <Line type='monotone' dataKey='yAxis' stroke='#118200' />
                    <Line type='monotone' dataKey='zAxis' stroke='#000982' />
                  </LineChart>
                </div>
              </Grid>
            </Grid>
          </>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Typography variant='h3'>Test Log Received</Typography>

          <Grid item style={{ justifyItems: 'center' }}>
            <BasicTable
              danceMove={testLog.danceMove}
              position1={testLog.position1}
              position2={testLog.position2}
              position3={testLog.position3}
              correctness={correctness}
            />
          </Grid>

          <Grid container justify='center' style={{ marginTop: '100px' }}>
            <Grid item style={{ marginBottom: '25px' }}>
              <Typography variant='h3'>Simulated Data</Typography>
            </Grid>

            <Grid container item justify='center'>
              <Grid item>
                <SimpleCard player='Paula' danceMove={danceMove} />
              </Grid>
              <Grid item>
                <SimpleCard player='Cristian' danceMove={danceMove} />
              </Grid>
              <Grid item>
                <SimpleCard player='Claudia' danceMove={danceMove} />
              </Grid>
            </Grid>
          </Grid>

          <Grid container style={{ marginTop: '10px' }}>
            <Grid container item justify='center'>
              <Grid item>
                <SimpleCard player='' position={position[0]} />
              </Grid>
              <Grid item>
                <SimpleCard player='' position={position[1]} />
              </Grid>
              <Grid item>
                <SimpleCard player='' position={position[2]} />
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={4}>
          {/* <Grid container style={{ marginTop: '200px' }}>
            <Grid container item justify='center'>
              <Grid item>
                <SimpleCard player='Player 1' danceMove={danceMove} />
              </Grid>
              <Grid item>
                <SimpleCard player='Player 2' danceMove={danceMove} />
              </Grid>
              <Grid item>
                <SimpleCard player='Player 3' danceMove={danceMove} />
              </Grid>
            </Grid>
          </Grid> */}
        </TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </div>
      <Grid container justify='center'>
        <Button
          variant='contained'
          color='secondary'
          onClick={handleConnection}
          className={classes.margin}
        >
          {connection ? <p>DISCONNECT</p> : <p>CONNECT</p>}
        </Button>
        <Backdrop
          className={classes.backdrop}
          open={connection ? !socket.connected : false}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      </Grid>
    </>
  )
}
