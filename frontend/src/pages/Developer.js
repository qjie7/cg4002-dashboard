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

import IconButton from '@material-ui/core/IconButton'
import { FaPlay, FaPause } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import MuiTooltip from '@material-ui/core/Tooltip'
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
    paddingRight: 20,
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

  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [data3, setData3] = useState([])

  const [danceMove, setDanceMove] = useState('Dab')

  const [position, setPosition] = useState([1, 2, 3])

  const [connection, setConnection] = useState(false)

  const handleConnection = () => {
    connection ? setConnection(false) : setConnection(true)

    console.log('clicked')
  }

  const handleAccess = () => {
    access(false)
  }

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
        console.log(newData)
        setData((currentData) => [...currentData, newData])
        setPosition(newData.position)
        setDanceMove(newData.danceMove)
      })

      // socket.on('new_data2', (newData) => {
      //   setData2((currentData) => [...currentData, newData])
      // })

      // socket.on('new_data3', (newData) => {
      //   setData3((currentData) => [...currentData, newData])
      // })

      socket.on('test_log', (newData) => {
        setTestLog(newData)
      })
    } else {
      socket.off('new_data')
      // socket.off('new_data2')
      // socket.off('new_data3')
      // socket.offAny()
      //socket.close()
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

  // console.log(correctness)
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
            <Tab label='Member 1' {...a11yProps(0)} />
            <Tab label='Leader' {...a11yProps(1)} />
            <Tab label='Member 2' {...a11yProps(2)} />
            <Tab label='EMG' {...a11yProps(3)} />
            <Tab label='Offline Analytics' {...a11yProps(4)} />

            <Grid container justify='flex-end'>
              <MuiTooltip title='Connect/Disconnect'>
                <IconButton
                  aria-label='connect'
                  className={classes.margin}
                  size='large'
                  onClick={handleConnection}
                >
                  {connection ? (
                    <IconContext.Provider
                      value={{ color: 'red', className: 'global-class-name' }}
                    >
                      <FaPause size={30} />
                    </IconContext.Provider>
                  ) : (
                    <IconContext.Provider
                      value={{ color: 'green', className: 'global-class-name' }}
                    >
                      <FaPlay size={30} />
                    </IconContext.Provider>
                  )}
                </IconButton>
              </MuiTooltip>

              <Backdrop
                className={classes.backdrop}
                open={connection ? !socket.connected : false}
              >
                <CircularProgress color='inherit' />
              </Backdrop>

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
            <Grid container justify='space-between'>
              <Grid item>
                <div>
                  <h1>(Left) MPU </h1>

                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis
                      label={{
                        value: 'Accelerometer',
                        angle: -90,
                        position: 'middleLeft',
                      }}
                    />

                    <Line
                      type='monotone'
                      dataKey='xAxisMemberOneLeftA'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='yAxisMemberOneLeftA'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='zAxisMemberOneLeftA'
                      stroke='#000982'
                      isAnimationActive={false}
                    />
                  </LineChart>

                  {/* <LineChart width={500} height={300} data={data2}> */}
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis
                      label={{
                        value: 'Gyrometer',
                        angle: -90,
                        position: 'middleLeft',
                      }}
                    />
                    <Line
                      type='monotone'
                      dataKey='xAxisMemberOneLeftG'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='yAxisMemberOneLeftG'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='zAxisMemberOneLeftG'
                      stroke='#000982'
                      isAnimationActive={false}
                    />
                  </LineChart>
                </div>
              </Grid>
              <Grid item>
                <div>
                  <h1>(Right) MPU </h1>
                  {/* <LineChart width={500} height={300} data={data3}> */}
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis
                      label={{
                        value: 'Accelerometer',
                        angle: -90,
                        position: 'middleLeft',
                      }}
                    />

                    <Line
                      type='monotone'
                      dataKey='xAxisMemberOneRightA'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='yAxisMemberOneRightA'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='zAxisMemberOneRightA'
                      stroke='#000982'
                      isAnimationActive={false}
                    />
                  </LineChart>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis
                      label={{
                        value: 'Gyrometer',
                        angle: -90,
                        position: 'middleLeft',
                      }}
                    />
                    <Line
                      type='monotone'
                      dataKey='xAxisMemberOneRightG'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='yAxisMemberOneRightG'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='zAxisMemberOneRightG'
                      stroke='#000982'
                      isAnimationActive={false}
                    />
                  </LineChart>
                </div>
              </Grid>
            </Grid>
          </>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <>
            <Grid container justify='space-between'>
              <Grid item>
                <div>
                  <h1>(Left) MPU </h1>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis
                      label={{
                        value: 'Accelerometer',
                        angle: -90,
                        position: 'middleLeft',
                      }}
                    />

                    <Line
                      type='monotone'
                      dataKey='xAxisLeaderLeftA'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='yAxisLeaderLeftA'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='zAxisLeaderLeftA'
                      stroke='#000982'
                      isAnimationActive={false}
                    />
                  </LineChart>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis
                      label={{
                        value: 'Gyrometer',
                        angle: -90,
                        position: 'middleLeft',
                      }}
                    />
                    <Line
                      type='monotone'
                      dataKey='xAxisLeaderLeftG'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='yAxisLeaderLeftG'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='zAxisLeaderLeftG'
                      stroke='#000982'
                      isAnimationActive={false}
                    />
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
                    <YAxis
                      label={{
                        value: 'Accelerometer',
                        angle: -90,
                        position: 'middleLeft',
                      }}
                    />

                    <Line
                      type='monotone'
                      dataKey='xAxisLeaderRightA'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='yAxisLeaderRightA'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='zAxisLeaderRightA'
                      stroke='#000982'
                      isAnimationActive={false}
                    />
                  </LineChart>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis
                      label={{
                        value: 'Gyrometer',
                        angle: -90,
                        position: 'middleLeft',
                      }}
                    />
                    <Line
                      type='monotone'
                      dataKey='xAxisLeaderRightG'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='yAxisLeaderRightG'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='zAxisLeaderRightG'
                      stroke='#000982'
                      isAnimationActive={false}
                    />
                  </LineChart>
                </div>
              </Grid>
            </Grid>
          </>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <>
            <Grid container justify='space-between'>
              <Grid item>
                <div>
                  <h1>(Left) MPU </h1>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis
                      label={{
                        value: 'Accelerometer',
                        angle: -90,
                        position: 'middleLeft',
                      }}
                    />

                    <Line
                      type='monotone'
                      dataKey='xAxisMemberTwoLeftA'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='yAxisMemberTwoLeftA'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='zAxisMemberTwoLeftA'
                      stroke='#000982'
                      isAnimationActive={false}
                    />
                  </LineChart>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis
                      label={{
                        value: 'Gyrometer',
                        angle: -90,
                        position: 'middleLeft',
                      }}
                    />
                    <Line
                      type='monotone'
                      dataKey='xAxisMemberTwoLeftG'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='yAxisMemberTwoLeftG'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='zAxisMemberTwoLeftG'
                      stroke='#000982'
                      isAnimationActive={false}
                    />
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
                    <YAxis
                      label={{
                        value: 'Accelerometer',
                        angle: -90,
                        position: 'middleLeft',
                      }}
                    />

                    <Line
                      type='monotone'
                      dataKey='xAxisMemberTwoRightA'
                      stroke='#820000'
                    />
                    <Line
                      type='monotone'
                      dataKey='yAxisMemberTwoRightA'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='zAxisMemberTwoRightA'
                      stroke='#000982'
                      isAnimationActive={false}
                    />
                  </LineChart>
                  <LineChart width={500} height={300} data={data}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <Tooltip />
                    <Legend />
                    <XAxis dataKey='time' />
                    <YAxis
                      label={{
                        value: 'Gyrometer',
                        angle: -90,
                        position: 'middleLeft',
                      }}
                    />
                    <Line
                      type='monotone'
                      dataKey='xAxisMemberTwoRightG'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='yAxisMemberTwoRightG'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      type='monotone'
                      dataKey='zAxisMemberTwoRightG'
                      stroke='#000982'
                      isAnimationActive={false}
                    />
                  </LineChart>
                </div>
              </Grid>
            </Grid>
          </>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <LineChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Legend />
            <XAxis dataKey='time' />
            <YAxis
              label={{
                value: 'EMG',
                angle: -90,
                position: 'middleLeft',
              }}
            />
            <Line
              type='monotone'
              dataKey='xAxisEMG'
              stroke='#820000'
              isAnimationActive={false}
            />
            <Line
              type='monotone'
              dataKey='yAxisEMG'
              stroke='#118200'
              isAnimationActive={false}
            />
            <Line
              type='monotone'
              dataKey='zAxisEMG'
              stroke='#000982'
              isAnimationActive={false}
            />
          </LineChart>
        </TabPanel>
        <TabPanel value={value} index={4}>
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
                <SimpleCard player='Robinson' danceMove={danceMove} />
              </Grid>
              <Grid item>
                <SimpleCard player='Erik' danceMove={danceMove} />
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
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </div>
    </>
  )
}
