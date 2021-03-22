import { push } from 'connected-react-router'
import firebase from 'firebase/app'
import { Dispatch } from 'redux'

import { Auth, db, FirebaseTimestamp } from '../../firebase'
import { signInAction, signOutAction } from './actions'

export const listenAuthState = () => {
  return async (dispatch: Dispatch) => {
    return Auth.onAuthStateChanged((user) => {
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
      alert('必須項目が未入力です。')
      return false
    } else {
      Auth.sendPasswordResetEmail(email)
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
      alert('必須項目が未入力です。')
      return false
    }

    return Auth.signInWithEmailAndPassword(email, password).then((result) => {
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

export const signInAnonymously = () => {
  return async (dispatch: Dispatch) => {
    Auth.signInAnonymously()
      .then(() => {
        dispatch(push('/'))
      })
      .catch(() => {
        alert('ゲストログインに失敗しました。')
      })
  }
}

export const signUp = (username: string, email: string, password: string, confirmPassword: string) => {
  return async (dispatch: Dispatch) => {
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      alert('必須項目が未入力です。')
      return false
    }
    if (password !== confirmPassword) {
      alert('パスワードが一致していません。')
      return false
    }

    return Auth.createUserWithEmailAndPassword(email, password).then((result) => {
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

export const signUpAnon = (username: string, email: string, password: string, confirmPassword: string) => {
  return async (dispatch: Dispatch) => {
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      alert('必須項目が未入力です。')
      return false
    }
    if (password !== confirmPassword) {
      alert('パスワードが一致していません。')
      return false
    }

    const credential = firebase.auth.EmailAuthProvider.credential(email, password)
    return Auth.currentUser?.linkWithCredential(credential).then(() => {
      const uid = Auth.currentUser?.uid
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
    })
  }
}

export const signOut = () => {
  return async (dispatsh: Dispatch) => {
    Auth.signOut().then(() => {
      dispatsh(signOutAction())
      dispatsh(push('/signin'))
    })
  }
}
