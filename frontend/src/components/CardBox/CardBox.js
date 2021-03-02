import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import { Divider, makeStyles } from '@material-ui/core'
import CardHeader from '@material-ui/core/CardHeader'

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: 'center',
  },
  header: {
    textAlign: 'center',
    spacing: 10,
  },
  list: {
    padding: '20px',
  },
  button: {
    margin: theme.spacing(1),
  },
  action: {
    display: 'flex',
    justifyContent: 'space-around',
  },
}))

export const CardBox = React.memo(function CardBox(props) {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardHeader title={props.title} className={classes.header} />
      <Divider variant='middle' />
      <CardContent>
        <Typography variant='h4' align='center'>
          {props.content}
        </Typography>
        {/* <div className={classes.list}>
          <Typography align='center'>Manage tasks</Typography>
          <Typography align='center'>Sync notes</Typography>
          <Typography align='center'>Set deadline</Typography>
        </div> */}
      </CardContent>
      <Divider variant='middle' />
      {/* <CardActions className={classes.action}>
        <Button variant='contained' color='primary' className={classes.button}>
          Buy
        </Button>
      </CardActions> */}
    </Card>
  )
})
