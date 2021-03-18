import { ConnectedRouter } from 'connected-react-router'
import * as History from 'history'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { MuiThemeProvider } from '@material-ui/core'

import App from './App'
import { theme } from './assets/theme'
import createStore from './reducks/store/store'

const history = History.createBrowserHistory()
export const store = createStore(history)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
