import { Reducer } from 'react'

import initialState from '../store/initialState'
import * as Actions from './actions'
import { SignActionState, UserState } from './types'

export const UsersReducer: Reducer<UserState, SignActionState> = (state = initialState.users, action) => {
  switch (action.type) {
    case Actions.SIGN_IN:
      return {
        ...state,
        ...action.payload,
      }
    case Actions.SIGN_OUT:
      return {
        ...action.payload,
      }
    default:
      return state
  }
}
