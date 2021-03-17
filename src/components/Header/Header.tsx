import { push } from 'connected-react-router'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'

import logo from '../../assets/img/logo.png'
import { getIsSignedIn } from '../../reducks/users/selectors'
import { CloseableDrawer, HeaderMenus } from './index'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuBar: {
      backgroundColor: '#fff3b8',
      color: '24272d',
    },
    toolBar: {
      margin: '0 auto',
      maxWidth: 1024,
      width: '100%',
    },
    iconButtons: {
      margin: '0 0 0 auto',
    },
  })
)

const Header: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const isSignedIn = getIsSignedIn(selector)

  const [open, setOpen] = useState(false)

  const handleDrawerToggle = useCallback(
    (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return
      }
      setOpen(!open)
    },
    [setOpen, open]
  )

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <img src={logo} alt="logo" width="128px" onClick={() => dispatch(push('/'))} />
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <CloseableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  )
}

export default Header
