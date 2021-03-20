import React, { useEffect, useState } from 'react'
import Linkify from 'react-linkify'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import { returnCodeToBr } from '../assets/common'
import { ImageSwiper } from '../components/Dishes'
import { db } from '../firebase'

const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down('sm')]: {
      margin: '20px auto',
      height: 320,
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '20px auto',
      height: 400,
      width: 400,
    },
  },
  detail: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      margin: '0px 30px',
      height: 'auto',
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '30px auto',
      width: 450,
    },
  },
  titleFont: {
    color: theme.palette.secondary.main,
    overflow: 'hidden',
    fontSize: '32px',
    textOverflow: 'ellipsis',
  },
  font: {
    color: theme.palette.secondary.main,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  descriptionFont: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
  },
}))

const DishDetail: React.FC = () => {
  const classes = useStyles()
  const selector = useSelector((state) => state)
  const path = selector.router.location.pathname
  const id = path.split('/dish/detail/')[1]

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
    <section className="section-wrap">
      {dish && (
        <div className="grid-row">
          <div className={classes.sliderBox}>
            <ImageSwiper images={dish.images} />
          </div>
          <div className={classes.detail}>
            <h2 className={classes.titleFont}>{dish.recipeTitle}</h2>
            {dish.recipeTitle && <div className="spacer-extrasmall" />}
            {dish.recipeTitle && <p className={classes.descriptionFont}>参考URL:</p>}
            {dish.recipeTitle && (
              <p className={classes.font}>
                <Linkify>{dish.recipeUrl}</Linkify>
              </p>
            )}
            {dish.ingredients && <div className="spacer-extrasmall" />}
            {dish.ingredients && <p className={classes.descriptionFont}>材料:</p>}
            {dish.ingredients && <p className={classes.font}>{returnCodeToBr(dish.ingredients)}</p>}
            {dish.descriptionFont && <div className="spacer-extrasmall" />}
            {dish.descriptionFont && <p className={classes.descriptionFont}>説明:</p>}
            {dish.descriptionFont && <p className={classes.font}>{returnCodeToBr(dish.description)}</p>}
          </div>
        </div>
      )}
    </section>
  )
}

export default DishDetail
