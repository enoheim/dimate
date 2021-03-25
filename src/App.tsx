import './assets/style.css'
import './assets/reuse.css'

import { NoticeSnackbar } from 'components/Notification'
import React from 'react'

import ScrollToTop from './assets/ScrollToTop'
import { Header } from './components/Header'
import Router from './Router'

const App = () => {
  return (
    <>
      <Header />
      <main className="main">
        <NoticeSnackbar />
        <Router />
        <ScrollToTop />
      </main>
    </>
  )
}

export default App
