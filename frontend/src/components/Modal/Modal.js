import React, { useRef, useEffect, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import styled from 'styled-components'
import { MdClose } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Grid from '@material-ui/core/Grid'

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

export const Modal = ({
  showModal,
  setShowModal,
  score,
  setScore,
  setAccuracyList,
  accuracyList,
  accuracyAvg,
  setSyncList,
  syncList,
  syncAvg,
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
      if (score === 1) {
        increaseOneScore()
      } else if (score === 2) {
        increaseTwoScore()
      } else if (score === 3) {
        increaseThreeScore()
      } else if (score === 4) {
        increaseFourScore()
      } else if (score === 5) {
        increaseFiveScore()
      } else if (score === 6) {
        increaseSixScore()
      } else if (score === 7) {
        increaseSevenScore()
      } else if (score === 8) {
        increaseEightScore()
      } else if (score === 9) {
        increaseNineScore()
      } else if (score === 10) {
        increaseTenScore()
      }

      setAccuracyDatas((oldDatas) => [...oldDatas, Math.floor(accuracyAvg)])
      localStorage.setItem('accuracyDatas', JSON.stringify(accuracyDatas))

      setSyncDatas((oldDatas) => [...oldDatas, Math.floor(syncAvg)])
      localStorage.setItem('syncDatas', JSON.stringify(syncDatas))

      setTime((oldDatas) => [...oldDatas, new Date().toLocaleTimeString()])
      localStorage.setItem('time', JSON.stringify(time))

      setScore(0)
      setShowModal(false)
    }
  }

  const closeModalWithCross = () => {
    if (score === 1) {
      increaseOneScore()
    } else if (score === 2) {
      increaseTwoScore()
    } else if (score === 3) {
      increaseThreeScore()
    } else if (score === 4) {
      increaseFourScore()
    } else if (score === 5) {
      increaseFiveScore()
    } else if (score === 6) {
      increaseSixScore()
    } else if (score === 7) {
      increaseSevenScore()
    } else if (score === 8) {
      increaseEightScore()
    } else if (score === 9) {
      increaseNineScore()
    } else if (score === 10) {
      increaseTenScore()
    }

    setAccuracyDatas((oldDatas) => [...oldDatas, Math.floor(accuracyAvg)])
    localStorage.setItem('accuracyDatas', JSON.stringify(accuracyDatas))

    setSyncDatas((oldDatas) => [...oldDatas, Math.floor(syncAvg)])
    localStorage.setItem('syncDatas', JSON.stringify(syncDatas))

    setTime((oldDatas) => [...oldDatas, new Date().toLocaleTimeString()])
    localStorage.setItem('time', JSON.stringify(time))
    setShowModal(false)
    setScore(0)
  }

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

  const [flag, setFlag] = useState(true)
  const [accuracyDatas, setAccuracyDatas] = useState(
    JSON.parse(localStorage.getItem('accuracyDatas'))
  )
  const [syncDatas, setSyncDatas] = useState(
    JSON.parse(localStorage.getItem('syncDatas'))
  )

  const [time, setTime] = useState(JSON.parse(localStorage.getItem('time')))

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

  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    return () => document.removeEventListener('keydown', keyPress)
  }, [keyPress])

  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper showModal={showModal}>
              <ModalContentLeft style={{ justifyContent: 'center' }}>
                <Grid container direction='column'>
                  <Grid item xs={12}>
                    <h1>Score</h1>
                    <p>{score}/ 10</p>
                  </Grid>

                  <Grid item xs={12}>
                    <h1>Overall Sync</h1>
                    <p>{Math.floor(syncAvg)}%</p>
                  </Grid>

                  <Grid item xs={12}>
                    <h1>Overall Accuracy</h1>
                    <p>{Math.floor(accuracyAvg)}%</p>
                  </Grid>
                </Grid>
              </ModalContentLeft>
              <ModalContentRight>
                {score > 7 ? (
                  <h1>You are doing great! Keep it up!</h1>
                ) : score > 5 ? (
                  <h1>Practice more! You can be better</h1>
                ) : (
                  <h1>Do not give up! You can do it!</h1>
                )}

                <p>Tips: Watch video tutorial to improve further!</p>
                <Link to='/dancebase'>
                  <button>Watch Now</button>
                </Link>
              </ModalContentRight>
              <CloseModalButton
                aria-label='Close modal'
                onClick={closeModalWithCross}
              />
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  )
}
