import React from 'react'
import Carousel from 'react-elastic-carousel'
import Item from './Item'
import './VideoCarousel.css'
import ReactPlayer from 'react-player'
import BarChart from '../BarChart/BarChart'
import { useState, useEffect } from 'react'
import Tooltip from '@material-ui/core/Tooltip'

import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from '@material-ui/core/styles'

const defaultTheme = createMuiTheme()
const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: '2em',
        color: 'white',
        backgroundColor: '#503e9d',
      },
      arrow: {
        fontSize: 20,
        color: '#4A4A4A',
        '&::before': {
          backgroundColor: '#503e9d',
        },
      },
    },
  },
})

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
]

function VideoCarousel() {
  const [elbowKickCount, setElbowKickCount] = useState(0)
  const [dabCount, setDabCount] = useState(0)
  const [gunCount, setGunCount] = useState(0)
  const [hairCount, setHairCount] = useState(0)
  const [listenCount, setListenCount] = useState(0)
  const [pointHighCount, setPointHighCount] = useState(0)
  const [sidePumpCount, setSidePumpCount] = useState(0)
  const [wipeTableCount, setWipeTableCount] = useState(0)

  const increaseElbowKickCount = () => {
    setElbowKickCount((prevCount) => {
      const newCount = Number(prevCount) + 1
      localStorage.setItem('elbowKickCount', newCount)
      return newCount
    })
  }

  const increaseDabCount = () => {
    setDabCount((prevCount) => {
      const newCount = Number(prevCount) + 1
      localStorage.setItem('dabCount', newCount)
      return newCount
    })
  }

  const increaseGunCount = () => {
    setGunCount((prevCount) => {
      const newCount = Number(prevCount) + 1
      localStorage.setItem('gunCount', newCount)
      return newCount
    })
  }

  const increaseHairCount = () => {
    setHairCount((prevCount) => {
      const newCount = Number(prevCount) + 1
      localStorage.setItem('hairCount', newCount)
      return newCount
    })
  }

  const increaseListenCount = () => {
    setListenCount((prevCount) => {
      const newCount = Number(prevCount) + 1
      localStorage.setItem('listenCount', newCount)
      return newCount
    })
  }

  const increasePointHighCount = () => {
    setPointHighCount((prevCount) => {
      const newCount = Number(prevCount) + 1
      localStorage.setItem('pointHighCount', newCount)
      return newCount
    })
  }

  const increaseSidePumpCount = () => {
    setSidePumpCount((prevCount) => {
      const newCount = Number(prevCount) + 1
      localStorage.setItem('sidePumpCount', newCount)
      return newCount
    })
  }

  const increaseWipeTableCount = () => {
    setWipeTableCount((prevCount) => {
      const newCount = Number(prevCount) + 1
      localStorage.setItem('wipeTableCount', newCount)
      return newCount
    })
  }

  useEffect(() => {
    const elbowKickValue = localStorage.getItem('elbowKickCount')
    if (elbowKickValue) setElbowKickCount(elbowKickValue)

    const dabValue = localStorage.getItem('dabCount')
    if (dabValue) setDabCount(dabValue)

    const gunValue = localStorage.getItem('gunCount')
    if (gunValue) setGunCount(gunValue)

    const hairValue = localStorage.getItem('hairCount')
    if (hairValue) setHairCount(hairValue)

    const listenValue = localStorage.getItem('listenCount')
    if (listenValue) setListenCount(listenValue)

    const pointHighValue = localStorage.getItem('pointHighCount')
    if (pointHighValue) setPointHighCount(pointHighValue)

    const sidePumpValue = localStorage.getItem('sidePumpCount')
    if (sidePumpValue) setSidePumpCount(sidePumpValue)

    const wipeTableValue = localStorage.getItem('wipeTableCount')
    if (wipeTableValue) setWipeTableCount(wipeTableValue)
  }, [])

  return (
    <>
      <MuiThemeProvider theme={defaultTheme}>
        <div className='videocarousel'>
          <Carousel breakPoints={breakPoints} itemPadding={[10, 10]}>
            <MuiThemeProvider theme={theme}>
              <Tooltip title='Elbow Kick' arrow>
                <Item>
                  <ReactPlayer
                    url='https://www.youtube.com/embed/19GptZzhhjM'
                    onEnded={increaseElbowKickCount}
                  />{' '}
                </Item>
              </Tooltip>
            </MuiThemeProvider>

            <MuiThemeProvider theme={theme}>
              <Tooltip title='Dab' arrow>
                <Item>
                  <ReactPlayer
                    url='https://www.youtube.com/embed/hPFdDhZzwKM'
                    onEnded={increaseDabCount}
                  />{' '}
                </Item>
              </Tooltip>
            </MuiThemeProvider>

            <MuiThemeProvider theme={theme}>
              <Tooltip title='Gun' arrow>
                <Item>
                  <ReactPlayer
                    url='https://www.youtube.com/embed/l1ApsUn-6Pw'
                    onEnded={increaseGunCount}
                  />{' '}
                </Item>
              </Tooltip>
            </MuiThemeProvider>

            <MuiThemeProvider theme={theme}>
              <Tooltip title='Hair' arrow>
                <Item>
                  <ReactPlayer
                    url='https://www.youtube.com/embed/0Mp4zz-33Ow'
                    onEnded={increaseHairCount}
                  />{' '}
                </Item>
              </Tooltip>
            </MuiThemeProvider>

            <MuiThemeProvider theme={theme}>
              <Tooltip title='Listen' arrow>
                <Item>
                  <ReactPlayer
                    url='https://www.youtube.com/embed/Kx3pUsL0hyo'
                    onEnded={increaseListenCount}
                  />{' '}
                </Item>
              </Tooltip>
            </MuiThemeProvider>

            <MuiThemeProvider theme={theme}>
              <Tooltip title='Point High' arrow>
                <Item>
                  <ReactPlayer
                    url='https://www.youtube.com/embed/WMoRZ0K7qFw'
                    onEnded={increasePointHighCount}
                  />{' '}
                </Item>
              </Tooltip>
            </MuiThemeProvider>

            <MuiThemeProvider theme={theme}>
              <Tooltip title='Side Pump' arrow>
                <Item>
                  <ReactPlayer
                    url='https://www.youtube.com/embed/CDT-FrxOqXw'
                    onEnded={increaseSidePumpCount}
                  />{' '}
                </Item>
              </Tooltip>
            </MuiThemeProvider>

            <MuiThemeProvider theme={theme}>
              <Tooltip title='Wipe Table' arrow>
                <Item>
                  <ReactPlayer
                    url='https://www.youtube.com/embed/iTQs6-rYasY'
                    onEnded={increaseWipeTableCount}
                  />{' '}
                </Item>
              </Tooltip>
            </MuiThemeProvider>
          </Carousel>
        </div>
      </MuiThemeProvider>

      <BarChart
        elbowKickCount={elbowKickCount}
        dabCount={dabCount}
        gunCount={gunCount}
        hairCount={hairCount}
        listenCount={listenCount}
        pointHighCount={pointHighCount}
        sidePumpCount={sidePumpCount}
        wipeTableCount={wipeTableCount}
      />
    </>
  )
}

export default VideoCarousel
