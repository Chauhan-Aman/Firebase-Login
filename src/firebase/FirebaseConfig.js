import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3uxf7FyhtG82CpGFJpx85TfTAjzbqigc",
  authDomain: "fir-login-b0831.firebaseapp.com",
  projectId: "fir-login-b0831",
  storageBucket: "fir-login-b0831.appspot.com",
  messagingSenderId: "801311141290",
  appId: "1:801311141290:web:1307e3983a752e3ee68fd3",
  measurementId: "G-D14PT3TF5Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const providerFacebook = new FacebookAuthProvider();
const providerGoogle = new GoogleAuthProvider();
const providerGithub = new GithubAuthProvider();

export { auth, providerFacebook, providerGoogle, providerGithub }