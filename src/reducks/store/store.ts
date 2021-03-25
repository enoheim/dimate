import { connectRouter, routerMiddleware } from 'connected-react-router'
import { History } from 'history'
import { applyMiddleware, combineReducers, createStore as reduxCreateStore } from 'redux'
import thunk from 'redux-thunk'

import { AlertReducer } from '../alert/reducers'
import { DishesReducer } from '../dishes/reducers'
import { NoticeReducer } from '../notification/reducers'
import { UsersReducer } from '../users/reducers'

const createStore = (history: History) => {
  return reduxCreateStore(
    combineReducers({
      alert: AlertReducer,
      dishes: DishesReducer,
      notification: NoticeReducer,
      router: connectRouter(history),
      users: UsersReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  )
}

export default createStore
