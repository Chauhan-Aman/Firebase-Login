import React from 'react';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';

const Login = ({ user, handleFacebookLogin, handleGoogleLogin, handleGitHuBLogin }) => {

    const history = useHistory();

    if (user) {
        history.push('/home');
    }

    return (
        <>
            <div className="container">
                <div className="inner-container">
                    <div className='socials'>
                        <button className='login-buttons' id='google' href="#" onClick={handleGoogleLogin}>
                            <img src='./img/google.png' alt="" className='login-images' />
                            Sign Up with Google
                        </button>
                        <button className='login-buttons' id='facebook' href='#' onClick={handleFacebookLogin}>
                            <img src='./img/facebook.png' alt="" className='login-images' />
                            Sign Up with Facebook
                        </button>
                        <button className='login-buttons' id='github' href="#" onClick={handleGitHuBLogin}>
                            <img src='./img/github.png' alt="" className='login-images' />
                            Sign Up with GitHub
                        </button>
                        <Link id='mobile' to="/modal">
                            <img src='./img/message.png' alt="" />
                            Sign Up with Mobile
                        </Link>
                    </div>
                    <button type="submit" className='button'>
                        Register{" "}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='chevron'>
                            <title>chevron-right</title>
                            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Login