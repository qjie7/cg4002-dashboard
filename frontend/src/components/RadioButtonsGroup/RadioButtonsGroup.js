import React from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

export default function RadioButtonsGroup() {
  const [value, setValue] = React.useState('speed')

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <FormControl
      component='fieldset'
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        marginBottom: '50px',
        marginLeft: '140px',
        marginTop: '50px',
      }}
    >
      <FormLabel component='legend'>Select a mode</FormLabel>
      <RadioGroup
        row
        aria-label='mode'
        name='mode'
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel
          value='speed'
          control={<Radio />}
          label='Speed Mode'
        />
        <FormControlLabel value='sync' control={<Radio />} label='Sync Mode' />
        <FormControlLabel
          value='practice'
          control={<Radio />}
          label='Practice Mode'
        />
      </RadioGroup>
    </FormControl>
  )
}
