import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 150,
    marginRight: 120,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginTop: 25,
  },
})

export default function OutlinedCard(props) {
  const classes = useStyles()

  return (
    <Card className={classes.root} variant='outlined'>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
          align='center'
        >
          {props.title}
        </Typography>

        <Typography
          className={classes.pos}
          color='Secondary'
          variant='h5'
          align='center'
        >
          {props.count}
        </Typography>
      </CardContent>
    </Card>
  )
}
