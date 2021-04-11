import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Grid } from '@material-ui/core'

import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts'
import Button from '@material-ui/core/Button'
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
  const [danceMove2, setDanceMove2] = useState('Dab')
  const [danceMove3, setDanceMove3] = useState('Dab')

  const [connection, setConnection] = useState(false)

  const [leaderName, setLeaderName] = useState('Leader Name')
  const [member1Name, setMember1Name] = useState('Member 1 Name')
  const [member2Name, setMember2Name] = useState('Member 2 Name')

  const [correctness, setCorrectness] = useState(false)
  const handleConnection = () => {
    connection ? setConnection(false) : setConnection(true)

    console.log('clicked')
  }

  useEffect(() => {
    setLeaderName(localStorage.getItem('leaderName'))
    setMember1Name(localStorage.getItem('member1Name'))
    setMember2Name(localStorage.getItem('member2Name'))
  })

  const handleAccess = () => {
    access(false)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (connection) {
      socket.on('new_data', (newData) => {
        console.log(newData.EMG)
        setData((currentData) => {
          if (currentData.length === 20) {
            currentData = currentData.slice(1)
          }
          return currentData.concat(newData)
        })
        setDanceMove(newData.danceMove)
      })

      socket.on('new_data2', (newData2) => {
        console.log(newData2.EMG)

        setData2((currentData) => {
          if (currentData.length === 20) {
            currentData = currentData.slice(1)
          }
          return currentData.concat(newData2)
        })

        setDanceMove2(newData2.danceMove)
      })

      socket.on('new_data3', (newData3) => {
        console.log(newData3.EMG)

        setData3((currentData) => {
          if (currentData.length === 20) {
            currentData = currentData.slice(1)
          }
          return currentData.concat(newData3)
        })

        setDanceMove3(newData3.danceMove)
      })
    } else {
      socket.off('new_data')
      socket.off('new_data2')
      socket.off('new_data3')
    }
  }, [connection])

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
            </Grid>
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <>
            <Grid container justify='space-between'>
              <Grid item>
                <div>
                  <h1 style={{ color: 'blue' }}>(Left) MPU </h1>

                  <LineChart width={500} height={300} data={data2}>
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
                      width={120}
                      type='number'
                      domain={[-5000, 5000]}
                    />

                    <Line
                      name='x'
                      type='linear'
                      dataKey='xAxisMemberOneLeftA'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      name='y'
                      type='linear'
                      dataKey='yAxisMemberOneLeftA'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      name='z'
                      type='linear'
                      dataKey='zAxisMemberOneLeftA'
                      stroke='#000982'
                      isAnimationActive={false}
                    />
                  </LineChart>

                  <LineChart width={500} height={300} data={data2}>
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
                      width={120}
                      type='number'
                      domain={[-5000, 5000]}
                    />
                    <Line
                      name='x'
                      type='linear'
                      dataKey='xAxisMemberOneLeftG'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      name='y'
                      type='linear'
                      dataKey='yAxisMemberOneLeftG'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      name='z'
                      type='linear'
                      dataKey='zAxisMemberOneLeftG'
                      stroke='#000982'
                      isAnimationActive={false}
                    />
                  </LineChart>
                </div>
              </Grid>
              <Grid item>
                <div>
                  <h1 style={{ color: 'red' }}>(Right) MPU </h1>

                  <LineChart width={500} height={300} data={data2}>
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
                      width={120}
                      type='number'
                      domain={[-5000, 5000]}
                    />

                    <Line
                      name='x'
                      type='linear'
                      dataKey='xAxisMemberOneRightA'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      name='y'
                      type='linear'
                      dataKey='yAxisMemberOneRightA'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      name='z'
                      type='linear'
                      dataKey='zAxisMemberOneRightA'
                      stroke='#000982'
                      isAnimationActive={false}
                    />
                  </LineChart>
                  <LineChart width={500} height={300} data={data2}>
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
                      width={120}
                      type='number'
                      domain={[-5000, 5000]}
                    />
                    <Line
                      name='x'
                      type='linear'
                      dataKey='xAxisMemberOneRightG'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      name='y'
                      type='linear'
                      dataKey='yAxisMemberOneRightG'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      name='z'
                      type='linear'
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
                  <h1 style={{ color: 'blue' }}>(Left) MPU </h1>
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
                      width={120}
                      type='number'
                      domain={[-5000, 5000]}
                    />

                    <Line
                      name='x'
                      type='linear'
                      dataKey='xAxisLeaderLeftA'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      name='y'
                      type='linear'
                      dataKey='yAxisLeaderLeftA'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      name='z'
                      type='linear'
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
                      width={120}
                      type='number'
                      domain={[-5000, 5000]}
                    />
                    <Line
                      name='x'
                      type='linear'
                      dataKey='xAxisLeaderLeftG'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      name='y'
                      type='linear'
                      dataKey='yAxisLeaderLeftG'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      name='z'
                      type='linear'
                      dataKey='zAxisLeaderLeftG'
                      stroke='#000982'
                      isAnimationActive={false}
                    />
                  </LineChart>
                </div>
              </Grid>
              <Grid item>
                <div>
                  <h1 style={{ color: 'red' }}>(Right) MPU </h1>
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
                      width={120}
                      type='number'
                      domain={[-5000, 5000]}
                    />

                    <Line
                      name='x'
                      type='linear'
                      dataKey='xAxisLeaderRightA'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      name='y'
                      type='linear'
                      dataKey='yAxisLeaderRightA'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      name='z'
                      type='linear'
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
                      width={120}
                      type='number'
                      domain={[-5000, 5000]}
                    />
                    <Line
                      name='x'
                      type='linear'
                      dataKey='xAxisLeaderRightG'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      name='y'
                      type='linear'
                      dataKey='yAxisLeaderRightG'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      name='z'
                      type='linear'
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
                  <h1 style={{ color: 'blue' }}>(Left) MPU </h1>
                  <LineChart width={500} height={300} data={data3}>
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
                      width={120}
                      type='number'
                      domain={[-5000, 5000]}
                    />

                    <Line
                      name='x'
                      type='linear'
                      dataKey='xAxisMemberTwoLeftA'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      name='y'
                      type='linear'
                      dataKey='yAxisMemberTwoLeftA'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      name='z'
                      type='linear'
                      dataKey='zAxisMemberTwoLeftA'
                      stroke='#000982'
                      isAnimationActive={false}
                    />
                  </LineChart>
                  <LineChart width={500} height={300} data={data3}>
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
                      width={120}
                      type='number'
                      domain={[-5000, 5000]}
                    />
                    <Line
                      name='x'
                      type='linear'
                      dataKey='xAxisMemberTwoLeftG'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      name='y'
                      type='linear'
                      dataKey='yAxisMemberTwoLeftG'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      name='z'
                      type='linear'
                      dataKey='zAxisMemberTwoLeftG'
                      stroke='#000982'
                      isAnimationActive={false}
                    />
                  </LineChart>
                </div>
              </Grid>
              <Grid item>
                <div>
                  <h1 style={{ color: 'red' }}>(Right) MPU </h1>
                  <LineChart width={500} height={300} data={data3}>
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
                      width={120}
                      type='number'
                      domain={[-5000, 5000]}
                    />

                    <Line
                      name='x'
                      type='linear'
                      dataKey='xAxisMemberTwoRightA'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      name='y'
                      type='linear'
                      dataKey='yAxisMemberTwoRightA'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      name='z'
                      type='linear'
                      dataKey='zAxisMemberTwoRightA'
                      stroke='#000982'
                      isAnimationActive={false}
                    />
                  </LineChart>
                  <LineChart width={500} height={300} data={data3}>
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
                      width={120}
                      type='number'
                      domain={[-5000, 5000]}
                    />
                    <Line
                      name='x'
                      type='linear'
                      dataKey='xAxisMemberTwoRightG'
                      stroke='#820000'
                      isAnimationActive={false}
                    />
                    <Line
                      name='y'
                      type='linear'
                      dataKey='yAxisMemberTwoRightG'
                      stroke='#118200'
                      isAnimationActive={false}
                    />
                    <Line
                      name='z'
                      type='linear'
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
          <LineChart
            width={500}
            height={300}
            data={data}
            style={{ marginLeft: '350px', marginTop: '120px' }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            {/* <Legend /> */}
            <XAxis dataKey='time' />
            <YAxis
              label={{
                value: 'EMG',
                angle: -90,
                position: 'middleLeft',
              }}
              domain={[-1000, 1000]}
            />

            <Line
              name='EMG data'
              type='linear'
              dataKey='EMG'
              stroke='#00b339'
              isAnimationActive={false}
            />
          </LineChart>
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
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
