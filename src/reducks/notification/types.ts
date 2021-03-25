export type NoticeActionState = {
  type: string
  payload: NoticeState
}

export type NoticeState = {
  isShow: boolean
  level: any
  message: string
}
