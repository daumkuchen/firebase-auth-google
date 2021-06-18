import firebase from "firebase/app"
import "firebase/auth"
import 'firebaseui/dist/firebaseui.css'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

class FirebaseAuthGoogle {

  public async sign(): Promise<any> {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    return new Promise((resolve: any) => {
      const auth = firebase.auth();
      const authProviders = firebase.auth.GoogleAuthProvider.PROVIDER_ID;
      auth.onAuthStateChanged(authUser => {
        if (!authUser) {
          console.warn("signIn fail");
          const firebaseui = require("firebaseui");
          const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
          const config = {
            signInOptions: [
              authProviders
            ],
            signInSuccessUrl: "/",
            signInFlow: "popup",
            callbacks: {
              signInSuccessWithAuthResult: (authResult: any) => {
                const user = authResult.user;
                resolve(user);
              },
            }
          };
          ui.start("#firebaseui-auth-container", config);
        } else {
          console.warn("signIn success");
          resolve(authUser);
        }
      });
    });
  }

  public async signOut(): Promise<any> {
    const auth = firebase.auth();
    auth.signOut().then(() => {
      return new Promise((resolve: any) => {
        resolve();
      });
    });
  }

  public async signIn(): Promise<any> {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    return new Promise((resolve: any) => {
      const auth = firebase.auth();
      auth.onAuthStateChanged(authUser => {
        resolve(authUser);
      });
    });
  }

}

export default FirebaseAuthGoogle;