import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ImageArea } from 'components/Dishes/'
import { PrimaryButton, TextInput } from '../components/UIkit'
import { saveDish } from '../reducks/dishes/operations'
import { ImageProps } from '../reducks/dishes/types'

const DishEdit: React.FC = () => {
  const dispatch = useDispatch()

  const [recipeTitle, setRecipeTitle] = useState(''),
    [recipeUrl, setRecipeUrl] = useState(''),
    [ingredients, setIngredients] = useState(''),
    [description, setDescription] = useState(''),
    [images, setImages] = useState<ImageProps>([])

  const inputRecipeTitle = useCallback(
    (event) => {
      setRecipeTitle(event.target.value)
    },
    [setRecipeTitle]
  )

  const inputRecipeUrl = useCallback(
    (event) => {
      setRecipeUrl(event.target.value)
    },
    [setRecipeUrl]
  )

  const inputIngredients = useCallback(
    (event) => {
      setIngredients(event.target.value)
    },
    [setIngredients]
  )

  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value)
    },
    [setDescription]
  )

  return (
    <section>
      <h2 className="u-text__headline u-text-center">レシピの追加</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label={'タイトル'}
          multiline={false}
          required={true}
          onChange={inputRecipeTitle}
          rows={1}
          value={recipeTitle}
          type={'text'}
        />
        <TextInput
          fullWidth={true}
          label={'参考URL'}
          multiline={false}
          required={false}
          onChange={inputRecipeUrl}
          rows={1}
          value={recipeUrl}
          type={'text'}
        />
        <TextInput
          fullWidth={true}
          label={'材料'}
          multiline={true}
          required={false}
          onChange={inputIngredients}
          rows={3}
          value={ingredients}
          type={'text'}
        />
        <TextInput
          fullWidth={true}
          label={'説明'}
          multiline={true}
          required={false}
          onChange={inputDescription}
          rows={15}
          value={description}
          type={'text'}
        />
        <div className="module-spacer--medium" />
        <div className="center">
          <PrimaryButton
            label={'レシピを登録'}
            onClick={() => dispatch(saveDish(recipeTitle, recipeUrl, ingredients, description, images))}
          />
        </div>
      </div>
    </section>
  )
}

export default DishEdit
