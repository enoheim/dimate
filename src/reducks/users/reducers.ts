import { Reducer } from 'react'
import * as Actions from './actions'
import initialState from '../store/initialState'
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
