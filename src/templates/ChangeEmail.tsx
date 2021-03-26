import { push } from 'connected-react-router'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles'

import { PrimaryButton, TextInput } from '../components/UIkit'
import { changeEmail } from '../reducks/users/operations'

const useStyles = makeStyles((theme) => ({
  head: {
    color: theme.palette.secondary.main,
    fontSize: '32px',
  },
  font: {
    color: theme.palette.secondary.main,
  },
}))

const ChangeEmail: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [email, setEmail] = useState(''),
    [confirmEmail, setConfirmEmail] = useState('')

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value)
    },
    [setEmail]
  )

  const inputConfirmEmail = useCallback(
    (event) => {
      setConfirmEmail(event.target.value)
    },
    [setConfirmEmail]
  )

  return (
    <div className="section-container">
      <div className="spacer-medium" />
      <h2 className={classes.head}>メールアドレス変更</h2>
      <div className="spacer-small" />
      <p className={classes.font}>登録されているメールアドレスを変更します。</p>
      <div className="spacer-small" />
      <TextInput
        fullWidth={true}
        label={'変更メールアドレス'}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={'email'}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={'変更メールアドレス(確認)'}
        multiline={false}
        required={true}
        rows={1}
        value={confirmEmail}
        type={'email'}
        onChange={inputConfirmEmail}
      />
      <div className="spacer-small" />
      <div className="spacer-small" />
      <PrimaryButton label={'メールアドレス変更'} onClick={() => dispatch(changeEmail(email, confirmEmail))} />
      <div className="spacer-extrasmall" />
      <p className={classes.font} onClick={() => dispatch(push('/'))}>
        ホーム画面に戻る
      </p>
    </div>
  )
}

export default ChangeEmail
