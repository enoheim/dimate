import React from 'react'

import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.secondary.main,
  },
}))

type Props = {
  handleDrawerToggle: (arg0: any, arg1: boolean) => void
}

const HeaderMenus: React.FC<Props> = (props) => {
  const classes = useStyles()
  return (
    <>
      {/* <IconButton>
        <FavoriteBorderIcon />
      </IconButton> */}
      <IconButton onClick={(event) => props.handleDrawerToggle(event, true)}>
        <MenuIcon className={classes.icon} />
      </IconButton>
    </>
  )
}

export default HeaderMenus
