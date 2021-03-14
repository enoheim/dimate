import React from 'react'
import { useSelector } from 'react-redux'
import { getUserId, getUsername } from '../reducks/users/selectors'

const Home: React.FC = () => {
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
    </div>
  )
}

export default Home
