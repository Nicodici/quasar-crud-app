// Importa las funciones que necesites desde los SDK que vayas a usar

// boot es un concepto de Quasar que se ejecuta antes de que la aplicación se monte. Es ideal para inicializar cosas como Firebase.
import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'

//GetAuth y getFirestore son funciones que te permiten usar los servicios de autenticación y base de datos de Firebase respectivamente.
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// https://firebase.google.com/docs/web/setup#available-libraries

// Configuracion de Firebase de tu aplicacion web
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Inicializa Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }

export default boot(() => {})
//
