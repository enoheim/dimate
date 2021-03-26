const initialState = {
  alert: {
    clickHandler: Function,
    isOpen: false,
    message: '',
  },
  dishes: {
    list: [],
  },
  notification: {
    isShow: false,
    level: 'info',
    message: '',
  },
  users: {
    isSignedIn: false,
    role: '',
    uid: '',
  },
}

export default initialState
