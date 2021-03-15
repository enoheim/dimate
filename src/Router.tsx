import React from 'react'
import { Route, Switch } from 'react-router'
import Auth from './Auth'
import { Home, Reset, SignIn, SignUp } from './templates'

const Router: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signin/reset" component={Reset} />
      <Route exact path="/signup" component={SignUp} />
      <Auth>
        <Route exact path="/(/)?" component={Home} />
      </Auth>
    </Switch>
  )
}

export default Router
