import { push } from 'connected-react-router'
import { Dispatch } from 'redux'
import { db, FirebaseTimestamp } from '../../firebase'

const dishesRef = db.collection('dishes')

export const saveDish = (recipeTitle: string, recipeUrl: string, ingredients: string, description: string) => {
  return async (dispatch: Dispatch) => {
    const timestamp = FirebaseTimestamp.now()

    // 定義に無いプロパティ(id, created_at)対策の型定義
    type dbData = {
      recipeTitle: string
      recipeUrl: string
      ingredients: string
      description: string
      updated_at: typeof timestamp
      id: string
      created_at: typeof timestamp
    }

    const data = <dbData>{
      recipeTitle: recipeTitle,
      recipeUrl: recipeUrl,
      ingredients: ingredients,
      description: description,
      updated_at: timestamp,
    }

    const ref = dishesRef.doc()
    const id = ref.id
    data.id = id
    data.created_at = timestamp

    return dishesRef
      .doc(id)
      .set(data)
      .then(() => {
        dispatch(push('/'))
      })
      .catch((error) => {
        throw new Error(error)
      })
  }
}
