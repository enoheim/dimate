import { Reducer } from 'react'

import initialState from '../store/initialState'
import * as Actions from './actions'
import { NoticeActionState, NoticeState } from './types'

export const NoticeReducer: Reducer<NoticeState, NoticeActionState> = (state = initialState.notification, action) => {
  switch (action.type) {
    case Actions.HIDE_NOTIFICATION:
      return {
        ...action.payload,
      }
    case Actions.SHOW_NOTIFICATION:
      return {
        ...action.payload,
      }
    default:
      return state
  }
}
