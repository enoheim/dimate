import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { ImageSwiper } from '../components/Dishes'
import { db } from '../firebase'
import { returnCodeToBr } from '../function/common'

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 24px auto',
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 400,
      width: 400,
    },
  },
  detail: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 16px auto',
      height: 'auto',
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 'auto',
      width: 400,
    },
  },
}))

const DishDetail: React.FC = () => {
  const classes = useStyles()
  const selector = useSelector((state) => state)
  const path = selector.router.location.pathname
  const id = path.split('/dish/')[1]

  const [dish, setDish] = useState<any>(null)

  useEffect(() => {
    db.collection('dishes')
      .doc(id)
      .get()
      .then()
      .then((doc) => {
        const data: any = doc.data()
        setDish(data)
      })
  }, [])

  return (
    <section className="c-section-wrapin">
      {dish && (
        <div className="p-grid__row">
          <div className={classes.sliderBox}>
            <ImageSwiper images={dish.images} />
          </div>
          <div className={classes.detail}>
            <h2 className="u-text__headline">{dish.recipeTitle}</h2>
            <p>{dish.recipeUrl}</p>
            <div className="module-spacer--extra-small" />
            <p>{returnCodeToBr(dish.description)}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default DishDetail
