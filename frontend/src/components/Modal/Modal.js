import React, { useRef, useEffect, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components'
import { MdClose } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Grid from '@material-ui/core/Grid'
// import Snackbar from '@material-ui/core/Snackbar'
// import MuiAlert from '@material-ui/lab/Alert'
// import { makeStyles } from '@material-ui/core/styles'
// function Alert(props) {
//   return <MuiAlert elevation={6} variant='filled' {...props} />
// }

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`

const ModalContentLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flexstart;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`
const ModalContentRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`

// const useStyles = makeStyles((theme) => ({
//   alert: {
//     width: '100%',
//     marginLeft: '120px',
//   },
// }))

export const Modal = ({
  showModal,
  setShowModal,
  score,
  setScore,
  maxScore,
  setMaxScore,
  accuracy,
  syncAvg,
  posAccuracy,
}) => {
  const modalRef = useRef()

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  })

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      // setAccuracyDatas((oldDatas) => [...oldDatas, Math.floor(accuracyAvg)])
      // localStorage.setItem('accuracyDatas', JSON.stringify(accuracyDatas))

      // setSyncDatas((oldDatas) => [...oldDatas, Math.floor(syncAvg)])
      // localStorage.setItem('syncDatas', JSON.stringify(syncDatas))

      // setTime((oldDatas) => [...oldDatas, new Date().toLocaleTimeString()])
      // localStorage.setItem('time', JSON.stringify(time))

      // if (score === 1) {
      //   increaseOneScore()
      // } else if (score === 2) {
      //   increaseTwoScore()
      // } else if (score === 3) {
      //   increaseThreeScore()
      // } else if (score === 4) {
      //   increaseFourScore()
      // } else if (score === 5) {
      //   increaseFiveScore()
      // } else if (score === 6) {
      //   increaseSixScore()
      // } else if (score === 7) {
      //   increaseSevenScore()
      // } else if (score === 8) {
      //   increaseEightScore()
      // } else if (score === 9) {
      //   increaseNineScore()
      // } else if (score === 10) {
      //   increaseTenScore()
      // }

      setScore(0)
      setMaxScore(0)
      setShowModal(false)
      setSaveStatus(false)
    }
  }
  // const classes = useStyles()
  const closeModalWithCross = () => {
    // setAccuracyDatas((oldDatas) => [...oldDatas, Math.floor(accuracyAvg)])
    // localStorage.setItem('accuracyDatas', JSON.stringify(accuracyDatas))

    // setSyncDatas((oldDatas) => [...oldDatas, Math.floor(syncAvg)])
    // localStorage.setItem('syncDatas', JSON.stringify(syncDatas))

    // setTime((oldDatas) => [...oldDatas, new Date().toLocaleTimeString()])
    // localStorage.setItem('time', JSON.stringify(time))
    // if (score === 1) {
    //   increaseOneScore()
    // } else if (score === 2) {
    //   increaseTwoScore()
    // } else if (score === 3) {
    //   increaseThreeScore()
    // } else if (score === 4) {
    //   increaseFourScore()
    // } else if (score === 5) {
    //   increaseFiveScore()
    // } else if (score === 6) {
    //   increaseSixScore()
    // } else if (score === 7) {
    //   increaseSevenScore()
    // } else if (score === 8) {
    //   increaseEightScore()
    // } else if (score === 9) {
    //   increaseNineScore()
    // } else if (score === 10) {
    //   increaseTenScore()
    // }
    setScore(0)
    setMaxScore(0)
    setShowModal(false)
    setSaveStatus(false)
  }
  const [saveStatus, setSaveStatus] = React.useState(false)
  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return
  //   }

  //   setSaveStatus(true)
  // }

  const [oneScore, setOneScore] = useState(localStorage.getItem('oneScore'))
  const [twoScore, setTwoScore] = useState(localStorage.getItem('twoScore'))
  const [threeScore, setThreeScore] = useState(
    localStorage.getItem('threeScore')
  )
  const [fourScore, setFourScore] = useState(localStorage.getItem('fourScore'))
  const [fiveScore, setFiveScore] = useState(localStorage.getItem('fiveScore'))
  const [sixScore, setSixScore] = useState(localStorage.getItem('sixScore'))
  const [sevenScore, setSevenScore] = useState(
    localStorage.getItem('sevenScore')
  )
  const [eightScore, setEightScore] = useState(
    localStorage.getItem('eightScore')
  )
  const [nineScore, setNineScore] = useState(localStorage.getItem('nineScore'))
  const [tenScore, setTenScore] = useState(localStorage.getItem('tenScore'))

  const [accuracyDatas, setAccuracyDatas] = useState(
    JSON.parse(localStorage.getItem('accuracyDatas'))
  )

  // const [accuracyDatas2, setAccuracyDatas2] = useState(
  //   JSON.parse(localStorage.getItem('accuracyDatas2'))
  // )

  // const [accuracyDatas3, setAccuracyDatas3] = useState(
  //   JSON.parse(localStorage.getItem('accuracyDatas3'))
  // )

  // const [overallAccuracy, setOverallAccuracy] = useState(
  //   JSON.parse(localStorage.getItem('overallAccuracy'))
  // )

  const [syncDatas, setSyncDatas] = useState(
    JSON.parse(localStorage.getItem('syncDatas'))
  )

  const [time, setTime] = useState(JSON.parse(localStorage.getItem('time')))
  const [flag, setFlag] = useState(true)

  const increaseOneScore = () => {
    setOneScore((prevScore) => {
      const newScore = Number(prevScore) + 1
      localStorage.setItem('oneScore', newScore)
      return newScore
    })
  }

  const increaseTwoScore = () => {
    setTwoScore((prevScore) => {
      const newScore = Number(prevScore) + 1
      localStorage.setItem('twoScore', newScore)
      return newScore
    })
  }

  const increaseThreeScore = () => {
    setThreeScore((prevScore) => {
      const newScore = Number(prevScore) + 1
      localStorage.setItem('threeScore', newScore)
      return newScore
    })
  }

  const increaseFourScore = () => {
    setFourScore((prevScore) => {
      const newScore = Number(prevScore) + 1
      localStorage.setItem('fourScore', newScore)
      return newScore
    })
  }

  const increaseFiveScore = () => {
    setFiveScore((prevScore) => {
      const newScore = Number(prevScore) + 1
      localStorage.setItem('fiveScore', newScore)
      return newScore
    })
  }

  const increaseSixScore = () => {
    setSixScore((prevScore) => {
      const newScore = Number(prevScore) + 1
      localStorage.setItem('sixScore', newScore)
      return newScore
    })
  }

  const increaseSevenScore = () => {
    setSevenScore((prevScore) => {
      const newScore = Number(prevScore) + 1
      localStorage.setItem('sevenScore', newScore)
      return newScore
    })
  }

  const increaseEightScore = () => {
    setEightScore((prevScore) => {
      const newScore = Number(prevScore) + 1
      localStorage.setItem('eightScore', newScore)
      return newScore
    })
  }

  const increaseNineScore = () => {
    setNineScore((prevScore) => {
      const newScore = Number(prevScore) + 1
      localStorage.setItem('nineScore', newScore)
      return newScore
    })
  }

  const increaseTenScore = () => {
    setTenScore((prevScore) => {
      const newScore = Number(prevScore) + 1
      localStorage.setItem('tenScore', newScore)
      return newScore
    })
  }

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false)
        setScore(0)
        console.log('I pressed')
      }
    },
    [setShowModal, showModal]
  )

  // let btnRef = useRef()

  const handleSaveButton = (e) => {
    setSaveStatus(true)
    // if (btnRef.current) {
    //   btnRef.current.setAttribute('disabled', 'disabled')
    // }

    // if (score === 1) {
    //   increaseOneScore()
    // } else if (score === 2) {
    //   increaseTwoScore()
    //   // console.log(increaseTwoScore())
    // } else if (score === 3) {
    //   increaseThreeScore()
    // } else if (score === 4) {
    //   increaseFourScore()
    // } else if (score === 5) {
    //   increaseFiveScore()
    // } else if (score === 6) {
    //   increaseSixScore()
    // } else if (score === 7) {
    //   increaseSevenScore()
    // } else if (score === 8) {
    //   increaseEightScore()
    // } else if (score === 9) {
    //   increaseNineScore()
    // } else if (score === 10) {
    //   increaseTenScore()
    // }

    if (Math.floor(accuracy.toFixed(0) / 10) === 1) {
      increaseOneScore()
    } else if (Math.floor(accuracy.toFixed(0) / 10) === 2) {
      increaseTwoScore()
      // console.log(increaseTwoScore())
    } else if (Math.floor(accuracy.toFixed(0) / 10) === 3) {
      increaseThreeScore()
    } else if (Math.floor(accuracy.toFixed(0) / 10) === 4) {
      increaseFourScore()
    } else if (Math.floor(accuracy.toFixed(0) / 10) === 5) {
      increaseFiveScore()
    } else if (Math.floor(accuracy.toFixed(0) / 10) === 6) {
      increaseSixScore()
    } else if (Math.floor(accuracy.toFixed(0) / 10) === 7) {
      increaseSevenScore()
    } else if (Math.floor(accuracy.toFixed(0) / 10) === 8) {
      increaseEightScore()
    } else if (Math.floor(accuracy.toFixed(0) / 10) === 9) {
      increaseNineScore()
    } else if (Math.floor(accuracy.toFixed(0) / 10) === 10) {
      increaseTenScore()
    }

    setAccuracyDatas((oldDatas) => [...oldDatas, Math.floor(accuracy)])
    localStorage.setItem('accuracyDatas', JSON.stringify(accuracyDatas))

    // setAccuracyDatas2((oldDatas) => [...oldDatas, Math.floor(accuracy2)])
    // localStorage.setItem('accuracyDatas2', JSON.stringify(accuracyDatas2))

    // setAccuracyDatas3((oldDatas) => [...oldDatas, Math.floor(accuracy3)])
    // localStorage.setItem('accuracyDatas3', JSON.stringify(accuracyDatas3))

    setSyncDatas((oldDatas) => [...oldDatas, syncAvg.toFixed(4)])
    localStorage.setItem('syncDatas', JSON.stringify(syncDatas))

    setTime((oldDatas) => [...oldDatas, new Date().toLocaleTimeString()])
    localStorage.setItem('time', JSON.stringify(time))
  }

  // useEffect(() => {
  //   setSaveStatus(true)
  //   if (btnRef.current) {
  //     btnRef.current.setAttribute('disabled', 'disabled')
  //   }

  //   if (score === 1) {
  //     increaseOneScore()
  //   } else if (score === 2) {
  //     increaseTwoScore()
  //   } else if (score === 3) {
  //     increaseThreeScore()
  //   } else if (score === 4) {
  //     increaseFourScore()
  //   } else if (score === 5) {
  //     increaseFiveScore()
  //   } else if (score === 6) {
  //     increaseSixScore()
  //   } else if (score === 7) {
  //     increaseSevenScore()
  //   } else if (score === 8) {
  //     increaseEightScore()
  //   } else if (score === 9) {
  //     increaseNineScore()
  //   } else if (score === 10) {
  //     increaseTenScore()
  //   }

  //   setAccuracyDatas((oldDatas) => [...oldDatas, Math.floor(accuracyAvg)])
  //   localStorage.setItem('accuracyDatas', JSON.stringify(accuracyDatas))

  //   setSyncDatas((oldDatas) => [...oldDatas, Math.floor(syncAvg)])
  //   localStorage.setItem('syncDatas', JSON.stringify(syncDatas))

  //   setTime((oldDatas) => [...oldDatas, new Date().toLocaleTimeString()])
  //   localStorage.setItem('time', JSON.stringify(time))
  // }, [saveStatus])

  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    // setScore(0)
    // setShowModal(false)
    // setSaveStatus(false)
    return () => document.removeEventListener('keydown', keyPress)
  }, [keyPress])

  // const handleSaveButton = () => {
  //   console.log(flag)
  //   if (flag) {
  //     if (score === 1) {
  //       increaseOneScore()
  //     } else if (score === 2) {
  //       increaseTwoScore()
  //     } else if (score === 3) {
  //       increaseThreeScore()
  //     } else if (score === 4) {
  //       increaseFourScore()
  //     } else if (score === 5) {
  //       increaseFiveScore()
  //     } else if (score === 6) {
  //       increaseSixScore()
  //     } else if (score === 7) {
  //       increaseSevenScore()
  //     } else if (score === 8) {
  //       increaseEightScore()
  //     } else if (score === 9) {
  //       increaseNineScore()
  //     } else if (score === 10) {
  //       increaseTenScore()
  //     }
  //   }
  //   setAccuracyDatas((oldDatas) => [...oldDatas, Math.floor(accuracyAvg)])
  //   localStorage.setItem('accuracyDatas', JSON.stringify(accuracyDatas))

  //   setSyncDatas((oldDatas) => [...oldDatas, Math.floor(syncAvg)])
  //   localStorage.setItem('syncDatas', JSON.stringify(syncDatas))

  //   setTime((oldDatas) => [...oldDatas, new Date().toLocaleTimeString()])
  //   localStorage.setItem('time', JSON.stringify(time))
  //   setFlag(false)
  //   console.log(flag)
  // }

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalContentLeft style={{ justifyContent: 'center' }}>
                <Grid container direction='column'>
                  <Grid item xs={12}>
                    <h1>Position Accuracy</h1>
                    <p>{Math.floor(posAccuracy.toFixed(1))}%</p>
                  </Grid>

                  <Grid item xs={12}>
                    <h1>Team Accuracy</h1>
                    <p>{Math.floor(accuracy.toFixed(1))}%</p>
                  </Grid>

                  <Grid item xs={12}>
                    <h1>Overall Sync</h1>
                    <p>{syncAvg.toFixed(4)}ms</p>
                  </Grid>

                  <Grid item xs={12}>
                    <h1>Team Score</h1>
                    <p>{Math.floor(accuracy.toFixed(0) / 10)}</p>
                  </Grid>
                </Grid>

                {/* <button ref={btnRef} onClick={handleSaveButton}> */}
                <button onClick={handleSaveButton}>Save</button>
                <p>{saveStatus ? 'saved!' : ''}</p>
              </ModalContentLeft>
              <ModalContentRight>
                <div>
                  {accuracy > 80 ? (
                    <h1>You are doing great! Keep it up!</h1>
                  ) : accuracy > 50 ? (
                    <h1>Practice more! You can be better</h1>
                  ) : (
                    <h1>Do not give up! You can do it!</h1>
                  )}
                  <p>Tips: Watch video tutorial to improve further!</p>
                  <Link to='/dancebase'>
                    <button>Watch Now</button>
                  </Link>
                </div>
              </ModalContentRight>
              <CloseModalButton
                aria-label='Close modal'
                onClick={closeModalWithCross}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}

      {/* <Snackbar
        open={!saveStatus}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='error' className={classes.alert}>
          Saved!
        </Alert>
      </Snackbar> */}
    </>
  )
}
