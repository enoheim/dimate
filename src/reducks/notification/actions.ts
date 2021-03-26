export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'

export const hideNotificationAction = () => {
  return {
    type: 'HIDE_NOTIFICATION',
    payload: {
      isShow: false,
      level: 'info',
      message: '',
    },
  }
}

export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'

export const showNotificationAction = (level: any, message: string) => {
  return {
    type: 'SHOW_NOTIFICATION',
    payload: {
      isShow: true,
      level: level,
      message: message,
    },
  }
}
