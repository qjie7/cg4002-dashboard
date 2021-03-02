import React from 'react'
import { Card, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PieChart from '../components/PieChart/PieChart'
import OutlinedCard from '../components/OutlinedCard/OutlinedCard'
import LineChart from '../components/LineChart/LineChart'
import BarChartScore from '../components/BarChart/BarChartScore'
import { useState, useEffect } from 'react'
import { CardBox } from '../components/CardBox/CardBox'
// import {
//   BarChart,
//   Bar,
//   Line,
//   LineChart,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   Legend,
// } from 'recharts'
const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 120,
  },
  heading: {
    fontSize: '4.5em',
    letterSpacing: '-1px',
    backgroundColor: '#503e9d',
    color: 'white',
  },
})

function Progress({ borderColor }) {
  // const [zeroScore, setZeroScore] = useState(0)
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
  // const [accuracyDatas, setAccuracyDatas] = useState([0])
  // const [syncDatas, setSyncDatas] = useState([0])
  // const [time, setTime] = useState([0])
  const classes = useStyles()

  useEffect(() => {
    // const zeroValue = localStorage.getItem('zeroScore')
    // if (zeroValue) setZeroScore(zeroValue)

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

    // const accuracyValue = localStorage.getItem('accuracyDatas')
    // if (!accuracyValue) setAccuracyDatas([0])

    // const syncValue = localStorage.getItem('syncDatas')
    // if (!syncValue) setSyncDatas([0])

    // const timeValue = localStorage.getItem('time')
    // if (!timeValue) setTime([0])

    // const tenValue = localStorage.getItem('tenScore')
    // if (tenValue) setTenScore(tenValue)
  }, [])

  return (
    <>
      <Grid container justify='center' style={{ marginTop: '-10px' }}>
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
              // zeroScore={zeroScore}
              oneScore={oneScore}
              twoScore={twoScore}
              threeScore={threeScore}
              fourScore={fourScore}
              fiveScore={fiveScore}
              sixScore={sixScore}
              sevenScore={sevenScore}
              eightScore={eightScore}
              nineScore={nineScore}
              tenScore={tenScore}
            />
          </Grid>
          {/* 
          <Grid
            item
            xs={3}
            style={{ position: 'absolute', right: '10px', top: '125px' }}
          >
            <CardBox
              title='High Score'
              content={localStorage.getItem('highScore')}
            />
          </Grid>
          <Grid
            item
            xs={3}
            style={{ position: 'absolute', right: '20%', top: '125px' }}
          >
            <CardBox title='Total Practice' content='' />
          </Grid> */}
        </Grid>

        <Grid container direction='column' item xs={12} spacing={3}>
          <Grid xs={6} item>
            <LineChart
              data={JSON.parse(localStorage.getItem('accuracyDatas'))}
              // data={accuracyDatas}
              time={JSON.parse(localStorage.getItem('time'))}
              // time={time}
              text='Accuracy Overtime'
              label='Accuracy'
              borderColor='rgba(233,42,23,52)'
            />
          </Grid>
          <Grid xs={6} item style={{ position: 'absolute', left: '800px' }}>
            <LineChart
              data={JSON.parse(localStorage.getItem('syncDatas'))}
              // data={syncDatas}
              time={JSON.parse(localStorage.getItem('time'))}
              // time={time}
              text='Sync Overtime'
              label='Sync'
              borderColor='rgba(23,100,111,4)'
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Progress
