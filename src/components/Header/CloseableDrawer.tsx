import { push } from 'connected-react-router'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonIcon from '@material-ui/icons/Person'
import SearchIcon from '@material-ui/icons/Search'

import { signOut } from '../../reducks/users/operations'
import { TextInput } from '../UIkit'

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
      width: 256,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256,
  },
  searchField: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: 32,
  },
}))

type Props = {
  onClose: (arg0: any) => void
  open: boolean
}

const ClosableDrawer: React.FC<Props> = (props) => {
  const classes = useStyles()
  const container: any = { props }
  const dispatch = useDispatch()
  const [keyword, setKeyword] = useState('')

  const inputKeyword = useCallback(
    (event) => {
      setKeyword(event.target.value)
    },
    [setKeyword]
  )

  const selectMenu = (event: React.MouseEvent<HTMLDivElement>, path: string) => {
    dispatch(push(path))
    props.onClose(event)
  }

  const menus = [
    { func: selectMenu, label: 'プロフィール', icon: <PersonIcon />, id: 'profile', value: '/user/mypage' },
    { func: selectMenu, label: 'レシピ追加', icon: <AddCircleIcon />, id: 'add', value: '/dish/edit' },
  ]

  return (
    <nav className={classes.drawer}>
      <Drawer
        {...container}
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(event) => props.onClose(event)}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div onKeyDown={(event) => props.onClose(event)}>
          <div className={classes.searchField}>
            <TextInput
              fullWidth={false}
              label={'レシピ名を入力'}
              multiline={false}
              onChange={inputKeyword}
              required={false}
              rows={1}
              value={keyword}
              type={'text'}
            />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {menus.map((menu) => (
              <ListItem button key={menu.id} onClick={(event) => menu.func(event, menu.value)}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem button key="logout" onClick={() => dispatch(signOut())}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={'サインアウト'} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </nav>
  )
}

export default ClosableDrawer
