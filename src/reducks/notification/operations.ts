import { Dispatch } from 'redux'

import { hideNotificationAction } from './actions'

export const hideNotification = () => {
  return async (dispatch: Dispatch) => {
    dispatch(hideNotificationAction())
  }
}
