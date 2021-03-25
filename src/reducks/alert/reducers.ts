import { Reducer } from 'react'

import initialState from '../store/initialState'
import * as Actions from './actions'
import { AlertActionState, AlertState } from './types'

export const AlertReducer: Reducer<AlertState, AlertActionState> = (state = initialState.alert, action) => {
  switch (action.type) {
    case Actions.HIDE_ALERT:
      return {
        ...action.payload,
      }
    case Actions.SHOW_ALERT:
      return {
        ...action.payload,
      }
    default:
      return state
  }
}
