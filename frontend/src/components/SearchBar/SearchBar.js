import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import { FaSearch } from 'react-icons/fa'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useState } from 'react'
const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 1000,
    marginBottom: 50,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}))

// export default function SearchBar() {
//   const classes = useStyles()

//   return (
//     <Paper component='form' className={classes.root}>
//       {/* <div style={{ width: 300 }}> */}
//       <Autocomplete
//         freeSolo
//         id='free-solo-2-demo'
//         disableClearable
//         options={danceMoves.map((option) => option.name)}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label='Search input'
//             margin='normal'
//             variant='outlined'
//             InputProps={{ ...params.InputProps, type: 'search' }}
//           />
//         )}
//       />
//       {/* </div> */}
//       <InputBase
//         className={classes.input}
//         placeholder='Search Moves...'
//         inputProps={{ 'aria-label': 'Search Moves...' }}
//       />
//       <IconButton
//         type='submit'
//         className={classes.iconButton}
//         aria-label='search'
//       >
//         <SearchIcon />
//       </IconButton>
//     </Paper>
//   )
// }

// /* eslint-disable no-use-before-define */
// import React from 'react'
// import TextField from '@material-ui/core/TextField'
// import Autocomplete from '@material-ui/lab/Autocomplete'

export default function SearchBar() {
  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        freeSolo
        id='free-solo-2-demo'
        disableClearable
        options={danceMoves.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Search input'
            margin='normal'
            variant='outlined'
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
    </div>
  )
}

const danceMoves = [
  { name: 'Dab' },
  { name: 'Elbow Kick' },
  { name: 'Gun' },
  { name: 'Hair' },
  { name: 'Listen' },
  { name: 'Point High' },
  { name: 'Side Pump' },
  { name: 'Wipe Table' },
]
