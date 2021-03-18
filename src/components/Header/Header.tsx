import { push } from 'connected-react-router'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'

import Logo from '../../assets/img/logo.png'
import { getIsSignedIn } from '../../reducks/users/selectors'
import { CloseableDrawer, HeaderMenus } from './index'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuBar: {
    backgroundColor: theme.palette.primary.main,
  },
  toolBar: {
    margin: '0px auto',
    width: '100%',
  },
}))

const Header: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const isSignedIn = getIsSignedIn(selector)

  const [open, setOpen] = useState(false)

  const handleDrawerToggle = useCallback(
    (event, isOpen) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return
      }
      setOpen(isOpen)
    },
    [setOpen]
  )

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          {isSignedIn && <HeaderMenus handleDrawerToggle={handleDrawerToggle} />}
          <img src={Logo} alt="logo" width="128px" onClick={() => dispatch(push('/'))} />
        </Toolbar>
      </AppBar>
      <CloseableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  )
}

export default Header
