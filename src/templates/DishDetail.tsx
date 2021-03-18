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
      margin: '40px auto',
      height: 400,
      width: 400,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '40px auto',
      height: 400,
      width: 400,
    },
  },
  detail: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      margin: '10px 40px',
      height: 'auto',
      width: 320,
    },
    [theme.breakpoints.up('sm')]: {
      margin: '30px auto',
      width: 450,
    },
  },
  titlefont: {
    [theme.breakpoints.down('sm')]: {
      width: '400px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '460px',
    },
    color: theme.palette.secondary.main,
    overflow: 'hidden',
    fontSize: '30px',
    textOverflow: 'ellipsis',
  },
  url: {
    [theme.breakpoints.down('sm')]: {
      width: '400px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '460px',
    },
    color: theme.palette.secondary.main,
    overflow: 'hidden',
    fontSize: '16px',
    textOverflow: 'ellipsis',
  },
  font: {
    color: theme.palette.secondary.main,
    fontSize: '16px',
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
            <h2 className={classes.titlefont}>{dish.recipeTitle}</h2>
            <p className={classes.url}>
              <Linkify>{dish.recipeUrl}</Linkify>
            </p>
            <div className="spacer-extrasmall" />
            <p className={classes.font}>{returnCodeToBr(dish.ingredients)}</p>
            <div className="spacer-extrasmall" />
            <p className={classes.font}>{returnCodeToBr(dish.description)}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default DishDetail
