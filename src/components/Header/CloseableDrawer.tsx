import { push } from 'connected-react-router'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonIcon from '@material-ui/icons/Person'
import SearchIcon from '@material-ui/icons/Search'

import { db } from '../../firebase'
import { signOut } from '../../reducks/users/operations'
import { TextInput } from '../UIkit'

const useStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        flexShrink: 0,
        width: 230,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      width: 230,
    },
    // searchField: {
    //   alignItems: 'center',
    //   display: 'flex',
    //   marginLeft: 32,
    // },
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
  const container: any = { props }
  const dispatch = useDispatch()
  // const [keyword, setKeyword] = useState('')

  // const inputKeyword = useCallback(
  //   (event) => {
  //     setKeyword(event.target.value)
  //   },
  //   [setKeyword]
  // )

  const selectMenu = (event: any, path: string) => {
    dispatch(push(path))
    props.onClose(event, false)
  }

  const [filters, setFilters] = useState([{ func: selectMenu, label: '全て', id: 'all', value: '/' }])

  const menus = [
    // { func: selectMenu, label: 'プロフィール', icon: <PersonIcon />, id: 'profile', value: '/user/mypage' },
    { func: selectMenu, label: 'レシピ追加', icon: <AddCircleIcon />, id: 'add', value: '/dish/add' },
  ]

  useEffect(() => {
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
  }, [])

  return (
    <nav className={classes.drawer}>
      <Drawer
        {...container}
        variant="temporary"
        anchor="right"
        open={props.open}
        onClose={(event) => props.onClose(event, false)}
        onKeyDown={(event) => props.onClose(event, false)}
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ keepMounted: true }}
      >
        <div>
          {/* <div className={classes.searchField}>
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
          <Divider /> */}
          <List>
            {menus.map((menu) => (
              <ListItem button key={menu.id} onClick={(event) => menu.func(event, menu.value)}>
                <ListItemIcon className={classes.icon}>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            ))}
            <ListItem button key="logout" onClick={() => dispatch(signOut())}>
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
        </div>
      </Drawer>
    </nav>
  )
}

export default ClosableDrawer
