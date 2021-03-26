export type ArrayProps = {
  id: string
  name: string
}[]

export type DishState = {
  category: string
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
