import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../reducks/users/operations'
import { getUserId, getUsername } from '../reducks/users/selectors'

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const selector = useSelector((state) => state)
  const uid = getUserId(selector)
  const username = getUsername(selector)

  return (
    <div>
      <h2>Home</h2>
      <p>
        ユーザーID:{uid}
        {console.log(uid)}
      </p>
      <p>
        ユーザー名:{username}
        {console.log(username)}
      </p>
      <button onClick={() => dispatch(signOut())}>サインアウト</button>
    </div>
  )
}

export default Home
