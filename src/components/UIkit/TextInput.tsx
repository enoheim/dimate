import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '280px',
  },
}))

type Props = {
  fullWidth: boolean
  label: string
  multiline: boolean
  required: boolean
  rows: number
  value: string
  type: string
  onChange: any
}

const TextInput: React.FC<Props> = (props: Props) => {
  const classes = useStyles()

  return (
    <TextField
      className={classes.root}
      fullWidth={props.fullWidth}
      label={props.label}
      margin="dense"
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
    />
  )
}

export default TextInput
