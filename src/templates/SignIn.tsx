import { push } from 'connected-react-router'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import { PrimaryButton, TextInput } from '../components/UIkit'
import { signIn } from '../reducks/users/operations'

const useStyles = makeStyles((theme) => ({
  head: {
    color: theme.palette.secondary.main,
    fontSize: '32px',
  },
  font: {
    color: theme.palette.secondary.main,
    fontSize: '16px',
  },
}))

const SignIn: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [email, setEmail] = useState(''),
    [password, setPassword] = useState('')

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value)
    },
    [setEmail]
  )

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value)
    },
    [setPassword]
  )

  return (
    <div className="section-container">
      <div className="spacer-medium" />
      <h2 className={classes.head}>dimateへようこそ！</h2>
      <div className="spacer-small" />
      <p className={classes.font}>dimateではあなたのレシピを登録し、まとめて管理出来ます。</p>
      <p className={classes.font}>あなたの自炊生活をより豊かにしてみませんか？</p>
      <div className="spacer-small" />
      <TextInput
        fullWidth={true}
        label={'メールアドレス'}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={'email'}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={'パスワード'}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={'password'}
        onChange={inputPassword}
      />
      <div className="spacer-small" />
      <div className="spacer-small" />
      <PrimaryButton label={'サインイン'} onClick={() => dispatch(signIn(email, password))} />
      <div className="spacer-extrasmall" />
      <p className={classes.font} onClick={() => dispatch(push('/signup'))}>
        アカウント登録はこちら
      </p>
      <p className={classes.font} onClick={() => dispatch(push('/reset'))}>
        パスワードを忘れた場合
      </p>
    </div>
  )
}

export default SignIn
