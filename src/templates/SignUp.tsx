import { push } from 'connected-react-router'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import { PrimaryButton, TextInput } from '../components/UIkit'
import { signUp } from '../reducks/users/operations'

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

const SignUp: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [username, setUsername] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [confirmPassword, setConfirmPassword] = useState('')

  const inputUsername = useCallback(
    (event) => {
      setUsername(event.target.value)
    },
    [setUsername]
  )

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

  const inputConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value)
    },
    [setConfirmPassword]
  )

  return (
    <div className="section-container">
      <div className="spacer-medium" />
      <h2 className={classes.head}>アカウント登録</h2>
      <div className="spacer-small" />
      <p className={classes.font}>許可されるパスワードは6文字以上の英数字のみです。</p>
      <div className="spacer-small" />
      <TextInput
        fullWidth={true}
        label={'ユーザー名'}
        multiline={false}
        required={true}
        rows={1}
        value={username}
        type={'text'}
        onChange={inputUsername}
      />
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
      <TextInput
        fullWidth={true}
        label={'パスワード(確認)'}
        multiline={false}
        required={true}
        rows={1}
        value={confirmPassword}
        type={'password'}
        onChange={inputConfirmPassword}
      />
      <div className="spacer-small" />
      <div className="spacer-small" />
      <PrimaryButton
        label={'アカウント登録'}
        onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
      />
      <div className="spacer-extrasmall" />
      <p className={classes.font} onClick={() => dispatch(push('/signin'))}>
        アカウントを持っている場合
      </p>
    </div>
  )
}

export default SignUp
