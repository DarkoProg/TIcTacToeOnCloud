import { db, auth } from './Firebase.js';
import {signInWithEmailAndPassword ,onAuthStateChanged } from 'firebase/auth';
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
        auth.onAuthStateChanged(function(user) {
            if (user) {
              console.log("signed in", user)
            } else {
              console.log("not signed in")
            }
        })
        if(user) {
            history.push("/join");
        }
    }, [user])


    return ( 
        <form onSubmit={handleSubmit} className="Login">
            <label>email</label><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
            <label>password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
            <input type='submit' value="login" />
        </form>
     );
}
 
export default Login;