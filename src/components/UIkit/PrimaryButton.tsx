import React from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  button: {
    backgroundColor: '#00a3af',
    color: '#ffffff',
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
  },
})

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
