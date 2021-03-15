import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { push } from 'connected-react-router'
import { PrimaryButton, TextInput } from '../components/UIkit'
import { signIn } from '../reducks/users/operations'

const SignIn: React.FC = () => {
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
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium" />
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
      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton label={'サインイン'} onClick={() => dispatch(signIn(email, password))} />
        <div className="module-spacer--medium" />
        <p onClick={() => dispatch(push('/signup'))}>アカウントをお持ちでない方</p>
        <p onClick={() => dispatch(push('/signin/reset'))}>パスワードをお忘れの方</p>
      </div>
    </div>
  )
}

export default SignIn