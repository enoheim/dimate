import { createSelector } from 'reselect'

import { RootState } from '../users/types'

const alertSelector = (state: RootState) => state.alert

export const getClickHandler = createSelector([alertSelector], (state) => state.clickHandler)
export const getIsOpen = createSelector([alertSelector], (state) => state.isOpen)
export const getMessage = createSelector([alertSelector], (state) => state.message)
