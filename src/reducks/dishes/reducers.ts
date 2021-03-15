import { Reducer } from 'react'
// import * as Actions from './actions'
import initialState from '../store/initialState'
import { dishState } from './types'

export const DishesReducer: Reducer<dishState, any> = (state = initialState.dishes, action): dishState => {
  switch (action.type) {
    default:
      return state
  }
}
