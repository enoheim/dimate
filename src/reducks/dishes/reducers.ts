import { Reducer } from 'react'
// import * as Actions from './actions'
import initialState from '../store/initialState'
import { DishState } from './types'

export const DishesReducer: Reducer<DishState, any> = (state = initialState.dishes, action): DishState => {
  switch (action.type) {
    default:
      return state
  }
}
