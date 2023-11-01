import './App.css';
import { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth'
import { auth, providerFacebook, providerGoogle, providerGithub } from './firebase/FirebaseConfig'
import Modal from './components/Modal';

function App() {

  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFacebookLogin = () => {
    signInWithPopup(auth, providerFacebook).then((result) => {
      setUser(result.user);
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      console.log("Facebook Access Token:", accessToken);
      // fetch facebook graph api to get user actual profile picture
      fetch(`https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`)
        .then((response) => response.blob())
        .then((blob) => {
          setProfilePicture(URL.createObjectURL(blob));
        })
    }).catch((err) => {
      console.log("Facebook login error:", err);
    })
  }

  const handleGoogleLogin = () => {
    signInWithPopup(auth, providerGoogle).then((result) => {
      setUser(result.user);
    }).catch((err) => {
      console.log("Google login error:", err);
    })
  }

  const handleGitHuBLogin = () => {
    signInWithPopup(auth, providerGithub).then((result) => {
      setUser(result.user);
    }).catch((err) => {
      console.log("GitHub login error:", err);
    })
  }

  const handleLogout = () => {
    setUser(null);
  }

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path='/home'><Home handleLogout={handleLogout} user={user} profile={profilePicture} /></Route>
          <Route exact path='/'><Login user={user} handleFacebookLogin={handleFacebookLogin} handleGoogleLogin={handleGoogleLogin} handleGitHuBLogin={handleGitHuBLogin} /></Route>
          <Route exact path='/modal'><Modal /></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
