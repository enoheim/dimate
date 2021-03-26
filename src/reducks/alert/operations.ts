import { Dispatch } from 'redux'

import { hideAlertAction, showAlertAction } from './actions'

export const hideAlert = () => {
  return async (dispatch: Dispatch) => {
    dispatch(hideAlertAction())
  }
}

export const showAlert = (clickHandler: any, message: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(showAlertAction(clickHandler, message))
  }
}
