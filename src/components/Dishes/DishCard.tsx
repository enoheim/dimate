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
import MoreVert from '@material-ui/icons/MoreVert'

import NoImage from '../../assets/img/no_image.png'
import { deleteDish } from '../../reducks/dishes/operations'
import { ImageProps } from '../../reducks/dishes/types'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      width: 'calc(50% - 16px)',
    },
    [theme.breakpoints.up('sm')]: {
      margin: 16,
      width: 'calc(33.3333% - 32px)',
    },
  },
  content: {
    display: 'flex',
    padding: '16px 8px',
    textAlign: 'left',
    '&:last-child': {
      paddingBottom: 16,
    },
  },
  media: {
    height: 0,
    paddingTop: '100%',
  },
}))

type Props = {
  id: string
  name: string
  images: ImageProps
  url: string
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
        onClick={() => dispatch(push('dish/' + props.id))}
      />
      <CardContent className={classes.content}>
        <div onClick={() => dispatch(push('dish/' + props.id))}>
          <Typography color="textSecondary" component="p">
            {props.name}
          </Typography>
          <Typography component="p">{props.url}</Typography>
        </div>
        <IconButton onClick={handleClick}>
          <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem
            onClick={() => {
              dispatch(push('/dish/edit/' + props.id))
              handleClose()
            }}
          >
            編集
          </MenuItem>
          <MenuItem
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
