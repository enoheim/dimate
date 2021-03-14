import 'react-redux'
import { RouterState } from 'connected-react-router'

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}

export type RootState = {
  router: RouterState
  users: UserState
}

export type UserState = {
  isSignedIn: boolean
  role: string
  uid: string
  username: string
}

export type SignActionState = {
  type: string
  payload: UserState
}
