import { push } from 'connected-react-router'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import { PrimaryButton, TextInput } from '../components/UIkit'
import { signUp, signUpAnon } from '../reducks/users/operations'
import { getIsSignedIn } from '../reducks/users/selectors'

const useStyles = makeStyles((theme) => ({
  head: {
    color: theme.palette.secondary.main,
    fontSize: '32px',
  },
  font: {
    color: theme.palette.secondary.main,
  },
}))

const SignUp: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const isSignedIn = getIsSignedIn(selector)

  const [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [confirmPassword, setConfirmPassword] = useState('')

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
      <p className={classes.font}>パスワードは6文字以上で設定して下さい。</p>
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
      {!isSignedIn && (
        <PrimaryButton
          label={'アカウント新規登録'}
          onClick={() => dispatch(signUp(email, password, confirmPassword))}
        />
      )}
      {isSignedIn && (
        <PrimaryButton
          label={'アカウント登録'}
          onClick={() => dispatch(signUpAnon(email, password, confirmPassword))}
        />
      )}
      <div className="spacer-extrasmall" />
      {!isSignedIn && (
        <p className={classes.font} onClick={() => dispatch(push('/signin'))}>
          サインイン画面に戻る
        </p>
      )}
      {!isSignedIn && (
        <p className={classes.font} onClick={() => dispatch(push('/top'))}>
          トップ画面に戻る
        </p>
      )}
      {isSignedIn && (
        <p className={classes.font} onClick={() => dispatch(push('/'))}>
          ホーム画面に戻る
        </p>
      )}
    </div>
  )
}

export default SignUp
