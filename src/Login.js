import { db, auth } from './Firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import {signInWithEmailAndPassword ,onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let unsubscribe;

    const handleSubmit = async (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then((credentials) => {
            console.log('user logged in: ', credentials.user);

            unsubscribeUser();
        })
        .catch((err) => {
            console.log("error when logging in: ", err);
        })

    }

    const unsubscribeUser = onAuthStateChanged(auth, (user) => {
        console.log("status change: ", user);
    })

    return ( 
        <form onSubmit={handleSubmit} className="Login">
            <label>email</label><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
            <label>password</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br/>
            <input type='submit' value="login" />
        </form>
     );
}
 
export default Login;