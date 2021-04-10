import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import LineChart from '../components/LineChart/LineChart'
import BarChartScore from '../components/BarChart/BarChartScore'
import { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
// const useStyles = makeStyles({
//   root: {
//     display: 'flex',
//     justifyContent: 'space-around',
//     marginTop: 120,
//   },
//   heading: {
//     fontSize: '4.5em',
//     letterSpacing: '-1px',
//     backgroundColor: '#503e9d',
//     color: 'white',
//   },
// })

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

function Progress({ borderColor }) {
  const [value, setValue] = React.useState(0)

  const [oneScore, setOneScore] = useState(0)
  const [twoScore, setTwoScore] = useState(0)
  const [threeScore, setThreeScore] = useState(0)
  const [fourScore, setFourScore] = useState(0)
  const [fiveScore, setFiveScore] = useState(0)
  const [sixScore, setSixScore] = useState(0)
  const [sevenScore, setSevenScore] = useState(0)
  const [eightScore, setEightScore] = useState(0)
  const [nineScore, setNineScore] = useState(0)
  const [tenScore, setTenScore] = useState(0)

  const classes = useStyles()

  useEffect(() => {
    const oneValue = localStorage.getItem('oneScore')
    if (oneValue) setOneScore(oneValue)

    const twoValue = localStorage.getItem('twoScore')
    if (twoValue) setTwoScore(twoValue)

    const threeValue = localStorage.getItem('threeScore')
    if (threeValue) setThreeScore(threeValue)

    const fourValue = localStorage.getItem('fourScore')
    if (fourValue) setFourScore(fourValue)

    const fiveValue = localStorage.getItem('fiveScore')
    if (fiveValue) setFiveScore(fiveValue)

    const sixValue = localStorage.getItem('sixScore')
    if (sixValue) setSixScore(sixValue)

    const sevenValue = localStorage.getItem('sevenScore')
    if (sevenValue) setSevenScore(sevenValue)

    const eightValue = localStorage.getItem('eightScore')
    if (eightValue) setEightScore(eightValue)

    const nineValue = localStorage.getItem('nineScore')
    if (nineValue) setNineScore(nineValue)

    const tenValue = localStorage.getItem('tenScore')
    if (tenValue) setTenScore(tenValue)
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <>
      <Grid container justify='center' style={{ marginTop: '-10px' }}>
        <Grid item xs={12}>
          <Typography variant='h3' align='center' className={classes.heading}>
            {' '}
            Progress
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
            <Tab label='Team Score' {...a11yProps(0)} />
            <Tab label='Team Accuracy' {...a11yProps(1)} />
            <Tab label='Sync' {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <>
            <Grid item xs={12}>
              <BarChartScore
                oneScore={oneScore > 0 ? oneScore - 1 : oneScore}
                twoScore={twoScore > 0 ? twoScore - 1 : twoScore}
                threeScore={threeScore > 0 ? threeScore - 1 : threeScore}
                fourScore={fourScore > 0 ? fourScore - 1 : fourScore}
                fiveScore={fiveScore > 0 ? fiveScore - 1 : fiveScore}
                sixScore={sixScore > 0 ? sixScore - 1 : sixScore}
                sevenScore={sevenScore > 0 ? sevenScore - 1 : sevenScore}
                eightScore={eightScore > 0 ? eightScore - 1 : eightScore}
                nineScore={nineScore > 0 ? nineScore - 1 : nineScore}
                tenScore={tenScore > 0 ? tenScore - 1 : tenScore}
              />
            </Grid>
          </>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <>
            <Grid xs={12} item>
              <LineChart
                data={JSON.parse(localStorage.getItem('accuracyDatas'))}
                time={JSON.parse(localStorage.getItem('time'))}
                text='Team Accuracy'
                label='Accuracy'
                borderColor='rgba(233,42,23,52)'
              />
            </Grid>
          </>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <>
            <Grid xs={12} item>
              <LineChart
                data={JSON.parse(localStorage.getItem('syncDatas'))}
                time={JSON.parse(localStorage.getItem('time'))}
                text='Sync'
                label='Sync'
                borderColor='rgba(23,100,111,4)'
              />
            </Grid>
          </>
        </TabPanel>
        <TabPanel value={value} index={3}></TabPanel>
        <TabPanel value={value} index={5}>
          Item Six
        </TabPanel>
        <TabPanel value={value} index={6}>
          Item Seven
        </TabPanel>
      </div>
      {/* <Grid container justify='center' style={{ marginTop: '-10px' }}>
        <Grid item xs={12} style={{ width: '100%' }}>
          <Typography variant='h3' align='center' className={classes.heading}>
            {' '}
            Progress
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={3} direction='column'>
        <Grid container item xs={12} spacing={3} marginLeft='100px'>
          <Grid item xs={12}>
            <BarChartScore
              oneScore={oneScore > 0 ? oneScore - 1 : oneScore}
              twoScore={twoScore > 0 ? twoScore - 1 : twoScore}
              threeScore={threeScore > 0 ? threeScore - 1 : threeScore}
              fourScore={fourScore > 0 ? fourScore - 1 : fourScore}
              fiveScore={fiveScore > 0 ? fiveScore - 1 : fiveScore}
              sixScore={sixScore > 0 ? sixScore - 1 : sixScore}
              sevenScore={sevenScore > 0 ? sevenScore - 1 : sevenScore}
              eightScore={eightScore > 0 ? eightScore - 1 : eightScore}
              nineScore={nineScore > 0 ? nineScore - 1 : nineScore}
              tenScore={tenScore > 0 ? tenScore - 1 : tenScore}
            />
          </Grid>
        </Grid>

        <Grid container direction='column' item xs={12} spacing={3}>
          <Grid xs={12} item>
            <LineChart
              data={JSON.parse(localStorage.getItem('accuracyDatas'))}
              time={JSON.parse(localStorage.getItem('time'))}
              text='Team Accuracy'
              label='Accuracy'
              borderColor='rgba(233,42,23,52)'
            />
          </Grid>
          <Grid xs={12} item>
            <LineChart
              data={JSON.parse(localStorage.getItem('syncDatas'))}
              time={JSON.parse(localStorage.getItem('time'))}
              text='Sync'
              label='Sync'
              borderColor='rgba(23,100,111,4)'
            />
          </Grid>
        </Grid>
      </Grid> */}
    </>
  )
}

export default Progress

{
  /* <Grid container direction='column' item xs={12} spacing={3}>
 <Grid xs={6} item>
  <LineChart
    data={JSON.parse(localStorage.getItem('accuracyDatas'))}
    time={JSON.parse(localStorage.getItem('time'))}
    text='Accuracy Overtime'
    label='Accuracy'
    borderColor='rgba(233,42,23,52)'
  />
</Grid>
<Grid xs={12} item style={{ position: 'absolute' }}>
  <LineChart
    data={JSON.parse(localStorage.getItem('syncDatas'))}
    time={JSON.parse(localStorage.getItem('time'))}
    text='Sync Overtime'
    label='Sync'
    borderColor='rgba(23,100,111,4)'
  />
</Grid>
</Grid> */
}
