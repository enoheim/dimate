import { push } from 'connected-react-router'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import { PrimaryButton, TextInput } from '../components/UIkit'
import { changePassword } from '../reducks/users/operations'

const useStyles = makeStyles((theme) => ({
  head: {
    color: theme.palette.secondary.main,
    fontSize: '32px',
  },
  font: {
    color: theme.palette.secondary.main,
  },
}))

const ChangePassword: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [password, setPassword] = useState(''),
    [confirmPassword, setConfirmPassword] = useState('')

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
      <h2 className={classes.head}>パスワード変更</h2>
      <div className="spacer-small" />
      <p className={classes.font}>登録されているパスワードを変更します。</p>
      <div className="spacer-small" />
      <TextInput
        fullWidth={true}
        label={'変更パスワード'}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={'password'}
        onChange={inputPassword}
      />
      <TextInput
        fullWidth={true}
        label={'変更パスワード(確認)'}
        multiline={false}
        required={true}
        rows={1}
        value={confirmPassword}
        type={'password'}
        onChange={inputConfirmPassword}
      />
      <div className="spacer-small" />
      <div className="spacer-small" />
      <PrimaryButton label={'パスワード変更'} onClick={() => dispatch(changePassword(password, confirmPassword))} />
      <div className="spacer-extrasmall" />
      <p className={classes.font} onClick={() => dispatch(push('/'))}>
        ホーム画面に戻る
      </p>
    </div>
  )
}

export default ChangePassword
