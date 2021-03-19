import { push } from 'connected-react-router'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import { PrimaryButton, TextInput } from '../components/UIkit'
import { resetPassword } from '../reducks/users/operations'

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

const Reset: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value)
    },
    [setEmail]
  )

  return (
    <div className="section-container">
      <div className="spacer-medium" />
      <h2 className={classes.head}>パスワードリセット</h2>
      <div className="spacer-small" />
      <p className={classes.font}>指定のメールアドレスにリセット用のリンクを送信します。</p>
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
      <div className="spacer-small" />
      <div className="spacer-small" />
      <PrimaryButton label={'リセット'} onClick={() => dispatch(resetPassword(email))} />
      <div className="spacer-extrasmall" />
      <p className={classes.font} onClick={() => dispatch(push('/signin'))}>
        サインイン画面に戻る
      </p>
    </div>
  )
}

export default Reset
