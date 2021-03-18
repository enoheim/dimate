import React, { useCallback } from 'react'

import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'

import { db, storage } from '../../firebase/index'
import { ImageProps } from '../../reducks/dishes/types'
import { ImagePreview } from './index'

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.secondary.main,
    height: 48,
    width: 48,
  },
  font: {
    color: theme.palette.secondary.main,
    fontSize: '16px',
  },
}))

type Props = {
  images: ImageProps
  pageId?: string
  setImages: (arg0: any) => void
}

const ImageArea: React.FC<Props> = (props) => {
  const classes = useStyles()

  const deleteImage = useCallback(
    async (id) => {
      const ret = window.confirm('この写真を削除しますか？')
      if (!ret) {
        return false
      } else {
        const newImages = props.images.filter((image) => image.id !== id)
        props.setImages(newImages)
        if (props.pageId) {
          const updateRef = db.collection('dishes').doc(props.pageId)
          await updateRef.update({
            images: newImages,
          })
        }
        return storage.ref('images').child(id).delete()
      }
    },
    [props.images]
  )

  const uploadImage = useCallback(
    (event) => {
      const file = event.target.files
      const blob = new Blob(file, { type: 'image' })

      const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      const N = 16
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('')

      const uploadRef = storage.ref('images').child(fileName)
      const uploadTask = uploadRef.put(blob)

      uploadTask.then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newImage = { id: fileName, path: downloadURL }
          props.setImages((prevState: ImageProps) => [...prevState, newImage])
        })
      })
    },
    [props.setImages]
  )

  return (
    <div>
      <div className="list-media">
        {props.images.length > 0 &&
          props.images.map((image) => (
            <ImagePreview delete={deleteImage} id={image.id} path={image.path} key={image.id} />
          ))}
      </div>
      <div className="text-right">
        <span className={classes.font}>写真の登録</span>
        <IconButton className={classes.icon}>
          <label>
            <AddPhotoAlternateIcon />
            <input className="display-none" type="file" id="image" onChange={(event) => uploadImage(event)} />
          </label>
        </IconButton>
      </div>
    </div>
  )
}

export default ImageArea
