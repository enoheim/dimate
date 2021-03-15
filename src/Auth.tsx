import React, { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listenAuthState } from 'reducks/users/operations'
import { getIsSignedIn } from './reducks/users/selectors'

type Props = {
  children: ReactNode
}

const Auth: React.FC<Props> = ({ children }): any => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const isSignedIn = getIsSignedIn(selector)

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState())
    }
  }, [])

  if (!isSignedIn) {
    return <></>
  } else {
    return children
  }
}

export default Auth
