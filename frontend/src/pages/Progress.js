import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import LineChart from '../components/LineChart/LineChart'
import BarChartScore from '../components/BarChart/BarChartScore'
import { useState, useEffect } from 'react'

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

        <Grid container item xs={12} spacing={3} width={100}>
          <Grid item xs={12}>
            <LineChart
              data={JSON.parse(localStorage.getItem('syncDatas'))}
              time={JSON.parse(localStorage.getItem('time'))}
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
