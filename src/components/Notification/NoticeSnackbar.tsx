import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

import { hideNotification } from '../../reducks/notification/operations'
import { getIsShow, getLevel, getMessage } from '../../reducks/notification/selectors'

const useStyles = makeStyles(() => ({
  root: {
    height: 160,
  },
}))

const Alert: React.FC<AlertProps> = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const NoticeSnackbar: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const isShow = getIsShow(selector)
  const message = getMessage(selector)
  const level = getLevel(selector)

  return (
    <Snackbar
      className={classes.root}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={1500}
      open={isShow}
      onClose={() => dispatch(hideNotification())}
    >
      <Alert onClose={() => dispatch(hideNotification())} severity={level}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default NoticeSnackbar
