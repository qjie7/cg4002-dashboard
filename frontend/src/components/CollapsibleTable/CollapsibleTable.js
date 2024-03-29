import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
})

function createData(rank, name, points) {
  return {
    rank,
    name,
    points,
    history: [
      { date: '2020-01-05', accuracy: '50%', syncDelay: 3, score: '10' },
      { date: '2020-01-02', accuracy: '80%', syncDelay: 1, score: '5' },
    ],
  }
}

function Row(props) {
  const { row } = props
  const [open, setOpen] = React.useState(false)
  const classes = useRowStyles()

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row' align='left'>
          {row.rank}
        </TableCell>
        <TableCell align='center'> {row.name}</TableCell>
        <TableCell align='center'>{row.points}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1} style={{ backgroundColor: '#a9a9a9' }}>
              <Typography variant='h6' gutterBottom component='div'>
                Dance History
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead style={{ backgroundColor: '#cffcfc' }}>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Accuracy</TableCell>
                    <TableCell align='right'>Sync Delay</TableCell>
                    <TableCell align='right'>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody style={{ backgroundColor: '#3f6641' }}>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component='th' scope='row'>
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.accuracy}</TableCell>
                      <TableCell align='right'>
                        {historyRow.syncDelay}
                      </TableCell>
                      <TableCell align='right'>{historyRow.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

Row.propTypes = {
  row: PropTypes.shape({
    rank: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,

    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
}

const rows = [
  createData(1, 'Jack', 6.0),
  createData(2, 'May', 9.0),
  createData(3, 'Yuki', 16.0),
  createData(4, 'Ben', 3.7),
  createData(5, 'Chris', 16.0),
]

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        <TableHead style={{ backgroundColor: '#fc00f4' }}>
          <TableRow>
            <TableCell />
            <TableCell align='left'>Rank</TableCell>
            <TableCell align='center'>Name&nbsp;</TableCell>
            <TableCell align='center'>Points&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ backgroundColor: '#ffd5ad' }}>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
