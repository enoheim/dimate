import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { DishCard } from '../components/Dishes'
import { fetchDishes } from '../reducks/dishes/operations'
import { getDishes } from '../reducks/dishes/selectors'

const DishList: React.FC = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const dishes = getDishes(selector)

  const query = selector.router.location.search
  const category = /^\?category=/.test(query) ? query.split('?category=')[1] : ''

  useEffect(() => {
    dispatch(fetchDishes(category))
  }, [query])

  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {dishes.length > 0 &&
          dishes.map((dish) => (
            <DishCard key={dish.id} id={dish.id} name={dish.recipeTitle} images={dish.images} url={dish.recipeUrl} />
          ))}
      </div>
    </section>
  )
}

export default DishList
