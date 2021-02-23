import React from 'react'
import './DancerCard.css'
import { Grid } from '@material-ui/core'

function DancerCard(props) {
  return (
    <>
      <div className='card'>
        <Grid
          style={{
            width: '180px',
            height: '100px',
            position: 'relative',
            left: '65px',
          }}
          className='card-image'
          style={{
            // background: `url(${props.userImage})`,
            background: `url(https://source.unsplash.com/${props.userImage}/640x426)`,
            backgroundSize: 'cover',
          }}
        >
          {/* {' '}
          <img className='card-image' src={props.userImage} alt='' /> */}
        </Grid>

        <div className='card-text'>
          <h2>{props.name}</h2>
          <div className='card-dance-name'>{props.danceMove}</div>
        </div>
        <div className='card-stats'>
          <div className='stat'>
            <div className='value'>100%</div>
            <div className='type'>Accuracy</div>
          </div>
          <div className='stat border'>
            <div className='value'>{props.position}</div>
            <div className='type'>Position</div>
          </div>
          <div className='stat'>
            <div className='value'>57%</div>
            <div className='type'>Sync</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DancerCard
