import React from 'react'
import './SpeechBubble.css'
import Typography from '@material-ui/core/Typography'

function SpeechBubble(props) {
  return (
    <>
      <div className='speech-bubble'>
        <Typography variant={props.type}>{props.message}</Typography>
      </div>
    </>
  )
}

export default SpeechBubble
