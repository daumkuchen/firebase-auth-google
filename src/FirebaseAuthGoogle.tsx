import firebase from 'firebase'
import 'firebaseui/dist/firebaseui.css'

const config = {
  apiKey: process.env.NEXT_PUBLIC_ENV_LOCAL_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_ENV_LOCAL_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_ENV_LOCAL_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_ENV_LOCAL_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_ENV_LOCAL_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_ENV_LOCAL_FIREBASE_APP_ID,
};

// init: ログインのon/offを判別
export const init = (): Promise<any> => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  return new Promise((resolve: any) => {
    const auth = firebase.auth();
    const authProviders = firebase.auth.GoogleAuthProvider.PROVIDER_ID;
    auth.onAuthStateChanged(authUser => {
      if (!authUser) {
        const firebaseui = require("firebaseui");
        const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
        const config = {
          signInOptions: [
            authProviders
          ],
          signInSuccessUrl: "/",
          signInFlow: "popup",
          callbacks: {
            signInSuccessWithAuthResult: () => {
              resolve(authUser);
              return false;
            }
          },
        };
        ui.start("#firebaseui-auth-container", config);
      } else {
        resolve(authUser);
      }
    });
  });
};

// Google account sign-in
export const signIn = async (): Promise<any> => {
  return new Promise((resolve: any) => {
    resolve();
  });
};

// Google account sign-out
export const signOut = async (): Promise<any> => {
  firebase.auth().signOut().then(() => {
    return new Promise((resolve: any) => {
      resolve();
    });
  });
};