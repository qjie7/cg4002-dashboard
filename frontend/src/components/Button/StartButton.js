import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    paddingRight: 40,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}))

export default function StartButton() {
  const classes = useStyles()

  return (
    <div>
      <Button
        variant='contained'
        size='large'
        color='Secondary'
        className={classes.margin}
      >
        START
      </Button>
    </div>
  )
}
