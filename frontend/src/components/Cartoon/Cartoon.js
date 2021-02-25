import React from 'react'
import './Cartoon.css'

function Cartoon() {
  return (
    <div className='wrapper'>
      <div className='border-circle' id='one' />
      <div className='border-circle' id='two' />
      <div className='background-circle'>
        <div className='triangle-light' />
        <div className='body' />
        {/* <span className='shirt-text'>I</span>
        <span className='shirt-text'>♥</span>
        <span className='shirt-text'>N</span>
        <span className='shirt-text'>U</span>
        <span className='shirt-text'>S</span> */}
        <span className='shirt-text'>D</span>
        <span className='shirt-text'>♥</span>
        <span className='shirt-text'>N</span>
        <span className='shirt-text'>C</span>
        <span className='shirt-text'>E</span>

        <div className='triangle-dark' />
      </div>

      <div className='head'>
        <div id='SpeechBubble'>I'm a rectangle</div>
        <div className='ear' id='left' />
        <div className='ear' id='right' />
        <div className='hair-main'>
          <div className='sideburn' id='left' />
          <div className='sideburn' id='right' />
          <div className='hair-top' />
        </div>
        <div className='face'>
          <div className='hair-bottom' />
          <div className='nose' />
          <div className='eye-shadow' id='left'>
            <div className='eyebrow' />
            <div className='eye' />
          </div>
          <div className='eye-shadow' id='right'>
            <div className='eyebrow' />
            <div className='eye' />
          </div>
          <div className='mouth' />
          <div className='shadow-wrapper'>
            <div className='shadow' />
          </div>
        </div>
      </div>
      <span className='music-note' id='one'>
        ♫
      </span>
      <span className='music-note' id='two'>
        ♪
      </span>
    </div>
  )
}

export default Cartoon
