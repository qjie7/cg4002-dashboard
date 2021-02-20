import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'

import ReactPlayer from 'react-player'

const useStyles = makeStyles({
  root: {
    width: '100%',
    borderRadius: 25,
    marginBottom: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  media: {
    height: 500,
  },
})

export default function MediaCard(props) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component='iframe'
          className={classes.media}
          src='{props.videolink}'
          title='Contemplative Reptile'
        />

        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            ElbowKick
          </Typography>
          <Typography variant='body2' color='textSecondary' component='p'>
            This move involve coordination between your elbows and legs
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          Share
        </Button>
        <Button size='small' color='primary'>
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}
