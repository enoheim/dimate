import { push } from 'connected-react-router'
import { Dispatch } from 'redux'

import { db, FirebaseTimestamp } from '../../firebase'
import { deleteDishAction, fetchDishesAction } from './actions'
import { DishState, ImageProps } from './types'

export const deleteDish = (id: string, uid: string) => {
  return async (dispatch: Dispatch, getState: any) => {
    const dishesRef = db.collection('users').doc(uid).collection('dishes')
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

export const fetchDishes = (category: string, uid: string) => {
  return async (dispatch: Dispatch) => {
    const dishesRef = db.collection('users').doc(uid).collection('dishes')
    let query = dishesRef.orderBy('recipeTitle', 'asc')
    query = category !== '' ? query.where('category', '==', category) : query
    query.get().then((snapshots) => {
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
  category: string,
  description: string,
  id: string,
  images: ImageProps,
  ingredients: string,
  recipeTitle: string,
  recipeUrl: string,
  uid: string
) => {
  return async (dispatch: Dispatch) => {
    const dishesRef = db.collection('users').doc(uid).collection('dishes')
    const timestamp = FirebaseTimestamp.now()

    // 定義に無いプロパティ(id, created_at)対策の型定義
    type dbData = {
      category: string
      created_at: typeof timestamp
      description: string
      id: string
      images: ImageProps
      ingredients: string
      recipeTitle: string
      recipeUrl: string
      updated_at: typeof timestamp
    }

    const data = <dbData>{
      category: category,
      description: description,
      images: images,
      ingredients: ingredients,
      recipeTitle: recipeTitle,
      recipeUrl: recipeUrl,
      updated_at: timestamp,
    }

    if (id === '/dish/edit') {
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
