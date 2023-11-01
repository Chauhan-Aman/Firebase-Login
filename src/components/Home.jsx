import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/FirebaseConfig';
import { Link } from 'react-router-dom';

const Home = () => {

  const [user, loading, error] = useAuthState(auth);

  console.log(error);

  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log('successfully logged out');
      window.location.reload(false)
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="container">
      <div className='inner-container'>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {user ? (
              <>
                <h3 className='texts'>Welcome {user.displayName}</h3>
                <p className='texts'>{user.email}</p>
                <div className='photo-container'>
                  <img src={user.photoURL} alt="dp" referrerPolicy='no-referrer' className='photo' />
                </div>
                <button className='button'
                  onClick={handleLogout}>
                  LogOut
                </button>
              </>
            ) : (
              <button className='button'>
                <Link to="/" style={{ textDecoration: 'none' }}>Login</Link>
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Home;