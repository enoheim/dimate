import { createSelector } from 'reselect'

import { RootState } from '../users/types'

const noticeSelector = (state: RootState) => state.notification

export const getIsShow = createSelector([noticeSelector], (state) => state.isShow)
export const getLevel = createSelector([noticeSelector], (state) => state.level)
export const getMessage = createSelector([noticeSelector], (state) => state.message)
