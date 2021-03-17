import './assets/reset.css'
import './assets/style.css'

import React from 'react'

import { Header } from './components/Header'
import Router from './Router'

const App = () => {
  return (
    <>
      <Header />
      <main className="c-main">
        <Router />
      </main>
    </>
  )
}

export default App
