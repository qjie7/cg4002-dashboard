import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
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
      </CardContent>
      <Divider variant='middle' />
    </Card>
  )
})
