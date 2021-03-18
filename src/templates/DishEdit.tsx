import { ImageArea } from 'components/Dishes/'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import { PrimaryButton, SelectBox, TextInput } from '../components/UIkit'
import { db } from '../firebase/index'
import { saveDish } from '../reducks/dishes/operations'
import { ArrayProps, ImageProps } from '../reducks/dishes/types'

const useStyles = makeStyles((theme) => ({
  head: {
    color: theme.palette.secondary.main,
    fontSize: '32px',
  },
  font: {
    color: theme.palette.secondary.main,
    fontSize: '16px',
  },
}))

const DishEdit: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  let id = window.location.pathname.split('/dish/edit')[1]

  if (id !== '') {
    id = id.split('/')[1]
  }

  const [category, setCategory] = useState(''),
    [categories, setCategories] = useState<ArrayProps>([]),
    [images, setImages] = useState<ImageProps>([]),
    [recipeTitle, setRecipeTitle] = useState(''),
    [recipeUrl, setRecipeUrl] = useState(''),
    [ingredients, setIngredients] = useState(''),
    [description, setDescription] = useState('')

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

  useEffect(() => {
    if (id !== '') {
      db.collection('dishes')
        .doc(id)
        .get()
        .then((snapshot) => {
          const data = snapshot.data()
          setCategory(data?.category)
          setImages(data?.images)
          setRecipeTitle(data?.recipeTitle)
          setRecipeUrl(data?.recipeUrl)
          setIngredients(data?.ingredients)
          setDescription(data?.description)
        })
    }
  }, [id])

  useEffect(() => {
    db.collection('categories')
      .orderBy('name', 'asc')
      .get()
      .then((snapshots) => {
        const list: ArrayProps = []
        snapshots.forEach((snapshot) => {
          const data = snapshot.data()
          list.push({
            id: data.id,
            name: data.name,
          })
        })
        setCategories(list)
      })
  }, [])

  return (
    <div className="section-container">
      <div className="spacer-medium" />
      <h2 className={classes.head}>レシピの追加・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} pageId={id} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label={'タイトル'}
          multiline={false}
          required={false}
          onChange={inputRecipeTitle}
          rows={1}
          value={recipeTitle}
          type={'text'}
        />
        <TextInput
          fullWidth={true}
          label={'レシピの参考URL'}
          multiline={false}
          required={false}
          onChange={inputRecipeUrl}
          rows={1}
          value={recipeUrl}
          type={'text'}
        />
        <SelectBox label={'カテゴリ'} required={true} options={categories} select={setCategory} value={category} />
        <TextInput
          fullWidth={true}
          label={'材料'}
          multiline={true}
          required={false}
          onChange={inputIngredients}
          rows={15}
          value={ingredients}
          type={'text'}
        />
        <TextInput
          fullWidth={true}
          label={'手順'}
          multiline={true}
          required={false}
          onChange={inputDescription}
          rows={15}
          value={description}
          type={'text'}
        />
        <div className="spacer-small" />
        <div className="spacer-small" />
        <PrimaryButton
          label={'レシピの追加・編集'}
          onClick={() => dispatch(saveDish(category, description, id, images, ingredients, recipeTitle, recipeUrl))}
        />
      </div>
    </div>
  )
}

export default DishEdit
