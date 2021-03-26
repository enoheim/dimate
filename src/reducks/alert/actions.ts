export const HIDE_ALERT = 'HIDE_ALERT'

export const hideAlertAction = () => {
  return {
    type: 'HIDE_ALERT',
    payload: {
      clickHandler: Function,
      isOpen: false,
      message: '',
    },
  }
}

export const SHOW_ALERT = 'SHOW_ALERT'

export const showAlertAction = (clickHandler: any, message: string) => {
  return {
    type: 'SHOW_ALERT',
    payload: {
      clickHandler: clickHandler,
      isOpen: true,
      message: message,
    },
  }
}
