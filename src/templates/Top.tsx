import { push } from 'connected-react-router'
import React from 'react'
import { useDispatch } from 'react-redux'

import { Box, Divider, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import GitHubIcon from '@material-ui/icons/GitHub'

import Logo from '../assets/img/logo.png'
import Gif1 from '../assets/img/sample_1.gif'
import Gif2 from '../assets/img/sample_2.gif'
import { PrimaryButton } from '../components/UIkit'
import { signInAnonymously } from '../reducks/users/operations'

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: '320px',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '600px',
    },
    margin: '0px auto',
    textAlign: 'center',
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      width: '320px',
    },
    [theme.breakpoints.up('sm')]: {
      width: '580px',
    },
  },
  head: {
    color: theme.palette.secondary.main,
    fontSize: '32px',
  },
  font: {
    color: theme.palette.secondary.main,
  },
  button: {
    padding: '0px 100px',
  },
}))

const Top: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  return (
    <div className={classes.root}>
      <div className="spacer-medium" />
      <img className={classes.logo} src={Logo} alt="logo" />
      <div className="spacer-small" />
      <p className={classes.font}>dimateではあなたのレシピを登録し、まとめて管理出来ます。</p>
      <p className={classes.font}>あなたの自炊生活をより豊かにしてみませんか？</p>
      <div className="spacer-medium" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <img src={Gif1} alt="sample1" width="200px" height="200px" />
          <Box fontSize="0.8rem" margin="10px">
            メニューから簡単レシピ追加。
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img src={Gif2} alt="sample2" width="200px" height="200px" />
          <Box fontSize="0.8rem" margin="10px">
            スマホですぐにレシピ確認。
          </Box>
        </Grid>
      </Grid>
      <div className="spacer-small" />
      <div className="spacer-small" />
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <PrimaryButton label={'サインイン'} onClick={() => dispatch(push('/signin'))} />
          <Box fontSize="0.8rem">アカウント登録もこちらから。</Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <PrimaryButton label={'ゲストサインイン'} onClick={() => dispatch(signInAnonymously())} />
          <Box fontSize="0.8rem">レシピを引き継いでアカウント登録出来ます。</Box>
        </Grid>
      </Grid>
      <div className="spacer-medium" />
      <div className="spacer-medium" />
      <div className="spacer-medium" />
      <Divider />
      <div className="spacer-small" />
      <footer className={classes.font}>
        <p>Copyright © 2021 enoheim</p>
        <div className="spacer-extrasmall" />
        <GitHubIcon onClick={() => window.open('https://github.com/enoheim')} />
      </footer>
    </div>
  )
}

export default Top
