import { Dispatch } from 'redux'
import { push } from 'connected-react-router'
import { signInAction, signOutAction } from './actions'
import { auth, db, FirebaseTimestamp } from '../../firebase/index'

export const listenAuthState = () => {
  return async (dispatch: Dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid

        db.collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data()

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data?.role,
                uid: uid,
                username: data?.username,
              })
            )
          })
      } else {
        dispatch(push('/signin'))
      }
    })
  }
}

export const resetPassword = (email: string) => {
  return async (dispatch: Dispatch) => {
    if (email === '') {
      alert('必須項目が未入力です')
      return false
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          alert('パスワードリセット用のメールを送信しました。')
          dispatch(push('/signin'))
        })
        .catch(() => {
          alert('パスワードリセット用のメール送信に失敗しました。')
        })
    }
  }
}

export const signIn = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    if (email === '' || password === '') {
      alert('必須項目が未入力です')
      return false
    }

    return auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user

      if (user) {
        const uid = user.uid

        db.collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data()

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data?.role,
                uid: uid,
                username: data?.username,
              })
            )

            dispatch(push('/'))
          })
      }
    })
  }
}

export const signUp = (username: string, email: string, password: string, confirmPassword: string) => {
  return async (dispatch: Dispatch) => {
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      alert('必須項目が未入力です')
      return false
    }
    if (password !== confirmPassword) {
      alert('パスワードが一致していません')
      return false
    }

    return auth.createUserWithEmailAndPassword(email, password).then((result) => {
      const user = result.user

      if (user) {
        const uid = user.uid
        const timestamp = FirebaseTimestamp.now()

        const userInitialData = {
          created_at: timestamp,
          email: email,
          role: 'customer',
          uid: uid,
          updated_at: timestamp,
          username: username,
        }

        db.collection('users')
          .doc(uid)
          .set(userInitialData)
          .then(() => {
            dispatch(push('/'))
          })
      }
    })
  }
}

export const signOut = () => {
  return async (dispatsh: Dispatch) => {
    auth.signOut().then(() => {
      dispatsh(signOutAction())
      dispatsh(push('/signin'))
    })
  }
}