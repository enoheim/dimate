import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

import { hideAlert } from '../../reducks/alert/operations'
import { getClickHandler, getIsOpen, getMessage } from '../../reducks/alert/selectors'

const AlertDialog: React.FC = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const clickHandler = getClickHandler(selector)
  const isOpen = getIsOpen(selector)
  const message = getMessage(selector)

  return (
    <div>
      <Dialog open={isOpen} onClick={() => dispatch(hideAlert())}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(clickHandler)} color="secondary">
            はい
          </Button>
          <Button onClick={() => dispatch(hideAlert())} color="secondary" autoFocus>
            いいえ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AlertDialog
