import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/FirebaseConfig';
import { useHistory } from 'react-router-dom';

const Home = ({ showAlert,setUser }) => {

  const [user, error] = useAuthState(auth);

  const history = useHistory()

  console.log(error);

  const handleLogout = () => {
    auth.signOut().then(() => {
      showAlert("Logged Out SuccessFully!", "success");
      setUser(null);
      // window.location.reload(false)
    }).catch((err) => {
      console.log(err);
      showAlert("Logging Out Failed!", "danger");
    })
  }

  if (!user) {
    history.push('/')
  }

  return (
    <div className="outer-container">
      {user && (
        <div className='inner-container'>
          <h3 className='texts'>Welcome {user.displayName}</h3>
          <p className='texts'>{user.email}</p>
          <div className='photo-container'>
            <img src={user.photoURL} alt="dp" referrerPolicy='no-referrer' className='photo' />
          </div>
          <button className='button'
            onClick={handleLogout}>
            LogOut
          </button>
        </div>
      )}
    </div>
  )
}

export default Home;