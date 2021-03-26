import { push } from 'connected-react-router'
import firebase from 'firebase/app'
import { Dispatch } from 'redux'

import { isValidEmail, isValidRequire } from '../../assets/common'
import { Auth, db, FirebaseTimestamp, storage } from '../../firebase'
import { showNotificationAction } from '../notification/actions'
import { signInAction, signOutAction } from './actions'

export const changeEmail = (email: string, confirmEmail: string) => {
  return async (dispatch: Dispatch) => {
    if (!isValidEmail(email)) {
      dispatch(showNotificationAction('warning', 'メールアドレスの形式が不正です'))
      return false
    }
    if (email !== confirmEmail) {
      dispatch(showNotificationAction('warning', 'メールアドレスが一致していません'))
      return false
    }
    return Auth.currentUser
      ?.updateEmail(email)
      .then(() => {
        dispatch(showNotificationAction('success', 'メールアドレスの変更に成功しました'))
        dispatch(push('/'))
      })
      .catch((error) => {
        dispatch(showNotificationAction('error', 'メールアドレスの変更に失敗しました'))
        throw new Error(error)
      })
  }
}

export const changePassword = (password: string, confirmPassword: string) => {
  return async (dispatch: Dispatch) => {
    if (password !== confirmPassword) {
      dispatch(showNotificationAction('warning', 'パスワードが一致していません'))
      return false
    }
    return Auth.currentUser
      ?.updatePassword(password)
      .then(() => {
        dispatch(showNotificationAction('success', 'パスワードの変更に成功しました'))
        dispatch(push('/'))
      })
      .catch((error) => {
        dispatch(showNotificationAction('error', 'パスワードの変更に失敗しました'))
        throw new Error(error)
      })
  }
}

export const deleteUser = () => {
  return async (dispatch: Dispatch) => {
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
        dispatch(showNotificationAction('success', 'アカウント削除に成功しました'))
        await dispatch(push('/signin'))
        setTimeout(() => {
          location.reload()
        }, 1000)
      })
      .catch((error) => {
        dispatch(showNotificationAction('error', 'アカウント削除に失敗しました'))
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
      dispatch(showNotificationAction('warning', 'メールアドレスの形式が不正です'))
      return false
    } else {
      Auth.sendPasswordResetEmail(email)
        .then(() => {
          dispatch(showNotificationAction('success', 'パスワードリセット用のメールを送信しました'))
          dispatch(push('/signin'))
        })
        .catch(() => {
          dispatch(showNotificationAction('error', 'パスワードリセット用のメール送信に失敗しました'))
        })
    }
  }
}

export const signIn = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    if (!isValidRequire(email, password)) {
      dispatch(showNotificationAction('warning', '必須項目が未入力です'))
      return false
    }
    if (!isValidEmail(email)) {
      dispatch(showNotificationAction('warning', 'メールアドレスの形式が不正です'))
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
              })
            )

            dispatch(showNotificationAction('success', 'サインインに成功しました'))
            dispatch(push('/'))
          })
      })
      .catch(() => {
        dispatch(showNotificationAction('error', 'サインインに失敗しました'))
      })
  }
}

export const signInAnonymously = () => {
  return (dispatch: Dispatch) => {
    Auth.signInAnonymously()
      .then(async () => {
        await Auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
        dispatch(showNotificationAction('success', 'ゲストサインインに成功しました'))
        dispatch(push('/'))
      })
      .catch((error) => {
        dispatch(showNotificationAction('error', 'ゲストサインインに失敗しました'))
        throw new Error(error)
      })
  }
}

export const signOut = () => {
  return async (dispatch: Dispatch) => {
    Auth.signOut()
      .then(async () => {
        dispatch(signOutAction())
        dispatch(showNotificationAction('success', 'サインアウトに成功しました'))
        await dispatch(push('/signin'))
        setTimeout(() => {
          location.reload()
        }, 1000)
      })
      .catch((error) => {
        dispatch(showNotificationAction('error', 'サインアウトに失敗しました'))
        throw new Error(error)
      })
  }
}

export const signUp = (email: string, password: string, confirmPassword: string) => {
  return async (dispatch: Dispatch) => {
    if (!isValidRequire(email, password, confirmPassword)) {
      dispatch(showNotificationAction('warning', '必須項目が未入力です'))
      return false
    }
    if (!isValidEmail(email)) {
      dispatch(showNotificationAction('warning', 'メールアドレスの形式が不正です'))
      return false
    }
    if (password.length < 6) {
      dispatch(showNotificationAction('warning', 'パスワードは6文字以上で設定して下さい'))
      return false
    }
    if (password !== confirmPassword) {
      dispatch(showNotificationAction('warning', 'パスワードが一致していません'))
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
            role: 'customer',
            uid: uid,
            updated_at: timestamp,
          }

          db.collection('users')
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              dispatch(showNotificationAction('success', 'アカウントの新規登録に成功しました'))
              dispatch(push('/'))
            })
        }
      })
      .catch((error) => {
        dispatch(showNotificationAction('error', 'アカウントの新規登録に失敗しました'))
        throw new Error(error)
      })
  }
}

export const signUpAnon = (email: string, password: string, confirmPassword: string) => {
  return async (dispatch: Dispatch) => {
    if (!isValidRequire(email, password, confirmPassword)) {
      dispatch(showNotificationAction('warning', '必須項目が未入力です'))
      return false
    }
    if (!isValidEmail(email)) {
      dispatch(showNotificationAction('warning', 'メールアドレスの形式が不正です'))
      return false
    }
    if (password.length < 6) {
      dispatch(showNotificationAction('warning', 'パスワードは6文字以上で設定して下さい'))
      return false
    }
    if (password !== confirmPassword) {
      dispatch(showNotificationAction('warning', 'パスワードが一致していません'))
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
          role: 'customer',
          uid: uid,
          updated_at: timestamp,
        }

        db.collection('users')
          .doc(uid)
          .set(userInitialData)
          .then(() => {
            dispatch(showNotificationAction('success', 'アカウントの登録に成功しました'))
            dispatch(push('/'))
          })
      })
      .catch((error) => {
        dispatch(showNotificationAction('error', 'アカウントの登録に失敗しました'))
        throw new Error(error)
      })
  }
}
