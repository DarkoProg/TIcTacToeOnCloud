import { db, auth } from './Firebase.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((credentials) => {
                console.log('user logged in: ', credentials.user);
            })
            .catch((err) => {
                console.log("error when logging in: ", err);
            })
    }

    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                console.log("signed in", user)
            } else {
                console.log("not signed in")
            }
        })
        if (user) {
            history.push("/join");
        }
    }, [user])


    return (
        <div className='register'>
            <form onSubmit={handleSubmit} className="Login">
                <h1>LOGIN</h1>
                <input type="text" className='textinput' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} /><br />
                <input className='textinput' type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} /><br />
                <input className='submitinput' type='submit' value="login" />
            </form>
        </div>
    );
}

export default Login;