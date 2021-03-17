import { push } from 'connected-react-router'
import { Dispatch } from 'redux'

import { db, FirebaseTimestamp } from '../../firebase'
import { deleteDishAction, fetchDishesAction } from './actions'
import { DishState, ImageProps } from './types'

const dishesRef = db.collection('dishes')

export const deleteDish = (id: string) => {
  return async (dispatch: Dispatch, getState: any) => {
    dishesRef
      .doc(id)
      .delete()
      .then(() => {
        const prevDishes = getState().dishes.list
        const nextDishes = prevDishes.filter((dish: DishState) => dish.id !== id)
        dispatch(deleteDishAction(nextDishes))
      })
  }
}

export const fetchDishes = () => {
  return async (dispatch: Dispatch) => {
    dishesRef
      .orderBy('updated_at', 'desc')
      .get()
      .then((snapshots) => {
        const dishList: any = []
        snapshots.forEach((snapshot) => {
          const dish = snapshot.data()
          dishList.push(dish)
        })
        dispatch(fetchDishesAction(dishList))
      })
  }
}

export const saveDish = (
  id: string,
  images: ImageProps,
  recipeTitle: string,
  recipeUrl: string,
  ingredients: string,
  description: string
) => {
  return async (dispatch: Dispatch) => {
    const timestamp = FirebaseTimestamp.now()

    // 定義に無いプロパティ(id, created_at)対策の型定義
    type dbData = {
      id: string
      images: ImageProps
      recipeTitle: string
      recipeUrl: string
      ingredients: string
      description: string
      updated_at: typeof timestamp
      created_at: typeof timestamp
    }

    const data = <dbData>{
      images: images,
      recipeTitle: recipeTitle,
      recipeUrl: recipeUrl,
      ingredients: ingredients,
      description: description,
      updated_at: timestamp,
    }

    if (id === '') {
      const ref = dishesRef.doc()
      id = ref.id
      data.id = id
      data.created_at = timestamp
    }

    return dishesRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push('/'))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}
