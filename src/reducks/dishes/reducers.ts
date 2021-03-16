import { Reducer } from 'react'
import * as Actions from './actions'
import initialState from '../store/initialState'
import { FetchActionState, ListState } from './types'

export const DishesReducer: Reducer<ListState, FetchActionState> = (state = initialState.dishes, action) => {
  switch (action.type) {
    case Actions.DELETE_DISH:
      return {
        ...state,
        list: action.payload,
      }
    case Actions.FETCH_DISHES:
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state
  }
}
