import React from 'react'
import { Route, Switch } from 'react-router'

import Auth from './Auth'
import { DishDetail, DishEdit, DishList, Reset, SignIn, SignUp, SignUpAnon } from './templates'

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/reset" component={Reset} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Auth>
        <Route exact path="/(/)?" component={DishList} />
        <Route exact path="/anon/signup" component={SignUpAnon} />
        <Route exact path="/dish/detail/:id" component={DishDetail} />
        <Route path="/dish/edit(/:id)?" component={DishEdit} />
      </Auth>
    </Switch>
  )
}

export default Router
