import './App.css';
import { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Alert from './components/Alert';

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
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
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

  const [alert, setalert] = useState(null);

  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null);
    }, 2000);
  }

  return (
    <>
      {alert && <Alert alert={alert} />}
      <BrowserRouter>
        <Switch>
          <Route exact path='/home'><Home setUser={setUser} user={user} profile={profilePicture} showAlert={showAlert} /></Route>
          <Route exact path='/'><Login setUser={setUser} user={user} handleFacebookLogin={handleFacebookLogin} handleGoogleLogin={handleGoogleLogin} handleGitHuBLogin={handleGitHuBLogin} showAlert={showAlert}/></Route>
          <Route exact path='/modal'><Modal showAlert={showAlert} /></Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
