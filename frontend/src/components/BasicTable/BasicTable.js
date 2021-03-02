import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles({
  table: {
    width: '85vw',
  },
})

export default function BasicTable(props) {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Dance Move</TableCell>
            <TableCell align='center'>{props.member1Name}'s Position</TableCell>
            <TableCell align='center'>{props.leaderName}'s Position</TableCell>
            <TableCell align='center'>{props.member2Name}'s Position</TableCell>
            <TableCell align='center'>Matching Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align='center' component='th' scope='row'>
              {props.danceMove}
            </TableCell>
            <TableCell align='center'>{props.position1}</TableCell>
            <TableCell align='center'>{props.position2}</TableCell>
            <TableCell align='center'>{props.position3}</TableCell>
            <TableCell align='center'>
              <Typography
                style={{
                  backgroundColor: props.correctness ? 'green' : 'red',
                  color: 'white',
                }}
              >
                {props.correctness ? 'Matched!' : 'Not matched!'}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
