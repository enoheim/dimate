import React from 'react'
import { Route, Switch } from 'react-router'

import Auth from './Auth'
import { ChangeEmail, ChangePassword, DishDetail, DishEdit, DishList, ResetPassword, SignIn, SignUp } from './templates'

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/reset/password" component={ResetPassword} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Auth>
        <Route exact path="/(/)?" component={DishList} />
        <Route exact path="/change/email" component={ChangeEmail} />
        <Route exact path="/change/password" component={ChangePassword} />
        <Route exact path="/dish/detail/:id" component={DishDetail} />
        <Route path="/dish/edit(/:id)?" component={DishEdit} />
      </Auth>
    </Switch>
  )
}

export default Router
