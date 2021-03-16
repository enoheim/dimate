import { createSelector } from 'reselect'
import { RootState } from '../users/types'

const dishesSelector = (state: RootState) => state.dishes

export const getDishes = createSelector([dishesSelector], (state) => state.list)
