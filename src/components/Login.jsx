import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';

const Login = ({ user, handleFacebookLogin, handleGoogleLogin, handleGitHuBLogin, showAlert }) => {

    const history = useHistory();

    const [register, setRegister] = useState('')

    if (user) {
        history.push('/home');
        showAlert("Logged In SuccessFully!", "success");
    }

    const handleRegister = () => {
        setRegister(true);
        setInterval(() => {
            setRegister(false);
        }, 4000);
    }

    return (
        <>
            <div className="outer-container">
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
                    <button type="submit" className='button' onClick={handleRegister}>
                        Register{" "}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='chevron'>
                            <title>chevron-right</title>
                            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                        </svg>
                    </button>
                    {register && <p style={{ color: 'red' }}>Use About Signin Methods...</p>}
                </div>
            </div>
        </>
    )
}

export default Login