import React from 'react'

import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/styles'

import { ArrayProps } from '../../reducks/dishes/types'

const useStyles = makeStyles({
  root: {
    width: '280px',
  },
})

type Props = {
  label: string
  options: ArrayProps
  required: boolean
  select: (arg0: any) => void
  value: string
}

const SelectBox: React.FC<Props> = (props) => {
  const classes = useStyles()

  return (
    <FormControl className={classes.root}>
      <InputLabel>{props.label}</InputLabel>
      <Select required={props.required} value={props.value} onChange={(event) => props.select(event.target.value)}>
        {props.options.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SelectBox
