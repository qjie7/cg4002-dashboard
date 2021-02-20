import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  pos: {
    marginTop: 12,
    fontSize: 50,
    textAlign: 'center',
  },
})

export default function SimpleCard(props) {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {props.player}
        </Typography>
        <Typography
          color='textSecondary'
          style={{ textAlign: 'center', fontSize: 50 }}
        >
          {props.danceMove}
        </Typography>
        <Typography className={classes.pos} color='textSecondary' gutterBottom>
          {props.position}
        </Typography>
      </CardContent>
    </Card>
  )
}
