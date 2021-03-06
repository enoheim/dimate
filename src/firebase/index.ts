import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'

import firebase from 'firebase/app'

import { firebaseConfig } from './config'

firebase.initializeApp(firebaseConfig)
export const Auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()
export const functions = firebase.functions()
export const FirebaseTimestamp = firebase.firestore.Timestamp
