import React from 'react'
import './DancerCard.css'
import { Grid } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'

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
            background: `url(https://source.unsplash.com/${props.userImage}/299x211)`,
            backgroundSize: 'cover',
          }}
        ></Grid>

        <div className='card-text'>
          <Tooltip title='Edit Name'>
            <h2 className='card-name' onClick={props.handleClickOpen}>
              {props.name}
            </h2>
          </Tooltip>

          <div className='card-dance-name'>{props.danceMove}</div>
        </div>

        <div className='card-stats'>
          <div className='stat border'>
            <div className='value'>{props.posAccuracy}%</div>
            <div className='type'>Pos Acc</div>
          </div>
          <div className='stat'>
            <div className='value'>{props.accuracy}%</div>
            <div className='type'>Accuracy</div>
          </div>

          <div className='stat'>
            <div className='value'>{props.sync}ms</div>
            <div className='type'>Sync</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DancerCard
