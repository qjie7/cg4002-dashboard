import React from 'react'
import Carousel from 'react-elastic-carousel'
import Item from './Item'
import './VideoCarousel.css'
import ReactPlayer from 'react-player'

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
]

function VideoCarousel() {
  return (
    <>
      <div className='videocarousel'>
        <Carousel breakPoints={breakPoints}>
          <Item>
            <ReactPlayer url='https://www.youtube.com/embed/19GptZzhhjM' />{' '}
          </Item>
          <Item>
            <ReactPlayer url='https://www.youtube.com/embed/hPFdDhZzwKM' />{' '}
          </Item>
          <Item>
            <ReactPlayer url='https://www.youtube.com/embed/l1ApsUn-6Pw' />{' '}
          </Item>
          <Item>
            <ReactPlayer url='https://www.youtube.com/embed/0Mp4zz-33Ow' />{' '}
          </Item>

          <Item>
            <ReactPlayer url='https://www.youtube.com/embed/Kx3pUsL0hyo' />{' '}
          </Item>
          <Item>
            <ReactPlayer url='https://www.youtube.com/embed/WMoRZ0K7qFw' />{' '}
          </Item>
          <Item>
            <ReactPlayer url='https://www.youtube.com/embed/iTQs6-rYasY' />{' '}
          </Item>
        </Carousel>
      </div>
    </>
  )
}

export default VideoCarousel
