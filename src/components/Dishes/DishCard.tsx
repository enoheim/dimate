import clsx from 'clsx'
import { push } from 'connected-react-router'
import React, { useState } from 'react'
import Linkify from 'react-linkify'
import { useDispatch, useSelector } from 'react-redux'

import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SettingsIcon from '@material-ui/icons/Settings'

import { returnCodeToBr } from '../../assets/common'
import NoImage from '../../assets/img/no_image.png'
import { deleteDish } from '../../reducks/dishes/operations'
import { ImageProps } from '../../reducks/dishes/types'
import { getUserId } from '../../reducks/users/selectors'

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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
  },
  font: {
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '260px',
    },
    padding: '2px 0px 0px 12px',
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'left',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    lineHeight: '40px',
  },
  media: {
    paddingTop: '100%',
  },
  icon: {
    color: theme.palette.secondary.main,
  },
  menu: {
    color: theme.palette.secondary.main,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  content: {
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '260px',
    },
  },
  typoTitle: {
    fontWeight: 'bold',
  },
  typoFont: {
    [theme.breakpoints.up('sm')]: {
      fontSize: '14px',
    },
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  more: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}))

type Props = {
  description: string
  id: string
  images: ImageProps
  ingredients: string
  title: string
  url: string
}

const DishCard: React.FC<Props> = (props) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const uid = getUserId(selector)

  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

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
      <Typography className={classes.font} component="h2" onClick={() => dispatch(push('dish/detail/' + props.id))}>
        {props.title}
        {!props.title && 'No title'}
      </Typography>
      <CardMedia
        className={classes.media}
        image={images[0].path}
        title=""
        onClick={() => dispatch(push('dish/detail/' + props.id))}
      />
      <CardActions disableSpacing>
        <IconButton className={classes.icon} onClick={handleClick}>
          <SettingsIcon />
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
              dispatch(deleteDish(props.id, uid))
              handleClose()
            }}
          >
            削除
          </MenuItem>
        </Menu>
        <IconButton
          className={clsx(classes.icon, classes.more, classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} className={classes.more} timeout="auto" unmountOnExit>
        <CardContent className={classes.content}>
          {props.url && <Typography className={classes.typoTitle}>参考URL:</Typography>}
          {props.url && (
            <Typography paragraph className={classes.typoFont}>
              <Linkify>{props.url}</Linkify>
            </Typography>
          )}
          {props.ingredients && <Typography className={classes.typoTitle}>材料:</Typography>}
          {props.ingredients && (
            <Typography paragraph className={classes.typoFont}>
              {returnCodeToBr(props.ingredients)}
            </Typography>
          )}
          {props.description && <Typography className={classes.typoTitle}>説明:</Typography>}
          {props.description && (
            <Typography paragraph className={classes.typoFont}>
              {returnCodeToBr(props.description)}
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default DishCard
