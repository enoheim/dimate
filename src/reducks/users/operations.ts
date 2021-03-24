import { push } from 'connected-react-router'
import firebase from 'firebase/app'
import { Dispatch } from 'redux'

import { isValidEmail, isValidRequire } from '../../assets/common'
import { Auth, db, FirebaseTimestamp, storage } from '../../firebase'
import { signInAction, signOutAction } from './actions'

export const deleteUser = () => {
  return async (dispatsh: Dispatch) => {
    const user = Auth.currentUser
    const uid = Auth.currentUser?.uid
    const dishesRef = db.collection('users').doc(uid).collection('dishes')
    const imageRef = storage.ref(`${uid}/images`)
    const usersRef = db.collection('users').doc(uid)

    await imageRef.listAll().then((listResults) => {
      const promises = listResults.items.map((item) => {
        return item.delete()
      })
      Promise.all(promises)
    })

    const dishQuery = await dishesRef.get()
    dishQuery.docs.forEach(async (doc) => {
      await doc.ref.delete()
    })

    const userQuery = await usersRef.get()
    await userQuery.ref.delete()

    user
      ?.delete()
      .then(async () => {
        await dispatsh(push('/signin'))
        location.reload()
      })
      .catch((error) => {
        alert('アカウント削除に失敗しました。')
        throw new Error(error)
      })
  }
}

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
    if (!isValidEmail(email)) {
      alert('メールアドレスの形式が不正です。')
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
    if (!isValidRequire(email, password)) {
      alert('必須項目が未入力です。')
      return false
    }
    if (!isValidEmail(email)) {
      alert('メールアドレスの形式が不正です。')
      return false
    }

    return Auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user

        if (!user) {
          throw new Error('User does not exist.')
        }
        const uid = user.uid

        db.collection('users')
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data()
            if (!data) {
              throw new Error('User data does not exist.')
            }

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
      })
      .catch(() => {
        alert('サインインに失敗しました。')
      })
  }
}

export const signInAnonymously = () => {
  return (dispatch: Dispatch) => {
    Auth.signInAnonymously()
      .then(async () => {
        await Auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
        dispatch(push('/'))
      })
      .catch((error) => {
        alert('ゲストサインインに失敗しました。')
        throw new Error(error)
      })
  }
}

export const signOut = () => {
  return async (dispatsh: Dispatch) => {
    Auth.signOut()
      .then(() => {
        dispatsh(signOutAction())
        dispatsh(push('/signin'))
      })
      .catch((error) => {
        alert('サインアウトに失敗しました。')
        throw new Error(error)
      })
  }
}

export const signUp = (username: string, email: string, password: string, confirmPassword: string) => {
  return async (dispatch: Dispatch) => {
    if (!isValidRequire(username, email, password, confirmPassword)) {
      alert('必須項目が未入力です。')
      return false
    }
    if (!isValidEmail(email)) {
      alert('メールアドレスの形式が不正です。')
      return false
    }
    if (password.length < 6) {
      alert('パスワードは6文字以上で設定して下さい。')
      return false
    }
    if (password !== confirmPassword) {
      alert('パスワードが一致していません。')
      return false
    }

    return Auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
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
      .catch((error) => {
        alert('アカウントの新規登録に失敗しました。')
        throw new Error(error)
      })
  }
}

export const signUpAnon = (username: string, email: string, password: string, confirmPassword: string) => {
  return async (dispatch: Dispatch) => {
    if (!isValidRequire(username, email, password, confirmPassword)) {
      alert('必須項目が未入力です。')
      return false
    }
    if (!isValidEmail(email)) {
      alert('メールアドレスの形式が不正です。')
      return false
    }
    if (password.length < 6) {
      alert('パスワードは6文字以上で設定して下さい。')
      return false
    }
    if (password !== confirmPassword) {
      alert('パスワードが一致していません。')
      return false
    }

    const credential = firebase.auth.EmailAuthProvider.credential(email, password)
    return Auth.currentUser
      ?.linkWithCredential(credential)
      .then(() => {
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
      .catch((error) => {
        alert('アカウントの登録に失敗しました。')
        throw new Error(error)
      })
  }
}
