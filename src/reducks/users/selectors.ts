import { createSelector } from 'reselect'

import { RootState } from './types'

const usersSelector = (state: RootState) => state.users

export const getIsSignedIn = createSelector([usersSelector], (state) => state.isSignedIn)
export const getUserId = createSelector([usersSelector], (state) => state.uid)
export const getUserRole = createSelector([usersSelector], (state) => state.role)
