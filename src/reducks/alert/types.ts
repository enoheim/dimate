export type AlertActionState = {
  type: string
  payload: AlertState
}

export type AlertState = {
  clickHandler: any
  isOpen: boolean
  message: string
}
