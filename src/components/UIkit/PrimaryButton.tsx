import React from 'react'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    fontSize: '16px',
    height: '48px',
    marginBottom: '16px',
    width: '230px',
  },
}))

type Props = {
  label: string
  onClick: () => void
}

const PrimaryButton: React.FC<Props> = (props) => {
  const classes = useStyles()
  return (
    <Button className={classes.button} variant="contained" onClick={() => props.onClick()}>
      {props.label}
    </Button>
  )
}

export default PrimaryButton
