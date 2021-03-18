import React from 'react'
import { Route, Switch } from 'react-router'

import Auth from './Auth'
import { DishAdd, DishDetail, DishEdit, DishList, Reset, SignIn, SignUp } from './templates'

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/reset" component={Reset} />
      <Auth>
        <Route exact path="/(/)?" component={DishList} />
        <Route exact path="/dish/add" component={DishAdd} />
        <Route exact path="/dish/detail/:id" component={DishDetail} />
        <Route path="/dish/edit(/:id)?" component={DishEdit} />
      </Auth>
    </Switch>
  )
}

export default Router
