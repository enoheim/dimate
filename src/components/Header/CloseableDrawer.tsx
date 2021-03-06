import { push } from 'connected-react-router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import LockIcon from '@material-ui/icons/Lock'
import MailIcon from '@material-ui/icons/Mail'

import { db } from '../../firebase'
import { showAlert } from '../../reducks/alert/operations'
import { deleteUser, signOut } from '../../reducks/users/operations'
import { getUserId, getUserRole } from '../../reducks/users/selectors'

const useStyles = makeStyles((theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      width: 230,
    },
    icon: {
      color: theme.palette.secondary.main,
    },
    font: {
      color: theme.palette.secondary.main,
    },
  })
)

type Props = {
  onClose: (arg0: any, arg1: boolean) => void
  open: boolean
}

const ClosableDrawer: React.FC<Props> = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const userId = getUserId(selector)
  const userRole = getUserRole(selector)

  const selectMenu = (event: any, path: string) => {
    props.onClose(event, false)
    dispatch(push(path))
  }

  const [filters, setFilters] = useState([{ func: selectMenu, label: '全て', id: 'all', value: '/' }])

  const menus = [{ func: selectMenu, label: 'レシピ追加', icon: <AddCircleIcon />, id: 'add', value: '/dish/edit' }]

  const selectDeleteUser = (event: any) => {
    props.onClose(event, false)
    dispatch(showAlert(deleteUser(), '本当にアカウントを削除しますか？'))
  }

  const selectSignOut = (event: any) => {
    props.onClose(event, false)
    dispatch(showAlert(signOut(), 'サインアウトしますか？'))
  }

  useEffect(() => {
    if (userId) {
      db.collection('categories')
        .orderBy('name', 'asc')
        .get()
        .then((snapshots) => {
          const list: any = []
          snapshots.forEach((snapshot) => {
            const category = snapshot.data()
            list.push({ func: selectMenu, label: category.name, id: category.id, value: `/?category=${category.id}` })
          })
          setFilters((prevState) => [...prevState, ...list])
        })
    }
  }, [userId])

  return (
    <nav>
      <Drawer
        variant="temporary"
        anchor="right"
        classes={{ paper: classes.drawerPaper }}
        open={props.open}
        onClose={(event) => props.onClose(event, false)}
        onKeyDown={(event) => props.onClose(event, false)}
        ModalProps={{ keepMounted: true }}
      >
        <div>
          <List>
            {menus.map((menu) => (
              <ListItem button key={menu.id} onClick={(event) => menu.func(event, menu.value)}>
                <ListItemIcon className={classes.icon}>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            {userRole !== 'customer' && (
              <ListItem button key="signup" onClick={(event) => selectMenu(event, '/signup')}>
                <ListItemIcon>
                  <AccountCircleIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary={'アカウント登録'} />
              </ListItem>
            )}
            {userRole == 'customer' && (
              <ListItem button key="changeEmail" onClick={(event) => selectMenu(event, '/change/email')}>
                <ListItemIcon>
                  <MailIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary={'アドレス変更'} />
              </ListItem>
            )}
            {userRole == 'customer' && (
              <ListItem button key="changePassword" onClick={(event) => selectMenu(event, '/change/password')}>
                <ListItemIcon>
                  <LockIcon className={classes.icon} />
                </ListItemIcon>
                <ListItemText primary={'パスワード変更'} />
              </ListItem>
            )}
            <ListItem button key="logout" onClick={(event) => selectSignOut(event)}>
              <ListItemIcon>
                <ExitToAppIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary={'サインアウト'} />
            </ListItem>
          </List>
          <Divider />
          <List>
            {filters.map((filter) => (
              <ListItem button key={filter.id} onClick={(event) => filter.func(event, filter.value)}>
                <ListItemText className={classes.font} primary={filter.label} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button key="deleteuser" onClick={(event) => selectDeleteUser(event)}>
              <ListItemIcon>
                <HighlightOffIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary={'アカウント削除'} />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </nav>
  )
}

export default ClosableDrawer
