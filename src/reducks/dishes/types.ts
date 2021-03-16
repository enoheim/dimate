export type DishState = {
  description: string
  id: string
  images: ImageProps
  ingredients: string
  recipeTitle: string
  recipeUrl: string
}

export type FetchActionState = {
  type: string
  payload: Array<DishState>
}

export type ImageProps = {
  id: string
  path: string
}[]

export type ListState = {
  list: Array<DishState>
}
