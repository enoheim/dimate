import { ListState } from './types'

export const DELETE_DISH = 'DELETE_DISH'

export const deleteDishAction = (dishes: ListState) => {
  return {
    type: 'DELETE_DISH',
    payload: dishes,
  }
}

export const FETCH_DISHES = 'FETCH_DISHES'

export const fetchDishesAction = (dishes: ListState) => {
  return {
    type: 'FETCH_DISHES',
    payload: dishes,
  }
}
