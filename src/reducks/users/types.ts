import 'react-redux'

import { RouterState } from 'connected-react-router'

import { ListState } from '../dishes/types'
import { NoticeState } from '../notification/types'

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}

export type RootState = {
  dishes: ListState
  notification: NoticeState
  router: RouterState
  users: UserState
}

export type SignActionState = {
  type: string
  payload: UserState
}

export type UserState = {
  isSignedIn: boolean
  role: string
  uid: string
  username: string
}
