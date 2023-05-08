import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import LoginStyles from '../styles/login.module.css'
import { GoogleAuthProvider, signInWithPopup,  } from 'firebase/auth'
import { auth } from "../firebase";




export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoggingIn, setIsLoggingIn] = useState(true)

    const { login, signup, currentUser, } = useAuth()
    console.log(currentUser)

    async function submitHandler() {
        if (!email || !password) {
            setError('Please enter email and password')
            return
        }
        if (isLoggingIn) {
            try {
                await login(email, password)
            } catch (err) {
                setError('Incorrect email or password')
            }
            return
        }
        await signup(email, password)
    }

    async function handleAuth () {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
      };




    return (
        <div className={LoginStyles.wrapper}>
            <div className={LoginStyles.login}>
                <h1 className={LoginStyles.head}>{isLoggingIn ? 'Login' : 'Register'}</h1>
                {error && <div className={LoginStyles.error}>{error}</div>}
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email Address' className={LoginStyles.border} />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' className={LoginStyles.border} />
                <button onClick={submitHandler} className={LoginStyles.submit}>
                    SUBMIT
                </button>
                <h2 className={LoginStyles.head} onClick={() => setIsLoggingIn(!isLoggingIn)}>DON’T HAVE AN ACCOUNT? {!isLoggingIn ? 'LOGIN' : 'REGISTER'}</h2>
                <button className={LoginStyles.google} onClick={handleAuth}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg></button>
                <span className={LoginStyles.googleLog}>Log In With Google</span>
            </div>
        </div>
    )
}
