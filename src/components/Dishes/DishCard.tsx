import { push } from 'connected-react-router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import NoImage from '../../assets/img/no_image.png'
import { deleteDish } from '../../reducks/dishes/operations'
import { ImageProps } from '../../reducks/dishes/types'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      width: 'calc(100% - 16px)',
    },
    [theme.breakpoints.up('sm')]: {
      margin: 8,
      width: 'calc(50% - 16px)',
    },
    [theme.breakpoints.up('md')]: {
      margin: 8,
      width: 'calc(33.3333% - 16px)',
    },
  },
  media: {
    backgroundColor: theme.palette.primary.main,
    height: 0,
    paddingTop: '100%',
  },
  content: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    padding: '4px 8px',
    textAlign: 'left',
    '&:last-child': {
      paddingBottom: '4px',
    },
  },
  icon: {
    color: theme.palette.secondary.main,
    marginLeft: 'auto',
  },
  font: {
    [theme.breakpoints.down('sm')]: {
      width: '280px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '210px',
    },
    [theme.breakpoints.up('md')]: {
      width: '240px',
    },
    color: theme.palette.secondary.main,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    fontSize: '16px',
    textOverflow: 'ellipsis',
    lineHeight: '46px',
  },
  menu: {
    color: theme.palette.secondary.main,
  },
}))

type Props = {
  id: string
  images: ImageProps
  name: string
}

const DishCard: React.FC<Props> = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const images = props.images.length > 0 ? props.images : [{ path: NoImage }]

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={images[0].path}
        title=""
        onClick={() => dispatch(push('dish/detail/' + props.id))}
      />
      <CardContent className={classes.content}>
        <div onClick={() => dispatch(push('dish/detail/' + props.id))}>
          <Typography className={classes.font} component="p">
            {props.name}
          </Typography>
        </div>
        <IconButton className={classes.icon} onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem
            className={classes.menu}
            onClick={() => {
              dispatch(push('/dish/edit/' + props.id))
              handleClose()
            }}
          >
            編集
          </MenuItem>
          <MenuItem
            className={classes.menu}
            onClick={() => {
              dispatch(deleteDish(props.id))
              handleClose()
            }}
          >
            削除
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  )
}

export default DishCard
