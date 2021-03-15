import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { History } from 'history'
import { DishesReducer } from '../dishes/reducers'
import { UsersReducer } from '../users/reducers'

const createStore = (history: History) => {
  return reduxCreateStore(
    combineReducers({
      dishes: DishesReducer,
      router: connectRouter(history),
      users: UsersReducer,
    }),
    applyMiddleware(routerMiddleware(history), thunk)
  )
}

export default createStore